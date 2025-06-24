import { css } from "@/styled-system/css";

export const joinCodeInputContainer = css({
    border: '1px solid',
    borderColor: 'border',
    borderRadius: "2xl",
    padding: '3rem',
    // paddingInline: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 7,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'tile.0/60',
    sm: {
        width: '500px',
    }
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