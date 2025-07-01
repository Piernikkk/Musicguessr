import { TSong } from './song';

export interface paths {
    '/search': {
        parameters: {
            query: {
                term: string; // required
                country?: string; // default: US
                media?:
                    | 'movie'
                    | 'podcast'
                    | 'music'
                    | 'musicVideo'
                    | 'audiobook'
                    | 'shortFilm'
                    | 'tvShow'
                    | 'software'
                    | 'ebook'
                    | 'all';
                entity?:
                    | 'movieArtist'
                    | 'movie'
                    | 'podcastAuthor'
                    | 'podcast'
                    | 'musicArtist'
                    | 'musicTrack'
                    | 'album'
                    | 'musicVideo'
                    | 'mix'
                    | 'song'
                    | 'audiobookAuthor'
                    | 'audiobook'
                    | 'shortFilmArtist'
                    | 'shortFilm'
                    | 'tvEpisode'
                    | 'tvSeason'
                    | 'software'
                    | 'iPadSoftware'
                    | 'macSoftware'
                    | 'ebook'
                    | 'allArtist'
                    | 'allTrack';
                attribute?: string;
                callback?: string;
                limit?: number; // 1-200, default 50
                lang?: 'en_us' | 'ja_jp';
                version?: 1 | 2;
                explicit?: 'Yes' | 'No';
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations['search'];
    };
}

export interface ItunesSearchResponse {
    resultCount: number;
    results: TSong[];
}

export interface operations {
    search: {
        parameters: {
            query: {
                term: string; // required
                country?: string; // default: US
                media?:
                    | 'music'
                    | 'movie'
                    | 'podcast'
                    | 'musicVideo'
                    | 'audiobook'
                    | 'shortFilm'
                    | 'tvShow'
                    | 'software'
                    | 'ebook'
                    | 'all';
                entity?:
                    | 'song'
                    | 'movieArtist'
                    | 'movie'
                    | 'podcastAuthor'
                    | 'podcast'
                    | 'musicArtist'
                    | 'musicTrack'
                    | 'album'
                    | 'musicVideo'
                    | 'mix'
                    | 'audiobookAuthor'
                    | 'audiobook'
                    | 'shortFilmArtist'
                    | 'shortFilm'
                    | 'tvEpisode'
                    | 'tvSeason'
                    | 'software'
                    | 'iPadSoftware'
                    | 'macSoftware'
                    | 'ebook'
                    | 'allArtist'
                    | 'allTrack';
                attribute?: string;
                callback?: string;
                limit?: number; // 1-200, default 50
                lang?: 'en_us' | 'ja_jp';
                version?: 1 | 2;
                explicit?: 'Yes' | 'No';
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        responses: {
            /** @description Success */
            200: {
                headers?: never;
                content: {
                    'application/json': ItunesSearchResponse;
                };
            };
        };
    };
}

export type ItunesMediaEntityMap = {
    movie: 'movieArtist' | 'movie';
    podcast: 'podcastAuthor' | 'podcast';
    music: 'musicArtist' | 'musicTrack' | 'album' | 'musicVideo' | 'mix' | 'song';
    musicVideo: 'musicArtist' | 'musicVideo';
    audiobook: 'audiobookAuthor' | 'audiobook';
    shortFilm: 'shortFilmArtist' | 'shortFilm';
    tvShow: 'tvEpisode' | 'tvSeason';
    software: 'software' | 'iPadSoftware' | 'macSoftware';
    ebook: 'ebook';
    all:
        | 'movie'
        | 'album'
        | 'allArtist'
        | 'podcast'
        | 'musicVideo'
        | 'mix'
        | 'audiobook'
        | 'tvSeason'
        | 'allTrack';
};

// For use in your app code, not in OpenAPI interface:
export type ItunesEntityForMedia<M extends keyof ItunesMediaEntityMap> = ItunesMediaEntityMap[M];
