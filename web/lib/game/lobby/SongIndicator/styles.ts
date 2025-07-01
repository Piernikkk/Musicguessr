import { css } from '@/styled-system/css';

export const songIndicatorContainer = css({
    display: 'flex',
    border: '1px solid',
    borderColor: 'border',
    borderRadius: 'xl',
    padding: 4,
    width: '100%',
    alignItems: 'center',
});

export const songIndicatorWrapper = css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 1,
    alignItems: 'start',
});
export const songDetailsContainer = css({
    display: 'flex',
    padding: 2,
    borderRadius: 'xl',
    gap: 4,
    flex: 1,
    alignItems: 'center',
});

export const songDescription = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
});

export const noSong = css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
});
