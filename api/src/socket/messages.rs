use serde::{Deserialize, Serialize};
use socketioxide::{
    SocketIo,
    extract::{Data, SocketRef, State},
};
use time::UtcDateTime;

use tracing::{info, warn};

use crate::{
    checks::{CheckType, check_for_song, check_message},
    models::{Message, MessageType},
    state::AppState,
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct MessageData {
    pub content: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct GuessedEmit {
    pub user_id: String,
    pub guess_type: CheckType,
}

pub async fn message_handler(
    s: SocketRef,
    io: SocketIo,
    Data(data): Data<MessageData>,
    State(state): State<AppState>,
) {
    info!("User {} sent a message: {}", s.id, data.content);

    let mut rooms = state.rooms.lock().await;
    let room = rooms.get_mut(&s.rooms().first().unwrap().parse::<u32>().unwrap());

    if let Some(room) = room {
        let username = if let Some(user) = room.users.iter().find(|u| u.id == s.id.to_string()) {
            user.name.clone()
        } else {
            warn!(
                "User {} not found in the room but tried to send a message",
                s.id
            );
            return;
        };

        if let Err(e) = check_message(data.content.clone()) {
            warn!("{}", e);
            return;
        }

        let message = if room.game_started
            && room.current_song.is_some()
            && let Some(check) =
                check_for_song(data.content.clone(), room.current_song.clone().unwrap())
        {
            let _ = io
                .to(s.rooms())
                .emit(
                    "guessed",
                    &GuessedEmit {
                        user_id: s.id.to_string(),
                        guess_type: check.clone(),
                    },
                )
                .await;

            let content = match check {
                CheckType::Title => format!("{} guessed the title!", username.clone()),
                CheckType::Artist => format!("{} guessed the artist!", username.clone()),
                CheckType::CloseTitle => {
                    format!("{} is close to guessing the title!", username.clone())
                }
                CheckType::CloseArtist => {
                    format!("{} is close to guessing the artist!", username.clone())
                }
            };

            Message {
                message_type: MessageType::Guess,
                user_id: s.id.to_string(),
                username: username.clone(),
                content,
                timestamp: UtcDateTime::now(),
            }
        } else {
            Message {
                message_type: MessageType::Chat,
                user_id: s.id.to_string(),
                username,
                content: data.content.clone(),
                timestamp: UtcDateTime::now(),
            }
        };

        let _ = io.to(s.rooms()).emit("message", &message).await;

        room.messages.push(message);
    } else {
        let _ = s.emit("error", "You are not in a room");
        warn!("user {} tried to send a message but is not in a room", s.id);
    }
}
