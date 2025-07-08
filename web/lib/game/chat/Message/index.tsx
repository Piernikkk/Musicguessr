import Text from '@/lib/components/Text';
import { messageContainer } from './styles';
import { css } from '@/styled-system/css';
import { TGame } from '@/lib/atoms/game';

interface MessageProps {
    children: string;
    username: string;
    timestamp?: Date;
    type: NonNullable<TGame['messages']>[number]['message_type'];
}

export default function Message({ username, children, type }: MessageProps) {
    return (
        <div className={messageContainer}>
            {!(type == 'Guess' || type == 'Close') && (
                <Text size="xxs" weight={600} textWrap>
                    {type == 'Chat' ? username : 'System'}:
                </Text>
            )}
            <Text
                size="xxs"
                color={type == 'Guess' ? 2 : type == 'Close' ? 'close' : undefined}
                className={css({ flex: 1 })}
                textWrap
            >
                {children}
            </Text>
        </div>
    );
}
