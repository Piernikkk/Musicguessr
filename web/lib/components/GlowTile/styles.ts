import { css } from "@/styled-system/css";

export const glowTileContainer = css({
    transition: 'all 0.3s ease-in-out',
    position: 'relative',
    md: {
        '&:hover': {
            transformOrigin: 'center',
            transform: 'scale(1.05)',
        }
    }

});

export const blur = css({
    width: '250px',
    height: '250px',
    backgroundColor: '#ffffff20',
    position: 'absolute',
    filter: 'blur(50px) brightness(.2)',
    transition: 'opacity 1s ease',
    zIndex: -1,
    _dark: {
        backgroundColor: '#ffffff70'
    }
});