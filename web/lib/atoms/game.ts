import { atom } from 'jotai';

export const gameAtom = atom<TGame>();

export interface User {
    id: string;
    name: string;
    song_selected?: boolean;
    is_game_master?: boolean;
    guessed?: boolean;
}

export interface TMessage {
    message_type: 'Chat' | 'Guess' | 'Close' | 'System';
    user_id: string;
    username: string;
    content: string;
    timestamp: [number, number, number, number, number, number];
}

export interface TGame {
    id: number;
    users?: User[];
    messages?: TMessage[];
    is_started?: boolean;
    current_game_state: 'guess' | 'reveal' | 'summary';
    current_song?: {
        preview_url: string;
        title_length: boolean[];
        artist_length: boolean[];
        title?: string;
        artist?: string;
        artwork_url?: string;
    };
}
