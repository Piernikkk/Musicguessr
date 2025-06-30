import ModalBase from '@/lib/components/ModalBase';
import { ModalProps } from '@/lib/ModalsManager';
import { songSelectorContainer, songsTiles } from './styles';
import { IconSearch, IconVinyl } from '@tabler/icons-react';
import Input from '@/lib/components/Input';
import { useEffect, useRef } from 'react';
import { results } from './tmp';
import SongTile from '@/lib/game/SongTIle';
import { TSong } from '@/types/song';

export function SongSelectorModal({
    ...props
}: React.ComponentProps<typeof ModalBase> & ModalProps<'SongSelector'>) {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        ref.current?.focus();
    }, []);

    return (
        <ModalBase
            {...props}
            title="Song Selector"
            icon={IconVinyl}
            description="Click on the song image to play"
            staticHeader
        >
            <div className={songSelectorContainer}>
                <Input ref={ref} placeholder="Search a song" width={'100%'} icon={IconSearch} />
                <div className={songsTiles}>
                    {results.results.map((song) => (
                        <SongTile key={song.trackId} song={song as TSong} size="sm" />
                    ))}
                </div>
            </div>
        </ModalBase>
    );
}
