use std::{collections::HashMap, ops::Deref, sync::Arc};

use mongodb::Database;
use serde::{Deserialize, Serialize};
use tokio::sync::Mutex;

use crate::models::User;

#[derive(Clone)]
pub struct AppState {
    pub http_client: reqwest::Client,
    pub db: Database,
    pub rooms: Arc<Mutex<HashMap<u32, Room>>>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Room {
    pub users: Vec<User>,
}
