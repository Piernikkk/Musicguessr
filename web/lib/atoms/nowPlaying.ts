import { atom } from 'jotai';

export interface NowPlayingState {
    nowPlaying: string | null;
    isPlaying: boolean;
}

export const nowPlayingAtom = atom<NowPlayingState>();
