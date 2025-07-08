import { useEffect } from 'react';
import { chatBarContainer, chatBarHeader, messagesWrapper } from './style';
import { useSocket } from '@/lib/hooks/useSocket';
import { useAtom } from 'jotai';
import { gameAtom, TMessage } from '@/lib/atoms/game';
import Message from '../Message';
import { useRef } from 'react';
import MessageInput from '../MessageInput';
import { useStartTyping } from 'react-use';
import Text from '@/lib/components/Text';
import Spacer from '@/lib/components/Spacer';

export default function ChatBar() {
    const socket = useSocket();

    const [game, setGame] = useAtom(gameAtom);

    const ref = useRef<HTMLInputElement>(null);

    useStartTyping(() => ref.current?.focus());

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

    function sendMessage() {
        if (!socket || !ref.current?.value) return;

        socket.emit('message', { content: ref.current.value });

        ref.current.value = '';
    }

    return (
        <div className={chatBarContainer}>
            <div className={chatBarHeader}>
                <Text size="xd" weight={600}>
                    Chat
                </Text>

                <Spacer />
            </div>
            <div className={messagesWrapper}>
                {game?.messages?.map((message, index) => (
                    <Message
                        key={index}
                        type={message.message_type}
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
            <MessageInput
                background="transparent"
                onSend={sendMessage}
                width={'100%'}
                placeholder="Type your message here"
                ref={ref}
            />
        </div>
    );
}
