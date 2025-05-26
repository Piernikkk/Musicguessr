use crate::state::AppState;
use serde::{Deserialize, Serialize};
use socketioxide::{
    SocketIo,
    extract::{Data, SocketRef},
};

use tracing::info;

#[derive(Debug, Serialize, Deserialize)]
pub struct JoinData {
    code: u32,
}

pub async fn room_join_handler(
    s: SocketRef,
    io: SocketIo,
    Data(data): Data<JoinData>,
    state: AppState,
) {
    if state.rooms.lock().await.contains_key(&data.code) {
        info!("client connected to {}", data.code);
        let room_code = data.code.to_string();
        s.join(room_code.clone());
        s.to(room_code.clone())
            .emit("message", &format!("{} joined", s.id))
            .await;
    } else {
        s.emit(
            "error",
            &format!("{} is not a valid room code", data.code.to_string()),
        );
    }
}
