import Text from '@/lib/components/Text';
import { textSeparator } from './styles';

interface HintTextProps {
    length: boolean[];
    text?: string;
}

export default function HintText({ length }: HintTextProps) {
    return (
        <div>
            <Text size="lg" weight={500} textAlign="center">
                {length.map((l, i) => (l ? '_' : <span className={textSeparator} key={i} />))}
            </Text>
        </div>
    );
}
