import { revealPartContainer, revealPartImage, reveaSongDescription } from './styles';
import { useAtomValue } from 'jotai';
import { gameAtom } from '@/lib/atoms/game';
import Text from '@/lib/components/Text';

export default function RevealPart() {
    const game = useAtomValue(gameAtom);

    return (
        <div className={revealPartContainer}>
            {game?.current_song?.artwork_url && (
                <img
                    className={revealPartImage}
                    alt="artwork"
                    src={game?.current_song?.artwork_url}
                />
            )}
            <div className={reveaSongDescription}>
                <Text weight={500} size="xl">
                    {game?.current_song?.title}
                </Text>
                <Text weight={500} size="md" color={2}>
                    {game?.current_song?.artist}
                </Text>
            </div>
        </div>
    );
}
