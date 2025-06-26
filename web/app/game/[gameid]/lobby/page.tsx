'use client';
import Text from '@/lib/components/Text';
import { lobbyContainer } from './styles';
import Transform from '@/lib/components/Transform';
import { useAtomValue } from 'jotai';
import { gameAtom } from '@/lib/atoms/game';

export default function Lobby() {
    const game = useAtomValue(gameAtom);

    return (
        <div className={lobbyContainer}>
            <Transform
                onClick={() => {
                    navigator.clipboard.writeText(window.location.origin + '/?code=' + game?.id);
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
    );
}
