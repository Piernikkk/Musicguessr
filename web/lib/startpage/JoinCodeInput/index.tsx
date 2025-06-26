'use client';
import Input from '@/lib/components/Input';
import { inputs, joinButtonContainer, joinCodeInputContainer } from './styles';
import GlowTile from '@/lib/components/GlowTile';
import Button from '@/lib/components/Button';
import Text from '@/lib/components/Text';
import Spacer from '@/lib/components/Spacer';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { $api } from '@/lib/providers/api';
import { useSocket } from '@/lib/hooks/useSocket';
import { TGame, gameAtom } from '@/lib/atoms/game';
import { useSetAtom } from 'jotai';
import { UserState } from '@/types/user';
import { useLocalStorage, useStartTyping } from 'react-use';

export default function JoinCodeInput() {
    const [code, setCode] = useState<string>('');

    const [value, setValue] = useLocalStorage<UserState>('user');

    const serchParams = useSearchParams();

    useEffect(() => {
        if (!serchParams) return;

        const codeParam = serchParams.get('code');

        if (!codeParam) return;

        setCode(codeParam);
    }, []);

    const ref = useRef<HTMLInputElement>(null);

    useStartTyping(() => ref.current?.focus());

    const router = useRouter();
    const socket = useSocket();
    const setGame = useSetAtom(gameAtom);

    function Join(code: number) {
        if (!value?.username) {
            alert('Please enter a username before joining a game.');
            return;
        }

        if (!socket) {
            alert('There was an error when trying to connect to the server.');
            return;
        }

        socket.emit('join', { code: code, username: value.username });
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
        socket.on('joined', (data: TGame) => {
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
                value={value?.username || ''}
                placeholder="Enter your username"
                width={'100%'}
                centered
                onChange={(e) =>
                    setValue((u) => ({ ...(u || {}), username: e.currentTarget.value }))
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
                        ref={ref}
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
