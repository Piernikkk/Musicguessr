import { css } from "@/styled-system/css";

export const homepageStyles = css({
    display: 'flex',
    zIndex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    gap: '50px',
    position: 'relative',
});

export const fancyBackground = css({
    position: 'absolute',
    // color: 'transparent',
    zIndex: -1,
    top: '5%',
    bottom: '5%',
    left: '5%',
    right: '5%',
    borderRadius: '2px',
    filter: 'blur(300px) opacity(0.7)',
    '@supports (-moz-appearance: none)': {
        filter: 'blur(4000px) opacity(0.4)',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
    }
});

export const fancyBackgroundBlur = css({
    clipPath: 'polygon(0 0, 100% 0, 0 100%)',
    background: 'linear-gradient(90deg, rgba(85, 159, 189, 1) 0%, rgba(87, 199, 133, 1) 35%, rgba(237, 221, 83, 1) 77%, rgba(230, 150, 53, 1) 100%)',
    width: '100%',
    height: '100%',

})