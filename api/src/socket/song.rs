use serde::{Deserialize, Serialize};
use socketioxide::{
    SocketIo,
    extract::{Data, SocketRef, State},
};

use crate::{checks::song_check::check_song, state::AppState};

use tracing::{error, info, warn};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SongData {
    pub id: u32,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SongSelectResponse {
    pub user_id: String,
    pub username: String,
    pub song_id: u32,
}

pub async fn song_select(
    s: SocketRef,
    io: SocketIo,
    Data(data): Data<SongData>,
    State(state): State<AppState>,
) {
    if s.rooms().is_empty() {
        warn!("User {} is not in any room", s.id);
        let _ = s.emit("error", "You are not in any room");
        return;
    }

    let check = check_song(data.id, state.clone()).await;

    if let Err(check) = check {
        let _ = s.emit("song_error", "Song not found or invalid");
        warn!("{}", check);
        return;
    };

    let mut rooms = state.rooms.write().await;

    let room = rooms.get_mut(
        &s.rooms()[0]
            .parse::<u32>()
            .expect("Failed to parse room ID as u32"),
    );

    match room {
        Some(room) => {
            let user = room
                .users
                .iter_mut()
                .find(|user| user.id == s.id.to_string());

            if let Some(user) = user {
                user.song_id = Some(data.id);

                let _ = io
                    .to(s.rooms())
                    .emit(
                        "song_selected",
                        &SongSelectResponse {
                            user_id: s.id.to_string(),
                            username: user.name.clone(),
                            song_id: data.id,
                        },
                    )
                    .await;
            } else {
                error!("User not found in room for song selection");
                let _ = s.emit("error", &format!("User {} not found in room", s.id));
            }
        }
        None => {
            error!("Room not found for song selection");
            let _ = s.emit("error", &"Room you specified does not exist");
        }
    }

    info!("User {} selected song ID {}", s.id, data.id);
}
