import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'upnest.vercel.app', '94.130.226.209'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '1gb'
    }
  }
};

export default nextConfig;
