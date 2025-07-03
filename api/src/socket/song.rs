use serde::{Deserialize, Serialize};
use socketioxide::{
    SocketIo,
    extract::{Data, SocketRef, State},
};

use crate::{checks::song_check::check_song, state::AppState};

use tracing::{error, info};

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
    let check = check_song(726416473, state.clone()).await;

    if let Err(check) = check {
        s.emit("song_error", "Song not found or invalid");
        error!("{:?}", check);
        return;
    };

    let mut rooms = state.rooms.lock().await;

    if s.rooms().is_empty() {
        error!("User {} is not in any room", s.id);
        s.emit("error", "You are not in any room");
        return;
    }

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

    info!("User {} selected song ID {}", s.id, data.id);
}
