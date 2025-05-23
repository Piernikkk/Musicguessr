use color_eyre::eyre::Result;
use socketioxide::{SocketIo, extract::SocketRef};

use crate::state::AppState;

pub async fn init_io(io: SocketIo, _state: AppState) -> Result<()> {
    io.ns("/", |s: SocketRef| {
        dbg!("new connection");
        // For each "message" event received, send a "message-back" event with the "Hello World!" event
        s.on("message", |s: SocketRef| {
            s.emit("message-back", "Hello World!").ok();
        });
    });

    Ok(())
}
