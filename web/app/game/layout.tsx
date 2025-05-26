import { chatBarContainer, gameContainer, mainContainer, playersBarContainer } from "./styles";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={mainContainer}>
            <div className={playersBarContainer} />
            <div className={gameContainer}>
                {children}
            </div>
            <div className={chatBarContainer} />
        </div>
    )
}