import { text } from "./styles";

type TextVariants = Exclude<Parameters<typeof text>[0], undefined>;

export interface TextProps extends TextVariants {
    children: React.ReactNode,
}

export default function Text({ size = 'sm', weight, color, lineClamp, children }: TextProps) {
    return <div className={text({ size, weight, color, lineClamp })}>{children}</div>

}