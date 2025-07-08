import { css } from '@/styled-system/css';

export const confirmModalButtons = css({
    display: 'flex',
    justifyContent: 'space-between',
    gap: 4,
    width: '100%',
});

export const confirmModalContainer = css({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 8,
    paddingInline: 8,
    maxHeight: '60vh',
});
