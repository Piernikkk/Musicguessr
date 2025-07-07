import { useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useAtom, useSetAtom } from 'jotai';
import { TGame, gameAtom } from '../atoms/game';
import { useLocalStorage } from 'react-use';
import { UserState } from '@/types/user';
import { useRouter } from 'next/navigation';
import { songAtom } from '../atoms/song';

type songSelectedResponse = {
    user_id: string;
    username: string;
    song_selected: boolean;
};

// type UserUpdate = {
//     id: string;
//     name: string;
//     song_selected?: boolean;
// };

// type TGameUpdate = {
//     id: number;
//     users: User[];
// };

export default function GameProvider({
    children,
    gameId,
}: {
    children: React.ReactNode;
    gameId?: number;
}) {
    const socket = useSocket();
    const [game, setGame] = useAtom(gameAtom);
    const [user] = useLocalStorage<UserState>('user');
    const router = useRouter();
    const setSong = useSetAtom(songAtom);

    useEffect(() => {
        if (!gameId) return;
        setSong(undefined);
    }, [gameId, setSong]);

    useEffect(() => {
        if (!socket || !gameId) return;

        // if (!game?.id) {
        //     console.log('Connecting to game with ID:', gameId);
        //     socket.emit('join', { code: gameId, username: 'Placeholder' });
        // }

        socket.on('song_selected', (data: songSelectedResponse) => {
            console.log('Song selected by user:', data);
            setGame((prev) => {
                if (!prev) return prev;
                const updatedUsers = prev.users?.map((user) => {
                    if (user.id === data.user_id) {
                        return { ...user, song_selected: true };
                    }
                    return user;
                });
                return { ...prev, users: updatedUsers };
            });
        });

        socket.on('wrong_room', () => {
            router.push('/');
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
            socket.off('song_selected');
        };
    }, [socket, gameId, game?.id, setGame]);

    useEffect(() => {
        if (!socket) return;
        socket.on('connect', () => {
            console.log('Connecting to game with ID:', gameId);
            if (!gameId) {
                router.push('/');
                return;
            }
            if (!user?.username) {
                router.push(`/?code=${gameId}`);
                return;
            }
            socket.emit('join', { code: gameId, username: user.username });
        });
    }, [socket, gameId, user?.username, router]);

    return children;
}
