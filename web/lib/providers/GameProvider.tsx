import { useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useAtom } from 'jotai';
import { TGame, gameAtom } from '../atoms/game';

export default function GameProvider({
    children,
    gameId,
}: {
    children: React.ReactNode;
    gameId?: number;
}) {
    const socket = useSocket();
    const [game, setGame] = useAtom(gameAtom);

    useEffect(() => {
        if (!socket || !gameId) return;

        // if (!game?.id) {
        //     console.log('Connecting to game with ID:', gameId);
        //     socket.emit('join', { code: gameId, username: 'Placeholder' });
        // }

        socket.on('connect', () => {
            console.log('Connecting to game with ID:', gameId);
            socket.emit('join', { code: gameId, username: 'Placeholder' });
        });

        socket.on('joined', (data: TGame) => {
            if (!data) return;
            console.log('Joined game:', data);
            setGame(data);
        });

        socket.on('disconnected', (data: string) => {
            console.log('User disconnected:', data);
            setGame((prev) => {
                if (!prev) return prev;
                return { ...prev, users: prev.users?.filter((user) => user.id !== data) };
            });
        });
        return () => {
            socket.off('joined');
            socket.off('connect');
            socket.off('disconnected');
        };
    }, [socket, gameId, game?.id, setGame]);

    return children;
}
