use std::{collections::HashMap, ops::Deref, sync::Arc};

use mongodb::Database;
use tokio::sync::Mutex;

#[derive(Clone)]
pub struct AppState(InnerState);

impl AppState {
    pub fn new(state: InnerState) -> Self {
        Self(state)
    }
}

impl Deref for AppState {
    type Target = InnerState;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[derive(Clone)]
pub struct InnerState {
    pub http_client: reqwest::Client,
    pub db: Database,
    pub rooms: Arc<Mutex<HashMap<u32, Room>>>,
}

#[derive(Debug, Clone)]
pub struct Room {
    pub users: Vec<String>,
}
