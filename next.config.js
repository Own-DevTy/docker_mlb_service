/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    api: process.env.NODE_ENV === 'production' ? 'http://back:8000/api/v1' : 'http://127.0.0.1:8000/api/v1'
  }
}

module.exports = nextConfig
