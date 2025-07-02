use serde::{Deserialize, Serialize};
use socketioxide::{
    SocketIo,
    extract::{Data, SocketRef, State},
};

use crate::{checks::song_check::check_song, state::AppState};

use tracing::error;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SongData {
    pub id: u32,
}

pub async fn song_select(
    s: SocketRef,
    io: SocketIo,
    Data(data): Data<SongData>,
    State(state): State<AppState>,
) {
    if check_song(data.id, state.clone()).await.is_err() {
        s.emit("song_error", "Song not found or invalid");
        return;
    };

    let mut rooms = state.rooms.lock().await;
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
            } else {
                error!("User not found in room for song selection");
                s.emit("error", &format!("User {} not found in room", s.id));
            }
        }
        None => {
            error!("Room not found for song selection");
        }
    }
}
