import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  allowedDevOrigins: ['192.168.29.122', '192.168.1.70', 'localhost', '127.0.0.1'],
};
export default nextConfig;
