import { css } from '@/styled-system/css';

export const chatBarContainer = css({
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
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

export const ChatWrapper = css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
});

export const chatBarHeader = css({
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
});

export const messagesWrapper = css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflowY: 'auto',
    flex: 1,
});
