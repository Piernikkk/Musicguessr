import { useContext, useEffect } from 'react';
import { AudioContext } from '../providers/AudioProvider';
import { useAtom } from 'jotai';
import { durationAtom, nowPlayingAtom, NowPlayingState, timeAtom } from '../atoms/nowPlaying';

export function useAudio() {
    const audioRef = useContext(AudioContext);

    const [nowPlaying, setNowPlaying] = useAtom(nowPlayingAtom);

    const [time, setTime] = useAtom(timeAtom);
    const [duration, setDuration] = useAtom(durationAtom);

    useEffect(() => {
        if (!audioRef?.current) return;

        function onTiemeUpdate() {
            if (!audioRef?.current) return;
            setTime(audioRef.current.currentTime);
        }

        function onDurationChange() {
            if (!audioRef?.current) return;
            setDuration(audioRef.current.duration);
        }

        audioRef.current.addEventListener('timeupdate', onTiemeUpdate);
        audioRef.current.addEventListener('durationchange', onDurationChange);

        return () => {
            if (!audioRef?.current) return;
            audioRef.current.removeEventListener('timeupdate', onTiemeUpdate);
            audioRef.current.removeEventListener('durationchange', onDurationChange);
        };
    }, [audioRef]);

    return {
        play: (src: string) => {
            if (!audioRef) {
                console.error('Audio context is not available');
                return;
            }

            if (!src || src === '') {
                console.error('No audio source provided');
                return;
            }

            if (audioRef?.current?.src === src && audioRef?.current?.paused == false) {
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
        time: time,
        duration: duration,
    };
}
