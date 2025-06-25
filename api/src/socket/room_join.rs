use crate::{
    models::User,
    state::{AppState, Room},
};
use serde::{Deserialize, Serialize};
use socketioxide::{
    SocketIo,
    extract::{Data, SocketRef, State},
};

use tracing::{info, warn};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct JoinData {
    code: u32,
    username: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct GameUpdate {
    id: u32,
    users: Vec<User>,
}

pub async fn room_join_handler(
    s: SocketRef,
    io: SocketIo,
    Data(data): Data<JoinData>,
    State(state): State<AppState>,
) {
    let mut rooms = state.rooms.lock().await;
    let room = rooms.get_mut(&data.code);

    match room {
        Some(room) => {
            if room.users.iter().any(|user| user.id == s.id.to_string()) {
                let _ = s.emit("error", "You are already in this room");
                warn!("User {} is already in this room", s.id);
                return;
            }

            s.join(data.code.to_string());

            let user = User {
                id: s.id.to_string(),
                name: data.username,
            };

            room.users.push(user.clone());

            state
                .players
                .lock()
                .await
                .insert(s.id.to_string(), data.code);
            //

            // let room_clone = room.clone();
            let room_update = GameUpdate {
                id: data.code,
                users: room.users.clone(),
            };
            drop(rooms);

            let _ = io
                .to(data.code.to_string())
                .emit("joined", &room_update)
                .await;
            info!("User {} joined room {}", user.id, data.code);
        }
        None => {
            drop(rooms);
            let _ = s.emit("error", &format!("{} is not a valid room code", data.code));
            warn!("Attempted to join invalid room code: {}", data.code);
        }
    }
}

pub async fn room_disconnect(s: SocketRef, _io: SocketIo, State(state): State<AppState>) {
    let room_id = state.players.lock().await.remove_entry(&s.id.to_string());

    s.leave_all();
    dbg!(s.rooms());

    let mut rooms = state.rooms.lock().await;
    if let Some((_, room_code)) = room_id {
        if let Some(room) = rooms.get_mut(&room_code) {
            room.users.retain(|user| user.id != s.id.to_string());
            if room.users.is_empty() {
                rooms.remove(&room_code);
                info!("Room {} has been removed as it is empty", room_code);
            } else {
                let _ = s.to(s.rooms()).emit("disconnected", &s.id).await;
                info!("User {} left room {}", s.id, room_code);
            }
        } else {
            warn!(
                "Room {} not found when disconnecting user {}",
                room_code, s.id
            );
        }
    } else {
        warn!("User {} was not in any room when disconnecting", s.id);
    }
}
