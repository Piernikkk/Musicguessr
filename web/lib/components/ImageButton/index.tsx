import { Icon } from '@tabler/icons-react';
import Image, { ImageProps } from 'next/image';
import { imageButtonContainer, imageHover } from './styles';

interface ImageButtonProps extends ImageProps {
    icon?: Icon;
}

export default function ImageButton({ icon: Icon, ...props }: ImageButtonProps) {
    return (
        <div className={imageButtonContainer}>
            <div className={imageHover}>{Icon && <Icon />}</div>
            <Image {...props} />
        </div>
    );
}
