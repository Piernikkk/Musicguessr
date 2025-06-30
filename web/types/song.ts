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
