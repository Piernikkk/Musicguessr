'use client';
import UserBar from '@/lib/game/UserBar';
import {
    chatBarContainer,
    fancyBackground,
    fancyBackgroundBlur,
    fancyBackgroundBlur2,
    gameContainer,
    mainContainer,
    playersBarContainer,
} from './styles';
import GameProvider from '@/lib/providers/GameProvider';
import { useParams } from 'next/navigation';
import ChatBar from '@/lib/game/chat/ChatBar';

export default function Layout({ children }: { children: React.ReactNode }) {
    const params = useParams();
    const gameId = params.gameid ? parseInt(params.gameid as string) : undefined;

    return (
        <GameProvider gameId={gameId}>
            <div className={mainContainer}>
                <div className={fancyBackground}>
                    <div className={fancyBackgroundBlur} />
                    <div className={fancyBackgroundBlur2} />
                </div>
                <div className={playersBarContainer}>
                    <UserBar />
                </div>
                <div className={gameContainer}>{children}</div>
                <div className={chatBarContainer}>
                    <ChatBar />
                </div>
            </div>
        </GameProvider>
    );
}
