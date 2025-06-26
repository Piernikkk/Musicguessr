import { css } from "@/styled-system/css";

export const transformStyle = css({
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
    zIndex: 2,
    width: '100%',
    position: 'relative',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    _hover: {
        transform: "scale(1.2)",
    }
})

export const childrenStyle = css({
    transition: "opacity 0.2s ease-in-out",
    opacity: 1,
    _groupHover: {
        opacity: 0
    }
})

export const hoverChildrenStyle = css({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.2s ease-in-out",
    opacity: 0,
    pointerEvents: "none",
    _groupHover: {
        opacity: 1,
        pointerEvents: "auto",
    }
})