import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['local.react-note-app.com'],
  productionBrowserSourceMaps: true,
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|css|js)',
        headers: [
          {
            key: 'Cache-Control',
            // 30 days for static assets
            value: 'public, max-age=2592000, must-revalidate',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            // 1 minute for API requests
            value: 'public, max-age=60, must-revalidate',
          },
          { key: 'Access-Control-Allow-Origin',
            value: 'http://local.react-note-app.com'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
