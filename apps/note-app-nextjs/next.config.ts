import type { NextConfig } from 'next';


const nextConfig: NextConfig = {
  allowedDevOrigins: ['local.react-note-app.com', 'local.react-app.com'],
  productionBrowserSourceMaps: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.note-app-domain.com; style-src 'self' 'unsafe-inline' https://cdn.note-app-domain.com; img-src 'self' blob: data: https://cdn.note-app-domain.com; connect-src 'self' http://localhost:3010 https://note-app-domain.com; ",
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|png|css|js)',
        headers: [
          {
            key: 'Cache-Control',
            // 30 days for static assets
            value: 'public, max-age=31536000, immutable',
          }
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
            value: 'private, no-cache',
          },
          {
            key: 'Last-Modified',
            value: new Date().toUTCString(), // Set at build time
          },
          { key: 'Access-Control-Allow-Origin',
            value: 'http://local.react-note-app.com:3000'
          }
        ],
      },
      {
        source: '/workers/image-service-worker.js',
        headers: [
          { key: 'Service-Worker-Allowed', value: '/' },
          // { key: 'Cache-Control', value: 'no-store' }, // optional, but helpful during debugging
        ],
      },
    ];
  },
};

export default nextConfig;
