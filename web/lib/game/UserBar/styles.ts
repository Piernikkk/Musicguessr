import { css } from "@/styled-system/css";

export const userBarContainer = css({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 3,
    border: "1px solid",
    borderColor: "border",
    borderRadius: 'xl',
    backgroundColor: "transparentBackground.1",
    gap: "10px",
});

export const userBarHeader = css({
    display: "flex",
    alignItems: "center",
    gap: 1,
    justifyContent: "center",
    padding: "5px",
});

export const userBarList = css({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flex: 1,
    minHeight: 0,
    gap: 2,
    overflowY: "auto",
})