import { css } from '@/styled-system/css';

export const songSelectorContainer = css({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 4,
    maxHeight: '60vh',
});

export const songsTiles = css({
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    overflowY: 'auto',
});

export const loadingIndicator = css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 4,
});
