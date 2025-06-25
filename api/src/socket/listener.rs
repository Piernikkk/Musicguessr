use color_eyre::eyre::Result;
use socketioxide::{SocketIo, extract::SocketRef};

use crate::socket::room_join::{room_disconnect, room_join_handler};

pub async fn init_io(io: SocketIo) -> Result<()> {
    io.ns("/", |s: SocketRef| {
        dbg!("new connection");

        s.on("join", room_join_handler);

        s.on_disconnect(room_disconnect);
    });

    Ok(())
}
