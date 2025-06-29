import { TSong } from '../atoms/song';
import { SongSelectorModal } from '../Modals/SongSelector';
import { ModalComponentBindings, ModalDefinition } from './types';

export type Modals = {
    // Settings: ModalDefinition<{
    //     payload: {
    //         initialTab?: SettingsTabName;
    //     };
    //     returnValue: undefined;
    // }>;
    SongSelector: ModalDefinition<{
        payload: undefined;
        returnValue: TSong | undefined;
    }>;
};

export const ModalsBinding: ModalComponentBindings = {
    SongSelector: SongSelectorModal,
};
