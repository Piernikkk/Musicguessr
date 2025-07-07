'use client';
import HintText from '@/lib/game/HintText';
import { gameContainer, gameTextSection } from './styles';
import { useAtomValue } from 'jotai';
import { gameAtom } from '@/lib/atoms/game';
import Text from '@/lib/components/Text';
import Timer from '@/lib/game/Timer';
import { useEffect } from 'react';
import { useAudio } from '@/lib/hooks/useAudio';

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

    if (!game?.current_song) {
        return (
            <div className={gameContainer}>
                <Text size="xxxl">Loading...</Text>
            </div>
        );
    }

    return (
        <div className={gameContainer}>
            <div className={gameTextSection}>
                <Text size="md" weight={600}>
                    Time Left:
                </Text>
                <Timer duration={audio.duration || 0} time={audio.time || 0} />
            </div>
            <div className={gameTextSection}>
                <Text weight={600}>Title:</Text>
                <HintText length={game?.current_song?.title_length || []} />
            </div>
            <div className={gameTextSection}>
                <Text weight={600}>Artist:</Text>
                <HintText length={game?.current_song?.artist_length || []} />
            </div>
        </div>
    );
}
