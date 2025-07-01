import { TSong } from '@/types/song';
import { rightSection, songDescription, songDetailsContainer, songTileContainer } from './styles';
import Text from '@/lib/components/Text';
import SongPlayer from '../lobby/SongPlayer';
import { MouseEvent } from 'react';

interface SongTileProps {
    size: 'sm' | 'lg';
    song: TSong;
    onClick?: (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, song: TSong) => void;
}

export default function SongTile({ song, onClick }: SongTileProps) {
    return (
        <div className={songTileContainer} onClick={(e) => onClick?.(e, song)}>
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
