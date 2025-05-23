use std::{ops::Deref, sync::Arc};

use mongodb::Database;

#[derive(Clone)]
pub struct AppState(Arc<InnerState>);

impl AppState {
    pub fn new(state: InnerState) -> Self {
        Self(Arc::new(state))
    }
}

impl Deref for AppState {
    type Target = InnerState;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
#[allow(dead_code)]
pub struct InnerState {
    pub http_client: reqwest::Client,
    pub db: Database,
}
