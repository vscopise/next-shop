import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'wp.lr.uy'
            },
            {
                protocol: 'http',
                hostname: 'wp.lr.uy'
            },
            
        ]
    }
};

export default nextConfig;
