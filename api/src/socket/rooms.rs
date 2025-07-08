use crate::{
    models::{Message, User, UserSafe},
    state::AppState,
};
use color_eyre::eyre::{Result, eyre};
use serde::{Deserialize, Serialize};
use socketioxide::{
    SocketIo,
    extract::{Data, SocketRef, State},
};

use tracing::{error, info, warn};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct JoinData {
    code: u32,
    username: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct GameUpdate {
    id: u32,
    users: Vec<UserSafe>,
    messages: Vec<Message>,
}

pub async fn room_join_handler_wrapper(
    s: SocketRef,
    io: SocketIo,
    data: Data<JoinData>,
    state: State<AppState>,
) {
    let result = room_join_handler(s, io, data, state).await;

    match result {
        Ok(_) => (),
        Err(e) => {
            error!("{:?}", e);
        }
    }
}

pub async fn room_join_handler(
    s: SocketRef,
    io: SocketIo,
    Data(data): Data<JoinData>,
    State(state): State<AppState>,
) -> Result<()> {
    let mut rooms = state.rooms.lock().await;
    let room = rooms.get_mut(&data.code);

    match room {
        Some(room) => {
            if room.users.iter().any(|user| user.id == s.id.to_string()) {
                let _ = s.emit("error", "You are already in this room");
                return Err(eyre!("User {} is already in this room", s.id));
            }

            let mut players = state.players.lock().await;
            if players.contains_key(&s.id.to_string()) {
                let _ = s.emit("error", "You are already in a room");
                return Err(eyre!("User {} is already in a room", s.id));
            };

            players.insert(s.id.to_string(), data.code);

            s.join(data.code.to_string());

            let user = User {
                id: s.id.to_string(),
                name: data.username,
                song_id: None,
                is_game_master: room.users.is_empty(),
            };

            room.users.push(user.clone());

            let room_update = GameUpdate {
                id: data.code,
                users: room.users.iter().map(|user| user.to_safe()).collect(),
                messages: room.messages.clone(),
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
            s.emit("error", &format!("{} is not a valid room code", data.code))
                .ok();
            let _ = s.emit(
                "wrong_room",
                &format!("{} is not a valid room code", data.code),
            );
            warn!("Attempted to join invalid room code: {}", data.code);
        }
    }
    Ok(())
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
