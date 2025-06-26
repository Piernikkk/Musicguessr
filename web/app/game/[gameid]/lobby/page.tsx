'use client';
import Text from '@/lib/components/Text';
import { lobbyContainer } from './styles';
import Transform from '@/lib/components/Transform';

export default function Lobby() {
    return (
        <div className={lobbyContainer}>
            <Transform
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                }}
                hoverChildren={
                    <Text size="lg" weight={600}>
                        Click to copy link!
                    </Text>
                }
            >
                <Text size="lg" weight={600}>
                    Invite others!
                </Text>
            </Transform>
        </div>
    );
}
