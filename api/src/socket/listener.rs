use color_eyre::eyre::Result;
use serde::{Deserialize, Serialize};
use socketioxide::{
    SocketIo,
    extract::{Data, SocketRef, State},
};

use crate::socket::room_join::{room_disconnect, room_join_handler};

pub async fn init_io(io: SocketIo) -> Result<()> {
    io.ns("/", |s: SocketRef| {
        dbg!("new connection");

        s.on("join", room_join_handler);

        s.on_disconnect(|s: SocketRef, io: SocketIo| room_disconnect(s, io));
    });

    Ok(())
}
