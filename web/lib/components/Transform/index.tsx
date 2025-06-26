'use client';
import { useRef } from 'react';
import { transformStyle, childrenStyle, hoverChildrenStyle } from './styles';
import { cx } from '@/styled-system/css';

interface TransformProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverChildren?: React.ReactNode;
}

export default function Transform({
    children,
    hoverChildren,
    className,
    ...props
}: TransformProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div {...props} ref={ref} className={cx(transformStyle, 'group', className)}>
            <div className={childrenStyle}>{children}</div>
            {hoverChildren && <div className={hoverChildrenStyle}>{hoverChildren}</div>}
        </div>
    );
}
