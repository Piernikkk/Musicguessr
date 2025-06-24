use crate::{models::User, state::AppState};
use serde::{Deserialize, Serialize};
use socketioxide::{
    SocketIo,
    extract::{Data, SocketRef, State},
};

use tracing::{info, warn};

#[derive(Debug, Serialize, Deserialize)]
pub struct JoinData {
    code: u32,
    username: String,
}

pub async fn room_join_handler(
    s: SocketRef,
    Data(data): Data<JoinData>,
    State(state): State<AppState>,
) {
    if state.rooms.lock().await.contains_key(&data.code) {
        let room_code = data.code.to_string();
        s.join(room_code.clone());

        let user = User {
            id: s.id.to_string(),
            name: data.username,
        };

        let emit = s.to(room_code.clone()).emit("joined", &user).await;

        match emit {
            Ok(_) => info!("User {} joined room {}", user.name, data.code),
            Err(e) => {
                info!("Failed to emit 'joined' event: {}", e);
                let _ = s.emit("error", "Failed to join room");
            }
        }
        let mut room = {
            let rooms = state.rooms.lock().await;
            let Some(room) = rooms.get(&data.code) else {
                let _ = s.emit("error", "Room not found");
                return;
            };
            room.clone()
        };

        room.users.push(user);

        state.rooms.lock().await.insert(data.code, room);
    } else {
        let _ = s.emit("error", &format!("{} is not a valid room code", data.code));
        warn!("Attempted to join invalid room code: {}", data.code);
    }
}

pub async fn room_disconnect(s: SocketRef, _io: SocketIo) {
    info!("{} disconnected", s.id);
    let _ = s.to(s.rooms()).emit("disconnected", &s.id).await;
}
