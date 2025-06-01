import Text from "@/lib/components/Text";
import { userTileContainer } from "./styles";

export default function UserTile() {
    return (
        <div className={userTileContainer}>
            <Text>User</Text>
        </div>
    )
}