import { useEffect } from 'react';
import { chatBarContainer } from './style';
import Input from '@/lib/components/Input';
import { useSocket } from '@/lib/hooks/useSocket';
import { useAtom } from 'jotai';
import { gameAtom } from '@/lib/atoms/game';
import Message from '../Message';

export default function ChatBar() {
    const socket = useSocket();

    const [game, setGame] = useAtom(gameAtom);

    useEffect(() => {
        if (!socket) return;

        socket.on('message', (data: { username: string; message: string; timestamp: string }) => {
            console.log(`${data.timestamp} - ${data.username}: ${data.message}`);
        });

        return () => {
            socket.off('message');
        };
    }, [socket]);

    return (
        <div className={chatBarContainer}>
            <div>
                {game?.messages?.map((message, index) => (
                    <Message key={index} timestamp={message.timestamp} username={message.username}>
                        {message.content}
                    </Message>
                ))}
            </div>
            <Input background="transparent" width={'100%'} placeholder="Type your message here" />
        </div>
    );
}
