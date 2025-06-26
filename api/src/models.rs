use serde::{Deserialize, Serialize};
use time::UtcDateTime;

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct User {
    pub id: String,
    pub name: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Message {
    pub user_id: String,
    pub username: String,
    pub content: String,
    pub timestamp: UtcDateTime,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Room {
    pub users: Vec<User>,
    pub messages: Vec<Message>,
}
