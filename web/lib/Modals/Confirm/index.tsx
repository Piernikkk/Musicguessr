import ModalBase from '@/lib/components/ModalBase';
import { ModalProps, useModals } from '@/lib/ModalsManager';
import { IconQuestionMark } from '@tabler/icons-react';
import Button from '@/lib/components/Button';
import { confirmModalButtons, confirmModalContainer } from './styles';
import Text from '@/lib/components/Text';

export default function ConfirmModal({
    payload,
    ...props
}: React.ComponentProps<typeof ModalBase> & ModalProps<'Confirm'>) {
    const modals = useModals();

    return (
        <ModalBase
            {...props}
            onClose={() => modals.hide('Confirm', false)}
            title={payload?.title || 'Confirm'}
            icon={IconQuestionMark}
            staticHeader
            width={500}
        >
            <div className={confirmModalContainer}>
                <Text>{payload?.description}</Text>
                <div className={confirmModalButtons}>
                    <Button
                        contrast
                        label={payload?.confirmText || 'Confirm'}
                        onClick={() => modals.hide('Confirm', true)}
                    />
                    <Button
                        label={payload?.cancelText || 'Cancel'}
                        onClick={() => modals.hide('Confirm', false)}
                    />
                </div>
            </div>
        </ModalBase>
    );
}
