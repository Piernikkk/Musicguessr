import Text from "@/lib/components/Text";
import { userTileContainer } from "./styles";

interface UserTileProps {
    username?: string;
    id: string;
}

export default function UserTile({ id }: UserTileProps) {
    return (
        <div className={userTileContainer}>
            <Text>{id}</Text>
        </div>
    )
}