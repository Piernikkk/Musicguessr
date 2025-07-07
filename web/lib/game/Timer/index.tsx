import { timerContainer, timerProgress } from './styles';

interface TimerProps {
    duration: number;
    time: number;
}

export default function Timer({ duration, time }: TimerProps) {
    return (
        <div className={timerContainer}>
            <div
                className={timerProgress}
                style={{ width: `${Math.floor((time / duration) * 100)}%` }}
            />
        </div>
    );
}
