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
import { useModals } from '@/lib/ModalsManager';

export default function Lobby() {
    const game = useAtomValue(gameAtom);

    const socket = useSocket();

    const router = useRouter();

    const modals = useModals();

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
                        disabled={!game?.users?.some((user) => user.song_selected)}
                        onClick={async () => {
                            if (game?.users?.some((user) => !user.song_selected)) {
                                const confirm = await modals.show('Confirm', {
                                    title: 'Start Game',
                                    description:
                                        'Not all the players selected a song. Are you sure you want to start the game?',
                                    confirmText: 'Yes',
                                    cancelText: 'No',
                                });
                                if (!confirm) return;
                            }
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
