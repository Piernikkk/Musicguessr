import { cx } from '@/styled-system/css';
import { text } from './styles';

type TextVariants = Exclude<Parameters<typeof text>[0], undefined>;

export interface TextProps extends TextVariants {
    children: React.ReactNode;
    className?: string;
}

export default function Text({
    size = 'sm',
    weight,
    color,
    lineClamp,
    children,
    className,
    textAlign,
}: TextProps) {
    return (
        <div className={cx(text({ size, weight, color, lineClamp, textAlign }), className)}>
            {children}
        </div>
    );
}
