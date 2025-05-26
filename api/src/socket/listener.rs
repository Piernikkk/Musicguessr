use color_eyre::eyre::Result;
use serde::{Deserialize, Serialize};
use socketioxide::{SocketIo, extract::SocketRef};
use tracing::info;

use crate::{socket::room_join::room_join_handler, state::AppState};

#[derive(Debug, Serialize, Deserialize)]
struct JoinData {
    code: u32,
}

pub async fn init_io(io: SocketIo, state: AppState) -> Result<()> {
    io.ns("/", |s: SocketRef| {
        dbg!("new connection");

        s.on("join", |s: SocketRef, io: SocketIo, d| {
            room_join_handler(s, io, d, state)
        });

        s.on_disconnect(|s: SocketRef| info!("{} disconnected", s.id));
    });

    Ok(())
}
