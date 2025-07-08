import Text from '@/lib/components/Text';
import { messageContainer } from './styles';
import { css } from '@/styled-system/css';

interface MessageProps {
    children: string;
    username: string;
    timestamp?: Date;
}

export default function Message({ username, children }: MessageProps) {
    return (
        <div className={messageContainer}>
            <Text size="xxs" weight={600}>
                {username}:
            </Text>
            <Text size="xxs" className={css({ wordBreak: 'break-all', flex: 1 })}>
                {children}
            </Text>
        </div>
    );
}
