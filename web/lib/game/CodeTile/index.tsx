'use client'
import Text from "@/lib/components/Text";
import { codeTileContainer } from "./styles";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";

interface CodeTileProps {
    code: number;
}

export default function CodeTile({ code }: CodeTileProps) {
    const [animate, setAnimate] = useState(false);

    return (
        <div className={codeTileContainer} onClick={() => {
            navigator.clipboard.writeText(code.toString());
            setAnimate(true);
            setTimeout(() => setAnimate(false), 1500);
        }}>
            {animate ?
                <>
                    <Text>Code copied</Text>
                    <IconCheck />
                </>
                :
                <>
                    <Text>Game code:</Text>
                    <Text weight={600}>{code}</Text>
                    <IconCopy />
                </>
            }
        </div>
    )
}