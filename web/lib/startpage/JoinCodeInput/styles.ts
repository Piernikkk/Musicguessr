import { css } from "@/styled-system/css";

export const joinCodeInputContainer = css({
    border: '1px solid',
    borderColor: 'border',
    borderRadius: '20px',
    padding: '50px',
    // paddingInline: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '50px',
    width: '500px',
    overflow: 'hidden',
    backgroundColor: '#00000060',
});

export const joinButtonContainer = css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
});

export const inputs = css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    flexDirection: 'column',
})