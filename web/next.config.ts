import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        reactCompiler: true,
    },
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'is1-ssl.mzstatic.com',
                port: '',
                pathname: '/image/thumb/**',
            },
            {
                protocol: 'https',
                hostname: 'is2-ssl.mzstatic.com',
                port: '',
                pathname: '/image/thumb/**',
            },
            {
                protocol: 'https',
                hostname: 'is3-ssl.mzstatic.com',
                port: '',
                pathname: '/image/thumb/**',
            },
        ],
    },
};

export default nextConfig;
