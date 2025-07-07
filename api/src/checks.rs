use color_eyre::eyre::{Result, eyre};
use serde::{Deserialize, Serialize};
use strsim::levenshtein;

use crate::models::Song;

pub mod message_check;
pub mod song_check;

pub fn check_message(message: String) -> Result<()> {
    if message.is_empty() {
        return Err(eyre!("Message cannot be empty"));
    }
    if message.len() > 200 {
        return Err(eyre!("Message is too long"));
    }

    Ok(())
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum CheckType {
    Title,
    Artist,
    CloseTitle,
    CloseArtist,
}

pub fn check_for_song(message: String, song: Song) -> Option<CheckType> {
    let song_title = song.track_name.to_lowercase();
    let song_artist = song.artist_name.to_lowercase();

    let message = message.to_lowercase();

    if message.contains(&song_title) {
        return Some(CheckType::Title);
    }
    if message.contains(&song_artist) {
        return Some(CheckType::Artist);
    }

    if levenshtein(&message, &song_title) <= 2 {
        return Some(CheckType::CloseTitle);
    }
    if levenshtein(&message, &song_artist) <= 2 {
        return Some(CheckType::CloseArtist);
    }

    None
}
