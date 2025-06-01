import Text from "@/lib/components/Text";
import { userBarContainer, userBarHeader } from "./styles";
import UserTile from "../UserTile";

export default function UserBar() {
    return (
        <div className={userBarContainer}>
            <div className={userBarHeader}>
                <Text weight={600} size="xd">Players</Text>
            </div>
            <UserTile />
            <UserTile />
        </div>
    )
}