import { css } from '@/styled-system/css';

export const timerContainer = css({
    position: 'relative',
    width: '100%',
    height: 5,
    backgroundColor: 'tile.0',
    border: '1px solid',
    borderColor: 'border',
    borderRadius: 'xl',
    overflow: 'hidden',
});

export const timerProgress = css({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: 'contrast.0',
    transition: 'width 1s linear',
});
