import { css, cva } from '@/styled-system/css';

export const imageButtonContainer = css({
    position: 'relative',
    textDecoration: 'none',
});

export const imageHover = cva({
    base: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'tile.1/70',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0,
        transition: 'opacity 0.1s ease-in-out',
        _hover: {
            opacity: 1,
        },
    },
    variants: {
        visible: {
            true: {
                opacity: 1,
            },
        },
    },
});
