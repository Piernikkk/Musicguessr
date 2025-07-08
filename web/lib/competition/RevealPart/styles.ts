import { css } from '@/styled-system/css';

export const revealPartContainer = css({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    gap: { base: '1rem', md: '2rem', xl: '3rem' },
    height: 'fit-content',
});

export const revealPartImage = css({
    minWidth: { base: '100%', xl: '35%' },
    height: 'auto',
});

export const reveaSongDescription = css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
});

export const revealSongWrapper = css({
    display: 'flex',
    flexDirection: { base: 'column', xl: 'row' },
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
});
