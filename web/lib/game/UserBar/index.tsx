import Text from "@/lib/components/Text";
import { userBarContainer, userBarHeader, userBarList } from "./styles";
import UserTile from "../UserTile";
import Spacer from "@/lib/components/Spacer";
import { css } from "@/styled-system/css";
import { IconMusicQuestion } from "@tabler/icons-react";
import Link from "next/link";

export default function UserBar() {
    return (
        <div className={userBarContainer}>
            <Link href={'/'} >
                <div className={userBarHeader}>
                    <Text size="xd" weight={600}>Musicguessr</Text>
                    <IconMusicQuestion className={css({
                        width: 9, height: 9
                    })} />
                </div>
            </Link>
            <Spacer />
            <div className={userBarList}>
                <div className={css({ display: "flex", justifyContent: 'center', alignItems: "center", width: "100%" })}>
                    <Text weight={600} size="md">Players:</Text>
                </div>
                <UserTile />
                <UserTile />
            </div>
        </div>
    )
}