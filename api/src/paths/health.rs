use utoipa_axum::{router::OpenApiRouter, routes};

use crate::state::AppState;

pub fn router(_state: AppState) -> OpenApiRouter<AppState> {
    OpenApiRouter::new().routes(routes!(health))
}

/// Get health of the service (returns "ok")
#[utoipa::path(
    method(get),
    path = "/",
    responses(
        (status = OK, description = "Success", body = str, content_type = "text/plain")
    )
)]
pub async fn health() -> &'static str {
    "ok"
}
