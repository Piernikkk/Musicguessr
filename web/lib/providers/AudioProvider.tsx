'use client';
import { useAtom } from 'jotai';
import { createContext, RefObject, useEffect, useRef } from 'react';
import { nowPlayingAtom, NowPlayingState } from '../atoms/nowPlaying';

export const AudioContext = createContext<RefObject<HTMLAudioElement | null> | null>(null);

export default function AudioProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [nowPlaying, setNowPlaying] = useAtom(nowPlayingAtom);

    useEffect(() => {
        if (!audioRef.current) {
            return;
        }

        const onPlay = () => {
            setNowPlaying((s) => ({ ...(s as NowPlayingState), isPlaying: true }));
        };

        const onPause = () => {
            setNowPlaying((s) => ({ ...(s as NowPlayingState), isPlaying: false }));
        };

        audioRef.current.addEventListener('play', onPlay);
        audioRef.current.addEventListener('pause', onPause);

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('play', onPlay);
                audioRef.current.removeEventListener('pause', onPause);
            }
        };
    }, [nowPlaying?.nowPlaying, setNowPlaying]);

    return (
        <AudioContext.Provider value={audioRef}>
            <audio ref={audioRef} />
            {children}
        </AudioContext.Provider>
    );
}
