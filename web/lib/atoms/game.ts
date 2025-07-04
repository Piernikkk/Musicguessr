import { atom } from 'jotai';

export const gameAtom = atom<TGame>();

export interface User {
    id: string;
    name: string;
    song_selected?: boolean;
}

export interface TMessage {
    user_id: string;
    username: string;
    content: string;
    timestamp: [number, number, number, number, number, number];
}

export interface TGame {
    id: number;
    users?: User[];
    messages?: TMessage[];
}
