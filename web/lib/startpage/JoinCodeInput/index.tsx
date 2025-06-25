'use client';
import Input from '@/lib/components/Input';
import { inputs, joinButtonContainer, joinCodeInputContainer } from './styles';
import GlowTile from '@/lib/components/GlowTile';
import Button from '@/lib/components/Button';
import Text from '@/lib/components/Text';
import Spacer from '@/lib/components/Spacer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { $api } from '@/lib/providers/api';
import { useSocket } from '@/lib/hooks/useSocket';
import { Game, gameAtom } from '@/lib/atoms/game';
import { useAtom, useSetAtom } from 'jotai';
import { userAtom } from '@/lib/atoms/user';

export default function JoinCodeInput() {
    const [code, setCode] = useState<string>('');

    const [user, setUser] = useAtom(userAtom);

    const router = useRouter();
    const socket = useSocket();
    const setGame = useSetAtom(gameAtom);

    function Join(code: number) {
        if (!user?.username) {
            alert('Please enter a username before joining a game.');
            return;
        }

        if (!socket) {
            alert('There was an error when trying to connect to the server.');
            return;
        }

        socket.emit('join', { code: code, username: user.username });
    }

    function handleJoin() {
        if (!code || code.length !== 6) {
            alert('Please enter a valid 6-digit game code.');
            return;
        }

        Join(parseInt(code));
    }

    useEffect(() => {
        if (!socket) return;
        socket.on('joined', (data: Game) => {
            setGame(data);
            router.push(`/game/${data.id}/lobby`);
        });

        socket.on('error', (error: string) => {
            alert(`Error joining game: ${error}`);
        });

        return () => {
            socket.off('joined');
            socket.off('error');
        };
    }, [socket, router, setGame]);

    const createGameMutation = $api.useMutation('post', '/api/game');

    async function handleCreateLobby() {
        const result = await createGameMutation.mutateAsync({}).catch((error) => {
            alert(`Something went wrong: ${error.message}`);
        });

        if (result) {
            Join(result.id);
        }
    }

    return (
        <GlowTile className={joinCodeInputContainer}>
            <Input
                background="transparent"
                value={user?.username || ''}
                placeholder="Enter your username"
                width={'100%'}
                centered
                onChange={(e) =>
                    setUser((u) => ({ ...(u || {}), username: e.currentTarget.value }))
                }
            />
            <div className={inputs}>
                <div className={joinButtonContainer}>
                    <Input
                        value={code}
                        onChange={(e) => setCode(e.currentTarget.value)}
                        placeholder="Game code"
                        background="transparent"
                        width={'100%'}
                        centered
                        type="number"
                        maxLength={6}
                    />
                    <Button onClick={handleJoin} label="Join" />
                </div>
                <Spacer>
                    <Text color={4}>OR</Text>
                </Spacer>
                <Button onClick={handleCreateLobby} label="Create Lobby" width={'100%'} />
            </div>
        </GlowTile>
    );
}
