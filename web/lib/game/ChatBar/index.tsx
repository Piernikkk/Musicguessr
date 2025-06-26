import { useEffect } from 'react';
import { chatBarContainer, messagesWrapper } from './style';
import Input from '@/lib/components/Input';
import { useSocket } from '@/lib/hooks/useSocket';
import { useAtom } from 'jotai';
import { gameAtom, TMessage } from '@/lib/atoms/game';
import Message from '../Message';
import { getHotkeyHandler } from '@mantine/hooks';

export default function ChatBar() {
    const socket = useSocket();

    const [game, setGame] = useAtom(gameAtom);

    useEffect(() => {
        if (!socket) return;

        socket.on('message', (data: TMessage) => {
            console.log(`${data.timestamp} - ${data.username}: ${data.content}`);
            setGame((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    messages: [...(prev?.messages || []), data],
                };
            });
        });

        return () => {
            socket.off('message');
        };
    }, [socket]);

    function sendMessage(content: string) {
        if (!socket) return;

        socket.emit('message', { content: content });
    }

    return (
        <div className={chatBarContainer}>
            <div className={messagesWrapper}>
                {game?.messages?.map((message, index) => (
                    <Message
                        key={index}
                        timestamp={
                            new Date(
                                message.timestamp[0],
                                message.timestamp[1] - 1,
                                message.timestamp[2],
                                message.timestamp[3],
                                message.timestamp[4],
                                message.timestamp[5]
                            )
                        }
                        username={message.username}
                    >
                        {message.content}
                    </Message>
                ))}
            </div>
            <Input
                background="transparent"
                onKeyDown={getHotkeyHandler([
                    [
                        'Enter',
                        (e) => {
                            e.preventDefault();
                            sendMessage(e.target.value);
                        },
                    ],
                ])}
                width={'100%'}
                placeholder="Type your message here"
            />
        </div>
    );
}
