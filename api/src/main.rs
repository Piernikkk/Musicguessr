mod error;
mod models;
mod paths;
mod socket;
mod state;
mod checks;

use std::{collections::HashMap, sync::Arc};

use axum::Router;
use color_eyre::eyre::Context;
use mongodb::{Client, Database};
use paths::{
    game,
    health::{self},
};
use socket::listener::init_io;
use socketioxide::{SocketIoBuilder, layer::SocketIoLayer};
use tokio::{net::TcpListener, sync::Mutex};
use tracing::{info, level_filters::LevelFilter, warn};
use tracing_error::ErrorLayer;
use tracing_subscriber::{
    fmt::format::FmtSpan, layer::SubscriberExt as _, util::SubscriberInitExt as _,
};
use utoipa::OpenApi;
use utoipa_axum::router::OpenApiRouter;
use utoipa_rapidoc::RapiDoc;
use utoipa_redoc::{Redoc, Servable as _};
use utoipa_scalar::{Scalar, Servable as _};
use utoipa_swagger_ui::SwaggerUi;

use crate::{ state::AppState};

#[derive(OpenApi)]
#[openapi()]
struct ApiDoc;

#[tokio::main]
async fn main() -> color_eyre::Result<()> {
    color_eyre::install()?;

    dotenvy::dotenv().ok();

    init_tracing().wrap_err("failed to set global tracing subscriber")?;

    let http_client = init_reqwest().wrap_err("failed to initialize HTTP client")?;

    let db = init_mongodb()
        .await
        .wrap_err("failed to initialize MongoDB client")?;

    let app_state = AppState {
        http_client,
        db,
        rooms: Arc::new(Mutex::new(HashMap::new())),
        players: Arc::new(Mutex::new(HashMap::new())),
    };

    let (layer, io) = SocketIoBuilder::new()
        .with_state(app_state.clone())
        .build_layer();
    let app = init_axum(app_state.clone(), layer);

    let listener = init_listener()
        .await
        .wrap_err("failed to bind to address")?;

    info!(
        "listening on {}",
        listener
            .local_addr()
            .wrap_err("failed to get local address")?
    );

    let (_, _) = tokio::join!(
        async {
            axum::serve(listener, app.into_make_service())
                .await
                .wrap_err("failed to run server")
        },
        async { init_io(io).await.wrap_err("Failed to create watcher") }
    );
    Ok(())
}

fn init_reqwest() -> Result<reqwest::Client, reqwest::Error> {
    reqwest::ClientBuilder::new()
        .redirect(reqwest::redirect::Policy::none())
        .build()
}

fn init_tracing() -> color_eyre::Result<()> {
    tracing_subscriber::Registry::default()
        .with(tracing_subscriber::fmt::layer().with_span_events(FmtSpan::NEW | FmtSpan::CLOSE))
        .with(ErrorLayer::default())
        .with(
            tracing_subscriber::EnvFilter::builder()
                .with_default_directive(LevelFilter::INFO.into())
                .from_env()?,
        )
        .try_init()?;

    Ok(())
}

async fn init_mongodb() -> color_eyre::Result<Database> {
    let uri = std::env::var("MONGODB_URI").unwrap_or_else(|_| {
        warn!("missing MONGODB_URI, defaulting to mongodb://localhost:27017");
        "mongodb://localhost:27017".to_string()
    });

    let client = Client::with_uri_str(uri).await?;

    let db = client.database("musicguessr");

    Ok(db)
}

fn init_axum(state: AppState, io_layer: SocketIoLayer) -> Router {
    let (router, api) = OpenApiRouter::with_openapi(ApiDoc::openapi())
        .nest("/api/health", health::router(state.clone()))
        .nest("/api/game", game::router(state.clone()))
        .with_state(state)
        .split_for_parts();

    let spec_path = "/apidoc/openapi.json";

    let router = router
        .merge(SwaggerUi::new("/apidoc/swagger-ui").url(spec_path, api.clone()))
        .merge(Redoc::with_url("/apidoc/redoc", api.clone()))
        .merge(RapiDoc::new(spec_path).path("/apidoc/rapidoc"))
        .merge(Scalar::with_url("/apidoc/scalar", api));

    router.merge(Router::new().layer(io_layer))
}

async fn init_listener() -> Result<TcpListener, std::io::Error> {
    let addr = std::env::var("BIND_ADDR").unwrap_or_else(|_| {
        warn!("missing BIND_ADDR, defaulting to http://localhost:3002");
        "localhost:3002".to_string()
    });

    TcpListener::bind(addr).await
}
