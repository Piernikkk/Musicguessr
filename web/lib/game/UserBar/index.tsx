'use client';
import React from "react";
import Text from "@/lib/components/Text";
import { userBarContainer, userBarHeader, userBarList } from "./styles";
import Spacer from "@/lib/components/Spacer";
import { css } from "@/styled-system/css";
import { IconMusicQuestion } from "@tabler/icons-react";
import Link from "next/link";
import CodeTile from "../CodeTile";
import { useParams } from "next/navigation";
import { useAtomValue } from "jotai";
import { gameAtom } from "@/lib/atoms/game";
import UserTile from "../UserTile";
import { useSocket } from "@/lib/hooks/useSocket";

export default function UserBar() {
    const params = useParams();
    const gameId = params.gameid ? parseInt(params.gameid as string) : undefined

    const game = useAtomValue(gameAtom);

    const socket = useSocket();

    return (
        <div className={userBarContainer}>
            <Link href={'/'} onClick={() => {
                if (gameId) {
                    // Emit a leave event if the user is in a game
                    socket?.emit('leave');
                }
            }} >
                <div className={userBarHeader}>
                    <Text size="xd" weight={600}>Musicguessr</Text>
                    <IconMusicQuestion className={css({
                        width: 9, height: 9
                    })} />
                </div>
            </Link>
            <Spacer />
            <div className={css({ display: "flex", flex: 1, minHeight: 0, justifyContent: 'space-between', alignItems: "center", width: "100%", flexDirection: 'column', gap: 1 })}>
                <div className={css({ display: "flex", justifyContent: 'center', alignItems: "center", maxWidth: "100%" })}>
                    <Text weight={600} size="md">Players:</Text>
                </div>
                <div className={userBarList}>
                    {game?.users?.map((user, i) => <UserTile key={i} id={user.id} username={user.name} />)}
                </div>
                {gameId && <CodeTile code={gameId} />}
            </div>
        </div>
    )
}