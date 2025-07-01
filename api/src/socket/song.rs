use serde::{Deserialize, Serialize};
use socketioxide::{extract::{Data, SocketRef, State}, SocketIo};

use crate::{checks::song_check::check_song, state::AppState};

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
    match check_song(data.id, state).await{
        Ok(_) => {
            dbg!("Song selected successfully");
            s.emit("song_selected", &data.id);
        },
        Err(e) => {
            dbg!("Error selecting song: {}", &e);
            s.emit("error", &format!("Failed to select song: {}", e));
        }
    }


}