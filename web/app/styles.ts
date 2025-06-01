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
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    borderRadius: '2px',
    filter: 'blur(180px) opacity(0.6)',
    '@supports (-moz-appearance: none)': {
        filter: 'blur(300px) opacity(0.4)',
    }
});

export const fancyBackgroundBlur = css({
    clipPath: 'polygon(0 0, 100% 0, 0 100%)',
    background: 'linear-gradient(90deg, rgba(85, 159, 189, 1) 0%, rgba(87, 199, 133, 1) 35%, rgba(237, 221, 83, 1) 77%, rgba(230, 150, 53, 1) 100%)',
    width: '100%',
    height: '100%',
    color: 'transparent',
    backgroundColor: 'transparent',
});

export const fancyBackgroundBlur2 = css({
    backgroundColor: 'transparent',
    position: 'absolute',
    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
    color: 'transparent',
    background: 'linear-gradient(90deg, rgb(23, 255, 15) 0%, rgb(255, 187, 0) 35%, rgb(255, 0, 0) 77%, rgb(255, 0, 128) 100%)',
    width: '70%',
    height: '70%',
    bottom: '0',
    right: '0',

});