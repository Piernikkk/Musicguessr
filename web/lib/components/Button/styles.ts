import { cva } from "@/styled-system/css";

export const buttonContainer = cva({
    base: {
        cursor: 'pointer',
        display: 'flex',
        color: 'text.0',
        alignItems: 'center',
        gap: '10px',
        transition: 'background-color 0.2s ease, border 0.2s ease',
        borderRadius: '10px',
        padding: '11px 16px',
        justifyContent: 'center',
        borderColor: 'border',
        borderWidth: '1px',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'contrast.0',
        },
        '&:active': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderColor: 'contrast.1',
        },
        userSelect: 'none',
    },
    variants: {
        contrast: {
            true: {
                backgroundColor: 'contrast.0',
                borderWidth: '0px',
                '&:hover': {
                    backgroundColor: 'contrast.1',
                },
            }
        },
        large: {
            true: {
                flex: 1,
            }
        }
    }
})