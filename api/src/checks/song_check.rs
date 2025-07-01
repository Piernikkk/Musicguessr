use color_eyre::eyre::Context;

use crate::state::AppState;

pub async fn check_song(
    song_id: u32,
    state: AppState,
) -> Result<(), String> {
    let something = state.http_client
        .get(format!("https://api.example.com/songs/{}", song_id))
        .send()
        .await.wrap_err("Failed to fetch song data");

    dbg!(something.is_ok());

    Ok(())
}