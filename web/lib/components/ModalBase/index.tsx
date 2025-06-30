import { ReactNode } from 'react';
import { modalBackground, modalContainer, modalHeader, modalTitle } from './styles';
import { Icon, IconX } from '@tabler/icons-react';
import { css } from '@/styled-system/css';
import Text from '../Text';

export type ModalBaseProps = {
    opened: boolean;
    onClose: () => void;
    children?: ReactNode;
    title?: string;
    icon?: Icon;
    zIndex?: 100 | 101 | 102;
    width?: 500 | 600 | 700 | 800 | '90%' | 'undefined';
    staticHeader?: boolean;
    color?: string;
    description?: string;
};

export default function ModalBase({
    opened,
    onClose,
    children,
    zIndex,
    width,
    icon: Icon,
    title,
    description,
    staticHeader,
}: ModalBaseProps) {
    return (
        <>
            <div className={modalBackground({ opened, zIndex })} onClick={onClose}>
                <div
                    className={modalContainer({ opened, width })}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={modalHeader({ staticHeader })}>
                        <div className={modalTitle}>
                            {Icon && <Icon size={30} />}
                            <Text size={'lg'}>{title}</Text>
                            <Text size={'sm'} weight={400} color={2}>
                                {description}
                            </Text>
                        </div>
                        {/* TODO:change to button */}
                        <IconX
                            size={30}
                            onClick={onClose}
                            className={css({ cursor: 'pointer', zIndex: 100 })}
                        />
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
}
