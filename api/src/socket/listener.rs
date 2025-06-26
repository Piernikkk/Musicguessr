use color_eyre::eyre::Result;
use socketioxide::{SocketIo, extract::SocketRef};

use crate::socket::{
    messages::message_handler,
    rooms::{room_disconnect, room_join_handler},
};

pub async fn init_io(io: SocketIo) -> Result<()> {
    io.ns("/", |s: SocketRef| {
        dbg!("new connection");

        s.on("join", room_join_handler);

        s.on("leave", room_disconnect);

        s.on("message", message_handler);

        s.on_disconnect(room_disconnect);
    });

    Ok(())
}
