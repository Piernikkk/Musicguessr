import { css } from '@/styled-system/css';

export const lobbyContainer = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 3,
    border: '1px solid',
    borderColor: 'border',
    borderRadius: 'xl',
    backgroundColor: 'transparentBackground.1',
    gap: '10px',
});

export const gameControlsContainer = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
    gap: '10px',
});
