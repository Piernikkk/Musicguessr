import { cva } from '@/styled-system/css';

export const text = cva({
    base: {
        fontWeight: 500,
        color: 'text.0',
        fontSize: { base: 14, sm: 16, lg: 18 },
        overflow: 'hidden',
        lineClamp: 'unset',
        transition:
            'color 0.2s ease-in-out, fontWeight 0.2s ease-in-out, fontSize 0.2s ease-in-out',
    },
    variants: {
        lineClamp: {
            1: { lineClamp: 1, wordBreak: 'break-all' },
            2: { lineClamp: 2 },
            5: { lineClamp: 5 },
            10: { lineClamp: 10 },
        },
        size: {
            xxs: {
                fontSize: { base: 10, sm: 12 },
            },
            xs: {
                fontSize: { base: 12, sm: 14 },
            },
            sm: {
                fontSize: { base: 14, sm: 16, md: 18, lg: 20 },
            },
            md: {
                fontSize: { base: 16, sm: 18, md: 20, lg: 22 },
            },
            xd: {
                fontSize: { base: 18, sm: 20, md: 24, lg: 26 },
            },
            lg: {
                fontSize: { base: 20, sm: 24, md: 26, lg: 28 },
            },
            xl: {
                fontSize: { base: 24, sm: 30, md: 32 },
            },
            xxl: {
                fontSize: { base: 36, sm: 50, md: 56 },
            },
            xxxl: {
                fontSize: { base: 48, sm: 70, md: 80 },
            },
            '4xl': {
                fontSize: { base: 45, sm: 60, md: 75, lg: 90 },
            },
        },
        weight: {
            100: { fontWeight: 100 },
            200: { fontWeight: 200 },
            300: { fontWeight: 300 },
            400: { fontWeight: 400 },
            500: { fontWeight: 500 },
            600: { fontWeight: 600 },
            700: { fontWeight: 700 },
            800: { fontWeight: 800 },
            900: { fontWeight: 900 },
        },
        color: {
            1: { color: 'text.0' },
            2: { color: 'text.1' },
            3: { color: 'text.2' },
            4: { color: 'text.3' },
            5: { color: 'text.4' },
        },
    },
});
