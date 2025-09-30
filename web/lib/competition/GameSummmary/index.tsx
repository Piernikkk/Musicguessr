import { gameAtom } from '@/lib/atoms/game';
import Button from '@/lib/components/Button';
import Text from '@/lib/components/Text';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export default function GameSummary() {
    const router = useRouter();

    const game = useAtomValue(gameAtom);

    const points: Map<string, number> = useMemo(() => {
        const pointsMap: Map<string, number> = new Map();

        game?.users?.forEach((user) => {
            const score = user.score
                ? Object.values(user.score).reduce(
                      (total, [first, second]) => total + (first ? 2 : 0) + (second ? 1 : 0),
                      0
                  )
                : 0;
            pointsMap.set(user.name, score);
        });

        console.log('Points map:', pointsMap);

        return pointsMap;
    }, [game?.users]);

    return (
        <>
            <Text size="md" textAlign="center">
                Summary
            </Text>
            {Array.from(points.entries()).map(([name, score]) => (
                <div key={name} style={{ display: 'flex', gap: 10 }}>
                    <Text>{name}:</Text>
                    <Text weight={400}>
                        {score} point{score !== 1 ? 's' : ''}
                    </Text>
                </div>
            ))}
            <Button
                label="Return to Lobby"
                contrast
                onClick={async () => {
                    router.push(`/game/${game?.id}/lobby`);
                }}
            />
        </>
    );
}
