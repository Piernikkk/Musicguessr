import { css } from '@/styled-system/css';

export const songDetailsContainer = css({
    display: 'flex',
    padding: 2,
    paddingRight: 0,
    borderRadius: 'xl',
    gap: 4,
    flex: 1,
    cursor: 'pointer',
});

export const songDescription = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
});

export const songTileContainer = css({
    display: 'flex',
    justifyContent: 'space-between',
    gap: 3,
    alignItems: 'center',
    width: '100%',
    '&:hover .rightSection': {
        opacity: 1,
        display: 'block',
    },
});

export const rightSection = css({
    opacity: 0,
    display: 'none',
    width: 'fit-content',
    transition: 'all 1s ease-in-out',
    paddingRight: 5,
});
