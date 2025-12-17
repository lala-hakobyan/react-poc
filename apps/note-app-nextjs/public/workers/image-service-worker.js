

// Name of your image cache
const imageCache = 'image-cache-v1';

// List of local images to pre-cache during installation
const cacheImagesList = [
  '/assets/images/cat-toys.jpg',
  '/assets/images/healthy-lunch.jpg',
  '/assets/images/beach-day.jpg',
  '/assets/images/travel-paris.png'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(imageCache).then((cache) => {
      return cache.addAll(cacheImagesList);
    })
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle *image* requests
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        // If exists in cache → return instantly
        if (cachedResponse) return cachedResponse;

        // Otherwise fetch from network and add to cache dynamically
        return fetch(request).then((networkResponse) => {
          return caches.open(imageCache).then((cache) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  }
});

self.addEventListener('push', event => {
  // Defaults
  let title = 'Push Message: Title';
  let options = {
    body: 'Push Message: Default body text'
  };

  // Guard: Check if notification permission was granted
  // In real scenarios you may need to ask for permission to user and wait for permission to be given.
  if (Notification.permission !== 'granted') {
    console.warn('[Service Worker] Notification permission not granted');
    return;
  }

  // Guard: payload may be missing
  if (event.data) {
    try {
      options.body = event.data.text();
    } catch (e) {
      console.error('Error reading push data:', e);
    }
  }

  // 4. Show notification
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
