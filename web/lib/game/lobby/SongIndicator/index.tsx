import Button from '@/lib/components/Button';
import {
    noSong,
    songDescription,
    songDetailsContainer,
    songIndicatorContainer,
    songIndicatorWrapper,
} from './styles';
import Text from '@/lib/components/Text';
import { css } from '@/styled-system/css';
import { useModals } from '@/lib/ModalsManager';
import SongPlayer from '../SongPlayer';
import { useAtomValue } from 'jotai';
import { songAtom } from '@/lib/atoms/song';

export default function SongIndicator() {
    const modals = useModals();

    const song = useAtomValue(songAtom);

    return (
        <div className={songIndicatorWrapper}>
            <Text size="sm" weight={600} className={css({ paddingLeft: 1 })}>
                Selected song
            </Text>
            <div className={songIndicatorContainer}>
                {song ? (
                    <div className={songDetailsContainer}>
                        <SongPlayer artwork={song.artworkUrl60} preview={song.previewUrl} />
                        <div className={songDescription}>
                            <Text size="sm" weight={600} lineClamp={1}>
                                {song.trackName}
                            </Text>
                            <Text size="xs" weight={400} color={2} lineClamp={1}>
                                {song.artistName} • {new Date(song.releaseDate).getFullYear()}
                            </Text>
                        </div>
                    </div>
                ) : (
                    <div className={noSong}>
                        <Text size="sm" weight={400} color={2}>
                            No song selected
                        </Text>
                    </div>
                )}
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
