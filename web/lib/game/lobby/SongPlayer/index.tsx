import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';
import Image from 'next/image';
import { imageButtonContainer, imageHover } from './styles';
import { useAudio } from '@/lib/hooks/useAudio';
import { useMemo } from 'react';

interface SongPlayerProps {
    artwork: string;
    preview: string;
}

export default function SongPlayer({ artwork, preview }: SongPlayerProps) {
    const audio = useAudio();

    const visible = useMemo(() => {
        return audio.nowPlaying?.nowPlaying === preview && audio.nowPlaying?.isPlaying;
    }, [audio.nowPlaying, preview]);

    return (
        <div
            className={imageButtonContainer}
            onClick={() => {
                audio.switch(preview);
            }}
        >
            <div className={imageHover({ visible })}>
                {visible ? <IconPlayerPause /> : <IconPlayerPlay />}
            </div>
            <Image src={artwork} alt={'artwork'} width={60} height={60} />
        </div>
    );
}
