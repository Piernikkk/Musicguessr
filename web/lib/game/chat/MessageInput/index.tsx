import Input, { InputProps } from '@/lib/components/Input';
import { getHotkeyHandler } from '@mantine/hooks';
import { messageInputContainer } from './styles';
import Button from '@/lib/components/Button';
import { IconArrowUp } from '@tabler/icons-react';

interface MessageInputProps extends InputProps {
    onSend: () => void;
}

export default function MessageInput({ onSend, ...props }: MessageInputProps) {
    return (
        <div className={messageInputContainer}>
            <Input
                maxLength={200}
                {...props}
                onKeyDown={getHotkeyHandler([
                    [
                        'Enter',
                        (e) => {
                            e.preventDefault();
                            onSend();
                        },
                    ],
                ])}
            />
            <Button width={'fit-content'} icon={IconArrowUp} onClick={onSend} />
        </div>
    );
}
