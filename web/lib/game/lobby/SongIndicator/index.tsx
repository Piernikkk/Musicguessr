import Button from '@/lib/components/Button';
import { songIndicatorContainer, songIndicatorWrapper } from './styles';
import Text from '@/lib/components/Text';
import { css } from '@/styled-system/css';
import { useModals } from '@/lib/ModalsManager';

export default function SongIndicator() {
    const modals = useModals();

    return (
        <div className={songIndicatorWrapper}>
            <Text size="sm" weight={600} className={css({ paddingLeft: 1 })}>
                Current Song
            </Text>
            <div className={songIndicatorContainer}>
                <Button
                    label={'Change Song'}
                    onClick={() => {
                        modals.show('SongSelector');
                    }}
                />
            </div>
        </div>
    );
}
