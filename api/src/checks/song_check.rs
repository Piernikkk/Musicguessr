use color_eyre::eyre::{Context, Result, eyre};
use mongodb::bson::{Document, doc};
use serde::{Deserialize, Serialize};

use crate::{models::Song, state::AppState};

#[allow(non_snake_case)]
#[derive(Deserialize, Debug, Clone)]
struct ItunesSong {
    trackId: u32,
    trackName: String,
    artistId: u32,
    artistName: String,
    collectionId: u32,
    collectionName: String,
    artworkUrl30: String,
    artworkUrl60: String,
    artworkUrl100: String,
    releaseDate: String,
    trackExplicitness: String,
    trackTimeMillis: u32,
    primaryGenreName: String,
    previewUrl: String,
}

#[allow(non_snake_case)]
#[derive(Deserialize, Debug, Clone)]
struct ItunesResponse {
    resultCount: u32,
    results: Vec<ItunesSong>,
}

#[derive(Deserialize, Debug, Clone, Serialize)]
struct SearchParams {
    id: u32,
}

pub async fn fetch_from_itunes(song_id: u32, state: AppState) -> Result<()> {
    let params = SearchParams { id: song_id };

    let itunes_result = state
        .http_client
        .get("https://itunes.apple.com/lookup")
        .query(&params)
        .send()
        .await
        .wrap_err("Failed to fetch song data");

    match itunes_result {
        Ok(response) => {
            if response.status().is_success() {
                let body = response
                    .json::<ItunesResponse>()
                    .await
                    .wrap_err("Failed to read response body")?;

                if body.resultCount == 0 || body.results[0].trackId != song_id {
                    return Err(eyre!("Song not found"));
                }

                let data = body.results[0].clone();

                state
                    .db
                    .collection::<Song>("songs")
                    .find_one_and_update(
                        doc! { "track_id": song_id },
                        doc! {
                            "$set": Into::<Document>::into(Song {
                                track_id: data.trackId,
                                artist_id: data.artistId,
                                artist_name: data.artistName,
                                collection_id: data.collectionId,
                                collection_name: data.collectionName,
                                artwork_url_30: data.artworkUrl30,
                                artwork_url_60: data.artworkUrl60,
                                artwork_url_100: data.artworkUrl100,
                                realese_date: data.releaseDate,
                                track_explicitness: data.trackExplicitness == *"explicit",
                                track_time_millis: data.trackTimeMillis,
                                preview_url: data.previewUrl,
                                primary_genre_name: data.primaryGenreName,
                                track_name: data.trackName,
                            })
                        },
                    )
                    .upsert(true)
                    .await
                    .wrap_err("Failed to update song in database")?;
            } else {
                return Err(eyre!("Error fetching song: {}", response.status()));
            }
        }
        Err(e) => {
            return Err(e);
        }
    }

    Ok(())
}

pub async fn check_song(song_id: u32, state: AppState) -> Result<()> {
    let song = state
        .db
        .collection::<Song>("songs")
        .find_one(doc! { "track_id": song_id })
        .await
        .wrap_err("Failed when fetching from database")?;

    if song.is_some() {
        Ok(())
    } else {
        fetch_from_itunes(song_id, state).await
    }
}
