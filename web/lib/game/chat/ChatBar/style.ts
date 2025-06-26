import { css } from '@/styled-system/css';

export const chatBarContainer = css({
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    width: '100%',
    height: '100%',
    padding: '15px',
    border: '1px solid',
    borderColor: 'border',
    borderRadius: '15px',
    backgroundColor: 'transparentBackground.1',
    flex: 1,
    minHeight: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const messagesWrapper = css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
})
