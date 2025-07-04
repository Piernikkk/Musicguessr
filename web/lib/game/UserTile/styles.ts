import { css } from '@/styled-system/css';

export const userTileContainer = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '10px',
    border: '1px solid',
    borderColor: 'border',
    borderRadius: '12px',
    backgroundColor: '#ffffff05',
});

export const userTileText = css({
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});
