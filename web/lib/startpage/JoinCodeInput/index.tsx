'use client';
import Input from "@/lib/components/Input";
import { inputs, joinButtonContainer, joinCodeInputContainer } from "./styles";
import GlowTile from "@/lib/components/GlowTile";
import Button from "@/lib/components/Button";
import Text from "@/lib/components/Text";
import Spacer from "@/lib/components/Spacer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { $api } from "@/lib/providers/api";


export default function JoinCodeInput() {
    const [code, setCode] = useState<string | null>();
    const router = useRouter();

    function handleJoin() {
        if (!code || code.length !== 6) {
            alert("Please enter a valid 6-digit game code.");
            return;
        };


        router.push(`/game/${code}/lobby`);

    }

    const createGameMutation = $api.useMutation('post', '/api/game');

    async function handleCreateLobby() {
        const result = await createGameMutation.mutateAsync({}).catch((error) => {
            alert(`Something went wrong: ${error.message}`);
        });

        if (result) {
            router.push(`/game/${result.id}/lobby`);
        }
    }

    return (
        <GlowTile className={joinCodeInputContainer}>
            <Input background="transparent" placeholder="Enter your username" width={'100%'} centered />
            <div className={inputs}>
                <div className={joinButtonContainer}>
                    <Input onChange={(e) => setCode(e.currentTarget.value)} placeholder="Game code" background="transparent" width={'100%'} centered type="number" maxLength={6} />
                    <Button onClick={handleJoin} label="Join" />
                </div>
                <Spacer><Text color={4} >OR</Text></Spacer>
                <Button onClick={handleCreateLobby} label="Create Lobby" width={'100%'} />
            </div>
        </GlowTile>
    )
}