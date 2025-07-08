import { TSong } from '@/types/song';
import ConfirmModal from '../Modals/Confirm';
import { SongSelectorModal } from '../Modals/SongSelector';
import { ModalComponentBindings, ModalDefinition } from './types';

export type Modals = {
    SongSelector: ModalDefinition<{
        payload: undefined;
        returnValue: TSong | undefined;
    }>;
    Confirm: ModalDefinition<{
        payload: {
            title: string;
            description?: string;
            confirmText?: string;
            cancelText?: string;
        };
        returnValue: boolean;
    }>;
};

export const ModalsBinding: ModalComponentBindings = {
    SongSelector: SongSelectorModal,
    Confirm: ConfirmModal,
};
