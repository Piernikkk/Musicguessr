import { css } from '@/styled-system/css';

export const revealPartContainer = css({
    display: 'flex',
    alignItems: 'start',
    flexDirection: { base: 'column', xl: 'row' },
    justifyContent: 'center',
    width: '100%',
    height: 'fit-content',
});

export const revealPartImage = css({
    width: { base: '100%', xl: '40%' },
    height: 'auto',
});

export const reveaSongDescription = css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 1,
    justifyContent: 'center',
    alignItems: 'center',
});
