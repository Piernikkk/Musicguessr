import { useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useAtom, useSetAtom } from 'jotai';
import { TGame, User, gameAtom } from '../atoms/game';
import { useLocalStorage } from 'react-use';
import { UserState } from '@/types/user';
import { useRouter } from 'next/navigation';
import { songAtom } from '../atoms/song';
import { TSongResponse } from '@/types/song';

type songSelectedResponse = {
    user_id: string;
    username: string;
    song_selected: boolean;
};

type GuessedResponse = {
    user_id: string;
    guess_type: 'CloseArtist' | 'CloseTitle' | 'Artist' | 'Title';
};

export default function GameProvider({
    children,
    gameId,
}: {
    children: React.ReactNode;
    gameId?: number;
}) {
    const socket = useSocket();
    const [, setGame] = useAtom(gameAtom);
    const [user] = useLocalStorage<UserState>('user');
    const router = useRouter();
    const setSong = useSetAtom(songAtom);

    useEffect(() => {
        if (!gameId) return;
        setSong(undefined);
    }, [gameId, setSong]);

    useEffect(() => {
        if (!socket) return;

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

        socket.on('song', (data: TGame['current_song']) => {
            console.log('Received song data:', data);
            setGame((prev) => {
                if (!prev) return prev;
                return { ...prev, current_song: data, current_game_state: 'guess' };
            });
        });

        socket.on('times_up', (data: TSongResponse) => {
            setGame((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    current_song: {
                        ...(prev.current_song as TGame['current_song']),
                        artist: data.artist_name,
                        title: data.track_name,
                        artwork_url: data.artwork_url_100,
                        preview_url: prev.current_song?.preview_url ?? '',
                        title_length: prev.current_song?.title_length ?? [],
                        artist_length: prev.current_song?.artist_length ?? [],
                    },
                    current_game_state: 'reveal',
                };
            });
        });

        socket.on('guessed', (data: GuessedResponse) => {
            console.log('User guessed:', data);
            if (!data.user_id || !data.guess_type) return;
            if (data.guess_type === 'CloseArtist' || data.guess_type === 'CloseTitle') {
                let tmp_user: User;
                setGame((prev) => {
                    console.log('Game', prev);

                    if (!prev) return prev;
                    const updatedUsers = prev.users?.map((user) => {
                        if (user.id === data.user_id) {
                            tmp_user = user;
                            return { ...user, guessed: true };
                        }
                        return user;
                    });
                    const messages = prev.messages;
                    messages?.push({
                        message_type: 'Close',
                        user_id: data.user_id,
                        username: tmp_user.name,
                        content: `You are close to guessing the ${data.guess_type === 'CloseArtist' ? 'artist' : 'title'}!`,
                        timestamp: new Date()
                            .toISOString()
                            .split('T')[1]
                            .split('.')[0]
                            .split(':')
                            .map(Number) as [number, number, number, number, number, number],
                    });
                    return { ...prev, users: updatedUsers, messages };
                });
            }
        });

        socket.on('game_over', () => {
            setGame((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    current_game_state: 'summary',
                };
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
            socket.off('wrong_room');
            socket.off('game_over');
            socket.off('guessed');
            socket.off('times_up');
            socket.off('song');
        };
    }, [socket]);

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
