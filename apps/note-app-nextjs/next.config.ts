import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['local.react-note-app.com'],

  webpack: (config, { dev, isServer }) => {
    // This forces source maps to be generated to disk for server-side code.
    if (dev && isServer) {
      config.devtool = 'source-map';
    }
    return config;
  },
};

export default nextConfig;
