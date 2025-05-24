import Input from "@/lib/components/Input";
import { inputs, joinButtonContainer, joinCodeInputContainer } from "./styles";
import GlowTile from "@/lib/components/GlowTile";
import Button from "@/lib/components/Button";
import Text from "@/lib/components/Text";
import Spacer from "@/lib/components/Spacer";

export default function JoinCodeInput() {
    return (
        <GlowTile className={joinCodeInputContainer}>
            <Input background="transparent" placeholder="Enter your username" width={'100%'} centered />
            <div className={inputs}>
                <div className={joinButtonContainer}>
                    <Input placeholder="Game code" background="transparent" width={'100%'} centered type="number" maxLength={6} />
                    <Button label="Join" />
                </div>
                <Spacer><Text color={4} >OR</Text></Spacer>
                <Button label="Create Lobby" width={'100%'} />
            </div>
        </GlowTile>
    )
}