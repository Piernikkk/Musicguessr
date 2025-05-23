import Text from "@/lib/components/Text";
import { IconMusicQuestion } from "@tabler/icons-react";
import { logoBannerContainer } from "./styles";

export default function LogoBanner() {
    return (
        <div className={logoBannerContainer}>
            <Text size="4xl" weight={600}>Musicguessr</Text>
            <IconMusicQuestion size={110} />
        </div>
    )
}