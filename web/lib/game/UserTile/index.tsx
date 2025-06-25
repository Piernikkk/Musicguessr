import Text from "@/lib/components/Text";
import { userTileContainer } from "./styles";

interface UserTileProps {
    username?: string;
    id: string;
}

export default function UserTile({ username }: UserTileProps) {
    return (
        <div className={userTileContainer}>
            <Text>{username}</Text>
        </div>
    )
}