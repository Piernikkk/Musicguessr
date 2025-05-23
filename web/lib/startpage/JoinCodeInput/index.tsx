import Input from "@/lib/components/Input";
import { joinCodeInputContainer } from "./styles";

export default function JoinCodeInput() {
    return (
        <div className={joinCodeInputContainer}>
            <Input label="Username" placeholder="Enter your desired username" width={'100%'} />
            <Input label="Join code" placeholder="Enter your game code here" />
        </div>
    )
}