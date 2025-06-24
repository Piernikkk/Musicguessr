import { useContext } from "react";
import { SocketContext } from "../providers/Socket";

export function useSocket() {
    return useContext(SocketContext);
}