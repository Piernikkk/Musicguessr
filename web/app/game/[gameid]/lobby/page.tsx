'use client';
import Text from '@/lib/components/Text';
import { gameControlsContainer, lobbyContainer } from './styles';
import Transform from '@/lib/components/Transform';
import { useAtomValue } from 'jotai';
import { gameAtom } from '@/lib/atoms/game';
import SongIndicator from '@/lib/game/lobby/SongIndicator';

export default function Lobby() {
    const game = useAtomValue(gameAtom);

    return (
        <div className={lobbyContainer}>
            <div className={gameControlsContainer}>
                <Transform
                    onClick={() => {
                        navigator.clipboard.writeText(
                            window.location.origin + '/?code=' + game?.id
                        );
                    }}
                    hoverChildren={
                        <Text size="lg" weight={600}>
                            Click to copy link!
                        </Text>
                    }
                >
                    <Text size="lg" weight={600}>
                        Invite others!
                    </Text>
                </Transform>
            </div>
            <SongIndicator />
        </div>
    );
}
