import { atom } from 'jotai';

export interface NowPlayingState {
    nowPlaying: string | null;
    isPlaying: boolean;
}

export const nowPlayingAtom = atom<NowPlayingState>();

export const timeAtom = atom(0);

export const durationAtom = atom(0);
