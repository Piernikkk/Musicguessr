use color_eyre::eyre::Result;
use socketioxide::{SocketIo, extract::SocketRef};

use crate::socket::{
    game::start_game,
    messages::message_handler,
    rooms::{room_disconnect, room_join_handler_wrapper},
    song::song_select,
};

pub async fn init_io(io: SocketIo) -> Result<()> {
    io.ns("/", |s: SocketRef| {
        dbg!("new connection");

        s.on("join", room_join_handler_wrapper);

        s.on("leave", room_disconnect);

        s.on("message", message_handler);

        s.on("song_select", song_select);

        s.on("start", start_game);

        s.on_disconnect(room_disconnect);
    });

    Ok(())
}
