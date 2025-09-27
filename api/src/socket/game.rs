use socketioxide::{
    SocketIo,
    extract::{SocketRef, State},
};

use crate::{game_functions::main_game::game, state::AppState};

use tracing::{error, info, warn};

pub async fn start_game(s: SocketRef, io: SocketIo, State(state): State<AppState>) {
    if s.rooms().is_empty() {
        warn!("User {} is not in any room", s.id);
        s.emit("error", "You are not in any room").ok();
        return;
    }

    {
        let mut rooms = state.rooms.write().await;

        let room = rooms.get_mut(
            &s.rooms()[0]
                .parse::<u32>()
                .expect("Failed to parse room ID as u32"),
        );

        let Some(room) = room else {
            error!("Room not found");
            s.emit("error", &"Room you specified does not exist").ok();
            return;
        };

        let user = room.users.iter().find(|user| user.id == s.id.to_string());

        if let Some(user) = user {
            if !user.is_game_master {
                error!("User {} is not the game master", s.id);
                s.emit("error", "You are not the game master").ok();
            }
        } else {
            error!("User not found in room for song selection");
            s.emit("error", &format!("User {} not found in room", s.id))
                .ok();
        }
    }

    info!("User {} started the game in room {}", s.id, s.rooms()[0]);
    tokio::spawn(game(s, io, state));
}
