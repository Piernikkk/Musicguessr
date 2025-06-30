import { css } from '@/styled-system/css';

export const songDetailsContainer = css({
    display: 'flex',
    padding: 2,
    borderRadius: 'xl',
    gap: 4,
    flex: 1,
    cursor: 'pointer',
});

export const songDescription = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
});

export const songTileContainer = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    '&:hover .rightSection': {
        opacity: 1,
    },
});

export const rightSection = css({
    opacity: 0,
    transition: 'opacity 0.1s ease-in-out',
    paddingInline: 5,
});
