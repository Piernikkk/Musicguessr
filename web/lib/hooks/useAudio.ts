import { useContext } from 'react';
import { AudioContext } from '../providers/AudioProvider';
import { useAtom } from 'jotai';
import { nowPlayingAtom, NowPlayingState } from '../atoms/nowPlaying';

export function useAudio() {
    const audioRef = useContext(AudioContext);

    const [nowPlaying, setNowPlaying] = useAtom(nowPlayingAtom);

    return {
        play: (src: string) => {
            if (!audioRef) {
                console.error('Audio context is not available');
                return;
            }

            if (!audioRef?.current) {
                audioRef.current = new Audio(src);
                setNowPlaying((s) => ({ ...(s as NowPlayingState), nowPlaying: src }));
            } else {
                audioRef.current.src = src;
                setNowPlaying((s) => ({ ...(s as NowPlayingState), nowPlaying: src }));
                audioRef.current.play().catch((error) => {
                    console.error('Error playing audio:', error);
                });
            }
        },
        pause: () => {
            if (!audioRef?.current) return;
            audioRef.current.pause();
        },
        isPlaying: () => {
            return audioRef?.current?.paused == false ? audioRef?.current?.src : false;
        },
        switch: (src: string) => {
            if (!audioRef) {
                console.error('Audio context is not available');
                return;
            }

            if (audioRef?.current?.paused == false && audioRef?.current?.src === src) {
                audioRef.current.pause();
                return;
            }

            if (!audioRef?.current) {
                audioRef.current = new Audio(src);
                setNowPlaying((s) => ({ ...(s as NowPlayingState), nowPlaying: src }));
            } else {
                audioRef.current.src = src;
                setNowPlaying((s) => ({ ...(s as NowPlayingState), nowPlaying: src }));
                audioRef.current.play().catch((error) => {
                    console.error('Error playing audio:', error);
                });
            }
        },
        nowPlaying: nowPlaying,
    };
}
