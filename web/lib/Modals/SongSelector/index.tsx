import ModalBase from '@/lib/components/ModalBase';
import { ModalProps } from '@/lib/ModalsManager';
import { songSelectorContainer, songsTiles } from './styles';
import { IconSearch, IconVinyl } from '@tabler/icons-react';
import Input from '@/lib/components/Input';
import { useEffect, useRef, useState } from 'react';
import SongTile from '@/lib/game/SongTIle';
import { TSong } from '@/types/song';
import { useAudio } from '@/lib/hooks/useAudio';
import { useSetAtom } from 'jotai';
import { songAtom } from '@/lib/atoms/song';
import { $itunes } from '@/lib/providers/itunes';

export function SongSelectorModal({
    onClose,
    ...props
}: React.ComponentProps<typeof ModalBase> & ModalProps<'SongSelector'>) {
    const ref = useRef<HTMLInputElement>(null);

    const setCurrentSong = useSetAtom(songAtom);

    const audio = useAudio();

    useEffect(() => {
        ref.current?.focus();
    }, []);

    const [results, setResults] = useState<TSong[]>([]);

    const [serchValue, setSearchValue] = useState('');

    const itunes = $itunes.useMutation('get', '/search');

    async function search(term: string) {
        const res = await itunes
            .mutateAsync({
                params: {
                    query: {
                        term,
                        media: 'music',
                        entity: 'song',
                    },
                },
            })
            .catch((e) => console.error(e));

        if (res) {
            setResults(res.results);
        }
    }

    useEffect(() => {
        if (serchValue.length > 0) {
            search(serchValue);
        }
    }, [serchValue]);

    return (
        <ModalBase
            {...props}
            title="Song Selector"
            icon={IconVinyl}
            description="Click on the song image to play"
            staticHeader
            onClose={() => {
                onClose();
                audio.pause();
            }}
        >
            <div className={songSelectorContainer}>
                <Input
                    ref={ref}
                    placeholder="Search a song"
                    width={'100%'}
                    icon={IconSearch}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <div className={songsTiles}>
                    {results.map((song) => (
                        <SongTile
                            key={song.trackId}
                            song={song as TSong}
                            size="sm"
                            onClick={(e, song) => {
                                setCurrentSong(song);
                                audio.pause();
                                onClose();
                            }}
                        />
                    ))}
                </div>
            </div>
        </ModalBase>
    );
}
