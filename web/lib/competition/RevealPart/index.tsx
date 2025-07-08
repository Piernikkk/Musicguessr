import {
    revealPartContainer,
    revealPartImage,
    revealSongWrapper,
    reveaSongDescription,
} from './styles';
import { useAtomValue } from 'jotai';
import { gameAtom } from '@/lib/atoms/game';
import Text from '@/lib/components/Text';
import Timer from '@/lib/game/Timer';
import { useEffect, useState } from 'react';

export default function RevealPart() {
    const game = useAtomValue(gameAtom);

    const [time, setTimer] = useState(10);

    function updateTime() {
        setTimeout(() => {
            if (time >= 10) return;
            setTimer((prev) => prev - 1);
        }, 1000);
    }

    useEffect(() => updateTime());

    return (
        <div className={revealPartContainer}>
            <Text size="md" textAlign="center">
                The mysterious song is...
            </Text>
            <div className={revealSongWrapper}>
                {game?.current_song?.artwork_url && (
                    <img
                        className={revealPartImage}
                        alt="artwork"
                        src={game?.current_song?.artwork_url.replace('100x100bb', '500x500bb')}
                    />
                )}
                <div className={reveaSongDescription}>
                    <Text weight={500} size="lg" textAlign="center">
                        {game?.current_song?.title}
                    </Text>
                    <Text weight={500} size="md" color={2} textAlign="center">
                        {game?.current_song?.artist}
                    </Text>
                </div>
            </div>
            <Timer duration={10} time={time} />
        </div>
    );
}
