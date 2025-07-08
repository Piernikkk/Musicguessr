use std::{collections::HashMap, sync::Arc};

use mongodb::Database;
use tokio::sync::RwLock;

use crate::models::Room;

#[derive(Clone)]
pub struct AppState {
    pub http_client: reqwest::Client,
    pub db: Database,
    pub rooms: Arc<RwLock<HashMap<u32, Room>>>,
    pub players: Arc<RwLock<HashMap<String, u32>>>,
}
