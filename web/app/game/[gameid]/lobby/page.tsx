'use client';
import Text from '@/lib/components/Text';
import { gameControlsContainer, lobbyContainer } from './styles';
import Transform from '@/lib/components/Transform';
import { useAtomValue } from 'jotai';
import { gameAtom } from '@/lib/atoms/game';
import SongIndicator from '@/lib/game/lobby/SongIndicator';
import Button from '@/lib/components/Button';
import { useSocket } from '@/lib/hooks/useSocket';
import { useRouter } from 'next/navigation';

export default function Lobby() {
    const game = useAtomValue(gameAtom);

    const socket = useSocket();

    const router = useRouter();

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
                {game?.users?.find((u) => u.id == socket?.id)?.is_game_master && (
                    <Button
                        label="Start Game"
                        contrast
                        onClick={() => {
                            socket?.emit('start');
                            router.push(`/game/${game?.id}/game`);
                        }}
                    />
                )}
            </div>
            <SongIndicator />
        </div>
    );
}
