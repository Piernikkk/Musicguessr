import { atom } from "jotai";

export interface UserState {
    username: string;
}
export const userAtom = atom<UserState>();
