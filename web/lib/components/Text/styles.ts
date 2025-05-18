import { cva } from "@/styled-system/css";

export const text = cva({
    base: {
        fontWeight: 500,
        color: 'text.0',
        fontSize: 18,
        overflow: 'hidden',
        lineClamp: 'unset',
        transition: 'color 0.2s ease-in-out, fontWeight 0.2s ease-in-out, fontSize 0.2s ease-in-out',
    },
    variants: {
        lineClamp: {
            1: { lineClamp: 1 },
            2: { lineClamp: 2 },
            5: { lineClamp: 5 },
            10: { lineClamp: 10 },
        },
        size: {
            xxs: { fontSize: 12 },
            xs: { fontSize: 14 },
            sm: { fontSize: 16 },
            md: { fontSize: 18 },
            xd: { fontSize: 20 },
            lg: { fontSize: 24 },
            xl: { fontSize: 30 },
            xxl: { fontSize: 50 },
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
            agin: {
                background: 'linear-gradient(5deg, rgb(163, 99, 240) 0%, rgb(85, 14, 143) 100%)',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent'
            }
        },

    }
});