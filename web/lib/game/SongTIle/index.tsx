import { TSong } from '@/types/song';
import { rightSection, songDescription, songDetailsContainer, songTileContainer } from './styles';
import Text from '@/lib/components/Text';
import SongPlayer from '../lobby/SongPlayer';

interface SongTileProps {
    size: 'sm' | 'lg';
    song: TSong;
}

export default function SongTile({ song }: SongTileProps) {
    return (
        <div className={songTileContainer}>
            <div className={songDetailsContainer}>
                <SongPlayer artwork={song.artworkUrl60} preview={song.previewUrl} />
                <div className={songDescription}>
                    <Text size="sm" weight={600}>
                        {song.trackName}
                    </Text>
                    <Text size="xs" weight={400} color={2}>
                        {song.artistName} • {new Date(song.releaseDate).getFullYear()}
                    </Text>
                </div>
            </div>
            <div className={`${rightSection} rightSection`}>
                <Text size="sm" color={4} weight={400}>
                    Click to select
                </Text>
            </div>
        </div>
    );
}
