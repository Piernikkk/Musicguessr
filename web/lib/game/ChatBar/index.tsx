import { chatBarContainer } from './style';
import Input from '@/lib/components/Input';

export default function ChatBar() {
    return (
        <div className={chatBarContainer}>
            <div></div>
            <Input background="transparent" width={'100%'} placeholder="Type your message here" />
        </div>
    );
}
