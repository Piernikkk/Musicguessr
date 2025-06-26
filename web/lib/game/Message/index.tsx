import Text from '@/lib/components/Text';
import { messageContainer } from './styles';

interface MessageProps {
    children: string;
    username: string;
    timestamp?: Date;
}

export default function Message({ username, children }: MessageProps) {
    return (
        <div className={messageContainer}>
            <Text weight={600}>{username}</Text>
            <Text>{children}</Text>
        </div>
    );
}
