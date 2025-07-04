import { TSong } from '@/types/song';
import { atom } from 'jotai';

export const songSelectorAtom = atom<TSongSelectorAtom>();

export interface TSongSelectorAtom {
    results: TSong[];
    searchValue: string;
}
