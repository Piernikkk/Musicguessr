use color_eyre::eyre::Result;
use serde::{Deserialize, Serialize};
use socketioxide::{
    SocketIo,
    extract::{Data, SocketRef},
};
use tracing::info;

use crate::state::AppState;

#[derive(Debug, Serialize, Deserialize)]
struct JoinData {
    code: u32,
}

pub async fn init_io(io: SocketIo, _state: AppState) -> Result<()> {
    io.ns("/", |s: SocketRef| {
        dbg!("new connection");
        // For each "message" event received, send a "message-back" event with the "Hello World!" event
        s.on("join", |s: SocketRef, Data(data): Data<JoinData>| {
            info!("client connected to {}", data.code);
        });
        s.on_disconnect(|| {
            dbg!("Client Disconnected");
        });
    });

    Ok(())
}
