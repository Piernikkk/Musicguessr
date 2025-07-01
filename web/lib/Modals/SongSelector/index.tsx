import ModalBase from '@/lib/components/ModalBase';
import { ModalProps } from '@/lib/ModalsManager';
import { loadingIndicator, songSelectorContainer, songsTiles } from './styles';
import { IconSearch, IconVinyl } from '@tabler/icons-react';
import Input from '@/lib/components/Input';
import { useEffect, useRef, useState } from 'react';
import SongTile from '@/lib/game/SongTIle';
import { TSong } from '@/types/song';
import { useAudio } from '@/lib/hooks/useAudio';
import { useSetAtom } from 'jotai';
import { songAtom } from '@/lib/atoms/song';
import { $itunes } from '@/lib/providers/itunes';
import Text from '@/lib/components/Text';

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

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (itunes.isPending) {
            setLoading(true);
        } else if (itunes.isPending == false) {
            setLoading(false);
        }
    }, [itunes.isPending]);

    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        (async () => {
            async function search(term: string) {
                const res = await itunes
                    .mutateAsync({
                        params: {
                            query: {
                                term,
                                media: 'music',
                                entity: 'song',
                                limit: 40,
                            },
                        },
                    })
                    .catch((e) => {
                        console.error(e);
                        setLoading(false);
                    });

                if (res) {
                    audio.pause();
                    setResults(res.results);
                    setLoading(false);
                }
            }
            if (serchValue.length > 0) {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                    setTimeoutId(null);
                }
                const id = setTimeout(async () => {
                    await search(serchValue);
                }, 1000);
                setTimeoutId(id);
                setLoading(true);

                return () => {
                    if (timeoutId) clearTimeout(timeoutId);
                };
            }
        })();
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
                    {loading && results.length == 0 ? (
                        <div className={loadingIndicator}>
                            <Text color={2}>Loading</Text>
                        </div>
                    ) : results.length > 0 ? (
                        results.map((song) => (
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
                        ))
                    ) : (
                        <div className={loadingIndicator}>
                            <Text color={2}>No results</Text>
                        </div>
                    )}
                </div>
            </div>
        </ModalBase>
    );
}
