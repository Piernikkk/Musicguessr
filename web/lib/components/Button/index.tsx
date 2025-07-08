'use client';
import { Icon } from '@tabler/icons-react';
import React, { HTMLAttributes } from 'react';
import { buttonContainer } from './styles';
import Text from '../Text';

export interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
    icon?: Icon;
    size?: number;
    large?: boolean;
    color?: string;
    contrast?: boolean;
    label?: string;
    weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    width?: number | string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function Button({
    icon: Icon,
    size = 25,
    color = '#fff',
    contrast,
    label,
    weight,
    large,
    width,
    disabled,
    onClick,
    ...props
}: ButtonProps) {
    return (
        <div
            {...props}
            onClick={(e) => (disabled ? undefined : onClick?.(e))}
            className={buttonContainer({ contrast, large, disabled })}
            style={{ width: width || '200px' }}
        >
            {Icon && <Icon size={size} color={color} />}
            {label && (
                <Text weight={weight} size="md" color={contrast ? 5 : undefined}>
                    {label}
                </Text>
            )}
        </div>
    );
}
