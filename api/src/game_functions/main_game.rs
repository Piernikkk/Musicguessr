use mongodb::bson::doc;
use socketioxide::{SocketIo, extract::SocketRef};
use std::time::Duration;
use tracing::{error, info, warn};

use crate::{models::Song, state::AppState};

pub async fn game(s: SocketRef, io: SocketIo, state: AppState) {
    info!("おはよう from thread");

    let room_id = s.rooms()[0]
        .parse::<u32>()
        .expect("Failed to parse room ID as u32");

    let mut rooms = state.rooms.write().await;

    let room = rooms.get_mut(&room_id);

    let users = match room {
        Some(room) => {
            let usrs = room
                .users
                .iter()
                .filter(|user| user.song_id.is_some())
                .cloned()
                .collect::<Vec<_>>();

            if usrs.is_empty() {
                warn!("No users with selected songs in room {}", s.rooms()[0]);
                let _ = s.emit("error", "No users with selected songs");
                return;
            }

            let _ = io
                .to(room_id.to_string())
                .emit("starting", "Game is starting!")
                .await;
            room.game_started = true;

            usrs
        }
        None => {
            error!("Room not found for user {}", s.id);
            let _ = s.emit("error", "Room not found");
            return;
        }
    };

    drop(rooms);

    for user in users {
        let song = state
            .db
            .collection::<Song>("songs")
            .find_one(doc! { "track_id": user.song_id })
            .await
            .expect("Database error")
            .expect("Failed to find song in database");

        let mut rooms = state.rooms.write().await;
        let room = rooms.get_mut(&room_id);

        if let Some(room) = room {
            room.current_song = Some(song.clone());
            info!("Current song set for room {}", s.rooms()[0]);
            let _ = io
                .to(room_id.to_string())
                .emit("song", &song.to_game())
                .await;
        } else {
            error!("Room not found for user {}", s.id);
            let _ = s.emit("error", "Room not found");
            return;
        }

        drop(rooms);

        tokio::time::sleep(Duration::from_secs(30)).await;

        let _ = io.to(s.rooms()).emit("times_up", &song).await;

        tokio::time::sleep(Duration::from_secs(10)).await;
    }

    let mut rooms = state.rooms.write().await;

    let room = rooms.get_mut(&room_id);

    if let Some(s) = room {
        s.game_started = false;
        s.current_song = None;
    } else {
        error!("Room not found for user {}", s.id);
        let _ = s.emit("error", "Room not found");
        return;
    }

    let _ = io
        .to(room_id.to_string())
        .emit("game_over", "Game over! Thanks for playing!")
        .await;
}
