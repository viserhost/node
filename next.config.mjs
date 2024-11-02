/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            },
        ],
    },
    env: {
        baseUrl: "https://sohan.thesoftking.com/nextjs-laravel",
        siteName: "Next Laramin",
    },
    async headers() {
        return [
            {
                source: '/firebase-messaging-sw.js',
                headers: [
                    {
                        key: 'Service-Worker-Allowed',
                        value: '/',
                    },
                ],
            },
        ];
    },
};


export default nextConfig;
