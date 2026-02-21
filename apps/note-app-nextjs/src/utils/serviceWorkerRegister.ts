'use client';
import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      console.log('Register');
      navigator.serviceWorker
        .register('workers/image-service-worker.js', { scope: '/' })
        .catch((err) => console.error('SW registration failed:', err));
    }
  }, []);

  return null;
}
