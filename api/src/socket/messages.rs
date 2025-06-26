use serde::{Deserialize, Serialize};
use socketioxide::{
    SocketIo,
    extract::{Data, SocketRef, State},
};
use time::{Date, UtcDateTime};

use tracing::{info, warn};

use crate::{models::Message, state::AppState};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct MessageData {
    pub content: String,
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

        let message = Message {
            user_id: s.id.to_string(),
            username,
            content: data.content,
            timestamp: UtcDateTime::now(),
        };

        let _ = io.to(s.rooms()).emit("message", &message).await;

        room.messages.push(message);
    } else {
        let _ = s.emit("error", "You are not in a room");
        warn!("user {} tried to send a message but is not in a room", s.id);
    }
}
