import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'http',
      hostname: 'gatherer.wizards.com',
      port: '',
      pathname: '/Handlers/**'
    }]
  }
};

export default nextConfig;
