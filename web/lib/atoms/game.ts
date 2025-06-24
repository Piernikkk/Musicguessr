import { atom } from "jotai";

export const gameAtom = atom<Game>();

export interface User {
    id: string;
    name: string;
}
export interface Game {
    id: number;
    users?: User[]
};