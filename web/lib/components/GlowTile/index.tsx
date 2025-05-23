'use client'
import { useMouse } from "@mantine/hooks";
import { useState } from "react";
import { glowTileContainer } from "./styles";
import { blur } from "./styles";

interface GlowTileProps extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export default function GlowTile({ children, className, ...props }: GlowTileProps) {
    const { ref, x, y } = useMouse();

    const [isHovered, setIsHovered] = useState(false);


    return (
        <div className={`${glowTileContainer} ${className}`} ref={ref} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} {...props} >
            {children}
            <div className={blur} style={{
                left: x - 125,
                top: y - 125,
                opacity: isHovered ? 1 : 0,
            }}></div>
        </div>
    )
}