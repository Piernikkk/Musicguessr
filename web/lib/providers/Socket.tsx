'use client';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const SocketContext = createContext<Socket | undefined>(undefined);

export default function SocketProvider({ children }: { children: ReactNode }) {
    const [socket, setSocket] = useState<Socket | undefined>();

    useEffect(() => {
        const socket = io();
        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
