import Text from '@/lib/components/Text';

interface HintTextProps {
    length: boolean[];
    text?: string;
}

export default function HintText({ length }: HintTextProps) {
    return (
        <div>
            <Text size="lg" weight={500}>
                {length.map((l) => (l ? '_' : ' ')).join('')}
            </Text>
        </div>
    );
}
