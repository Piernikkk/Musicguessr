import { css } from "@/styled-system/css";

export const userBarContainer = css({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: "15px",
    border: "1px solid",
    borderColor: "border",
    borderRadius: "15px",
    backgroundColor: "transparentBackground.1",
    gap: "10px",
});

export const userBarHeader = css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
});