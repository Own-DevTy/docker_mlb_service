/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        api:
            process.env.NODE_ENV === 'production'
                ? `http://${process.env.BACK_ADDR}:${process.env.BACK_PORT}/api/v1`
                : 'http://127.0.0.1:8000/api/v1',
    },
};

module.exports = nextConfig;
