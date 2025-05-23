use std::{ops::Deref, sync::Arc};

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

pub struct InnerState {
    pub http_client: reqwest::Client,
}
