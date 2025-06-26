use std::{collections::HashMap, sync::Arc};

use mongodb::Database;
use tokio::sync::Mutex;

use crate::models::Room;

#[derive(Clone)]
pub struct AppState {
    pub http_client: reqwest::Client,
    pub db: Database,
    pub rooms: Arc<Mutex<HashMap<u32, Room>>>,
    pub players: Arc<Mutex<HashMap<String, u32>>>,
}
