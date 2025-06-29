import ModalBase from '@/lib/components/ModalBase';
import Text from '@/lib/components/Text';
import { ModalProps } from '@/lib/ModalsManager';

export function SongSelectorModal({
    ...props
}: React.ComponentProps<typeof ModalBase> & ModalProps<'SongSelector'>) {
    return (
        <ModalBase {...props}>
            <Text size="lg" weight={600}>
                Select a song
            </Text>
        </ModalBase>
    );
}
