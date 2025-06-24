import { divider, spacerContainer } from "./styles";

interface SpacerProps {
    children?: React.ReactNode;
}

export default function Spacer({ children }: SpacerProps) {
    return (
        <div className={spacerContainer}>
            <div className={divider} />
            {children && <>
                {children}
                < div className={divider} />
            </>}
        </div>
    )
}