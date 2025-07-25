import { token } from '@/styled-system/tokens';
import { Icon } from '@tabler/icons-react';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { inputLabel, inputStyle, inputWrapper } from './styles';

export interface InputProps
    extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
    icon?: Icon;
    large?: boolean;
    radius?: 15;
    width?: number | string;
    background?: 'transparent';
    centered?: boolean;
}

export default function Input({
    label,
    icon: Icon,
    radius,
    large,
    width,
    background,
    centered,
    ...props
}: InputProps) {
    return (
        <div style={{ width: width || '200px' }}>
            {label && <div className={inputLabel({ large })}>{label}</div>}
            <div className={inputWrapper({ radius, Icon: !!Icon, large, background })}>
                {Icon && <Icon size={large ? 24 : 16} color={token('colors.icon.0')} />}
                <input
                    {...props}
                    className={inputStyle({ Icon: !!Icon, large, background, centered })}
                />
            </div>
        </div>
    );
}
