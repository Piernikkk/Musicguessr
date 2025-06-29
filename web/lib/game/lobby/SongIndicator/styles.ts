import { css } from "@/styled-system/css";

export const songIndicatorContainer = css({
    display: 'flex',
    border: '1px solid',
    borderColor: 'border',
    borderRadius: 'xl',
    padding: 4,
    width: '100%',
    alignItems: 'center',
});

export const songIndicatorWrapper = css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 1,
    alignItems: 'start',
});