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
            key: 'Access-Control-Expose-Headers',
            value: 'ETag'
          },
          {
            key: 'Cache-Control',
            // 1 minute for API requests
            value: 'public, max-age=60, must-revalidate',
          },
          {
            key: 'Last-Modified',
            value: new Date().toUTCString(), // Set at build time
          },
          { key: 'Access-Control-Allow-Origin',
            value: 'http://local.react-note-app.com'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' blob: data: https:;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
