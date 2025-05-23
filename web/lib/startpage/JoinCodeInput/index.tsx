import Input from "@/lib/components/Input";
import { inputs, joinButtonContainer, joinCodeInputContainer } from "./styles";
import GlowTile from "@/lib/components/GlowTile";
import Button from "@/lib/components/Button";
import Text from "@/lib/components/Text";

export default function JoinCodeInput() {
    return (
        <GlowTile className={joinCodeInputContainer}>
            <Input background="transparent" placeholder="Enter your username" width={'100%'} />
            <div className={inputs}>
                <div className={joinButtonContainer}>
                    <Input placeholder="Game code" background="transparent" width={'100%'} />
                    <Button label="Join" />
                </div>
                <Text>OR</Text>
                <Button label="Create Lobby" width={'100%'} />
            </div>
        </GlowTile>
    )
}