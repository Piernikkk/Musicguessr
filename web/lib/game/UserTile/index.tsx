import Text from '@/lib/components/Text';
import { userTileContainer, userTileText } from './styles';
import { IconCheck } from '@tabler/icons-react';

interface UserTileProps {
    username?: string;
    id: string;
    ready: boolean;
}

export default function UserTile({ username, ready }: UserTileProps) {
    return (
        <div className={userTileContainer}>
            <div className={userTileText}>
                <Text lineClamp={1}>{username}</Text>
            </div>
            {ready && <IconCheck />}
        </div>
    );
}
