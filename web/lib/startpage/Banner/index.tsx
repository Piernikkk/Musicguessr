import Text from "@/lib/components/Text";
import { IconMusicQuestion } from "@tabler/icons-react";
import { logoBannerContainer } from "./styles";
import { css } from "@/styled-system/css";

export default function LogoBanner() {
    return (
        <div className={logoBannerContainer}>
            <Text size="4xl" weight={600}>Musicguessr</Text>
            <IconMusicQuestion className={css({
                width: "40px", height: "40px", lg: {
                    width: "110px",
                    height: "110px"
                }
            })} />
        </div>
    )
}