import { css } from "@/styled-system/css";

export const mainContainer = css({
    display: "flex",
    width: "100vw",
    height: "100vh",
    padding: '2%',
    gap: '20px',
    flexDirection: "row",
});

export const playersBarContainer = css({
    display: "flex",
    border: '1px solid',
    borderColor: 'border',
    height: '100%',
    width: '20vw',
    minWidth: '150px',
    maxWidth: '300px',
});
export const chatBarContainer = css({
    display: "flex",
    border: '1px solid',
    borderColor: 'border',
    height: '100%',
    width: '25vw',
    minWidth: '300px',
});
export const gameContainer = css({
    display: "flex",
    border: '1px solid',
    borderColor: 'border',
    height: '100%',
    flex: 1,
});
