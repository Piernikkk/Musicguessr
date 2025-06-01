import UserBar from "@/lib/game/UserBar";
import { chatBarContainer, fancyBackground, fancyBackgroundBlur, fancyBackgroundBlur2, gameContainer, mainContainer, playersBarContainer } from "./styles";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={mainContainer}>
            <div className={fancyBackground}>
                <div className={fancyBackgroundBlur} />
                <div className={fancyBackgroundBlur2} />
            </div>
            <div className={playersBarContainer}>
                <UserBar />
            </div>
            <div className={gameContainer}>
                {children}
            </div>
            <div className={chatBarContainer} />
        </div>
    )
}