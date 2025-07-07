import Text from '@/lib/components/Text';
import Timer from '@/lib/game/Timer';
import { gameTextSection } from './styles';
import HintText from '@/lib/game/HintText';

interface GuessingPartProps {
    songDuration: number;
    songTime: number;
    songTitleLength: boolean[];
    songArtistLength: boolean[];
}

export default function GuessingPart({
    songDuration,
    songTime,
    songTitleLength,
    songArtistLength,
}: GuessingPartProps) {
    return (
        <>
            <div className={gameTextSection}>
                <Text size="md" weight={600}>
                    Time Left:
                </Text>
                <Timer duration={songDuration} time={songTime} />
            </div>
            <div className={gameTextSection}>
                <Text weight={600}>Title:</Text>
                <HintText length={songTitleLength} />
            </div>
            <div className={gameTextSection}>
                <Text weight={600}>Artist:</Text>
                <HintText length={songArtistLength} />
            </div>
        </>
    );
}
