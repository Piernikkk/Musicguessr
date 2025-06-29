import { atom } from "jotai";

export const songAtom = atom<TSong>();

export interface TSong {
    id: string;
    title: string;
    artist: string;
}