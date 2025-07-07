export interface TSong {
    artistId: number;
    collectionId: number;
    trackId: number;
    artistName: string;
    collectionName: string;
    trackName: string;
    collectionCensoredName: string;
    trackCensoredName: string;
    artistViewUrl: string;
    collectionViewUrl: string;
    trackViewUrl: string;
    previewUrl: string;
    artworkUrl30: string;
    artworkUrl60: string;
    artworkUrl100: string;
    releaseDate: string;
    collectionExplicitness: 'notExplicit' | 'explicit';
    trackExplicitness: 'notExplicit' | 'explicit';
    trackTimeMillis: number;
    primaryGenreName: string;
}

export interface TSongResponse {
    track_id: number;
    track_name: string;
    artist_id: number;
    artist_name: string;
    collection_id: number;
    collection_name: string;
    artwork_url_30: string;
    artwork_url_60: string;
    artwork_url_100: string;
    realese_date: string;
    track_explicitness: boolean;
    track_time_millis: number;
    preview_url: string;
    primary_genre_name: string;
}
