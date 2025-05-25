use axum::{Extension, Json};
use serde::Serialize;
use utoipa::ToSchema;
use utoipa_axum::{router::OpenApiRouter, routes};

use crate::{
    error::{AxumResult, AxumResultError},
    state::{AppState, Room},
};

pub fn router(state: AppState) -> OpenApiRouter<AppState> {
    OpenApiRouter::new()
        .routes(routes!(create_game_room))
        .layer(Extension(state.clone()))
}

#[derive(Serialize, ToSchema)]
pub struct CreateRoomResponse {
    id: u32,
}

/// Create a game room
#[utoipa::path(
    method(post),
    path = "/",
    responses(
        (status = OK, description = "Success", body = CreateRoomResponse, content_type = "application/json"),
        (status = INTERNAL_SERVER_ERROR, description = "Internal Server Error", body = AxumResultError, content_type = "application/json")
    ),
)]
pub async fn create_game_room(
    Extension(state): Extension<AppState>,
) -> AxumResult<Json<CreateRoomResponse>> {
    let id = 123455;

    let room = state.rooms.lock().await.insert(id, Room { users: vec![] });

    dbg!(room);

    Ok(Json(CreateRoomResponse { id }))
}
