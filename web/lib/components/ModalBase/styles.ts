import { css, cva } from '@/styled-system/css';

export const modalBackground = cva({
    base: {
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        opacity: 0,
        zIndex: 100,
        backgroundColor: '#0000008a',
        transition: 'all 0.2s ease-in-out',
    },
    variants: {
        opened: { true: { opacity: 1 } },
        zIndex: {
            100: { zIndex: 100 },
            101: { zIndex: 101 },
            102: { zIndex: 102 },
        },
    },
});

export const modalContainer = cva({
    base: {
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'tile.1',
        zIndex: 101,
        border: '1px solid',
        borderRadius: '20px',
        borderColor: 'border',
        maxHeight: '90%',
        overflowY: 'auto',
        width: 'auto',
        display: 'flex',
        flexDirection: 'column',
        transform: 'scale(0.9)',
        opacity: 0,
        transition: 'all 0.2s ease-in-out',
        md: {
            width: '800px',
        },
    },
    variants: {
        opened: { true: { opacity: 1, transform: 'scale(1)' } },
        width: {
            500: { md: { width: '500px' } },
            600: { width: '600px' },
            700: { width: '700px' },
            800: { width: '800px' },
            '90%': { width: '90%' },
            undefined: { width: 'unset', maxWidth: '55%' },
        },
    },
});

export const modalHeader = cva({
    base: {
        padding: '20px 30px 0px 30px',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        gap: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    variants: {
        staticHeader: {
            true: {
                position: 'static',
            },
        },
    },
});

export const modalTitle = css({
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
});

export const modalImageBackground = css({
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // zIndex: 0,
    width: '100%',
    // height: '100%',
    objectFit: 'cover',
    // flex: 1,
    // opacity: 0.4,
    // filter: 'blur(30px)',
});

export const modalTitleBackground = css({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '200px',
});
