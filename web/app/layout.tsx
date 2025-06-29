import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import Query from '@/lib/providers/Query';
import SocketProvider from '@/lib/providers/Socket';
import { ModalsManagerProvider } from '@/lib/ModalsManager';

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
    title: 'Musicguessr',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="en"
            className={`${poppins.variable} ${inter.variable}`}
            suppressHydrationWarning
        >
            <head>
                {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js"></script> */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body>
                <ThemeProvider>
                    <Query>
                        <SocketProvider>
                            <ModalsManagerProvider>{children}</ModalsManagerProvider>
                        </SocketProvider>
                    </Query>
                </ThemeProvider>
            </body>
        </html>
    );
}
