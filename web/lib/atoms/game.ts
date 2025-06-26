import { atom } from "jotai";

export const gameAtom = atom<Game>();

export interface User {
    id: string;
    name: string;
}

export interface Message {
    user_id: number;
    username: string;
    content: string;
    timestamp: Date;
}

export interface Game {
    id: number;
    users?: User[];
    messages?: Message[];
};