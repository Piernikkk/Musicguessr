use mongodb::bson::{self, Document};
use serde::{Deserialize, Serialize};
use time::UtcDateTime;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct UserSafe {
    pub id: String,
    pub name: String,
    pub song_selected: bool,
    pub is_game_master: bool,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct User {
    pub id: String,
    pub name: String,
    pub song_id: Option<u32>,
    pub is_game_master: bool,
}

impl User {
    pub fn to_safe(&self) -> UserSafe {
        UserSafe {
            id: self.id.clone(),
            name: self.name.clone(),
            song_selected: self.song_id.is_some(),
            is_game_master: self.is_game_master,
        }
    }
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
    pub game_started: bool,
    pub current_song: Option<Song>,
}

#[derive(Clone, Debug, Deserialize, Serialize, Default)]
pub struct Song {
    pub track_id: u32,
    pub track_name: String,
    pub artist_id: u32,
    pub artist_name: String,
    pub collection_id: u32,
    pub collection_name: String,
    pub artwork_url_30: String,
    pub artwork_url_60: String,
    pub artwork_url_100: String,
    pub realese_date: String,
    pub track_explicitness: bool,
    pub track_time_millis: u32,
    pub preview_url: String,
    pub primary_genre_name: String,
}

#[derive(Clone, Debug, Deserialize, Serialize, Default)]
pub struct GameSong {
    pub preview_url: String,
    pub title_length: Vec<bool>,
    pub artist_length: Vec<bool>,
}

impl From<Song> for Document {
    fn from(val: Song) -> Self {
        bson::to_document(&val).expect("Failed to convert Song to Document")
    }
}

impl Song {
    pub fn to_game(&self) -> GameSong {
        let title: Vec<bool> = self.track_name.chars().map(|c| c != ' ').collect();
        let artist: Vec<bool> = self.artist_name.chars().map(|c| c != ' ').collect();

        GameSong {
            preview_url: self.preview_url.clone(),
            title_length: title,
            artist_length: artist,
        }
    }
}
