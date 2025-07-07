'use client';
import { gameContainer } from './styles';
import { useAtomValue } from 'jotai';
import { gameAtom } from '@/lib/atoms/game';
import Text from '@/lib/components/Text';
import { useEffect } from 'react';
import { useAudio } from '@/lib/hooks/useAudio';
import GuessingPart from '@/lib/competition/GuessingPart';
import RevealPart from '@/lib/competition/RevealPart';

export default function GamePage() {
    const game = useAtomValue(gameAtom);

    const audio = useAudio();

    useEffect(() => {
        if (
            !game?.current_song?.preview_url ||
            !game.current_song.artist_length ||
            !game.current_song.title_length
        )
            return;

        audio.play(game?.current_song?.preview_url);
    }, [
        game?.current_song?.preview_url,
        game?.current_song?.artist_length,
        game?.current_song?.title_length,
    ]);

    if (!game?.current_game_state) {
        return (
            <div className={gameContainer}>
                <Text size="xxxl">Loading...</Text>
            </div>
        );
    }

    return (
        <div className={gameContainer}>
            {game.current_game_state == 'guess' && (
                <GuessingPart
                    songArtistLength={game.current_song?.artist_length || []}
                    songDuration={audio.duration}
                    songTime={audio.time}
                    songTitleLength={game.current_song?.title_length || []}
                />
            )}
            {game.current_game_state == 'reveal' && <RevealPart />}
        </div>
    );
}
