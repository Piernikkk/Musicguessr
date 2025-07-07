import { css } from '@/styled-system/css';

export const gameContainer = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 5,
    border: '1px solid',
    borderColor: 'border',
    borderRadius: 'xl',
    backgroundColor: 'transparentBackground.1',
    gap: 10,
});

export const gameTextSection = css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 1,
    justifyContent: 'center',
    alignItems: 'center',
});
