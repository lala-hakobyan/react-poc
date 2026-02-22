// Name of your image cache
const imageCache = 'image-cache-v1';

console.log('image-service-worker');

// List of local images to pre-cache during installation
const cacheImagesList = [
  '/assets/icons/arrow-down-short-wide-solid-full.svg',
  '/assets/icons/arrow-up-short-wide-solid-full.svg',
  '/assets/icons/circle-notch-solid-full.svg',
  '/assets/icons/magnifying-glass-solid-full.svg',
  '/assets/icons/plus-solid-full.svg',
  '/assets/icons/svg-sprite.svg',
  '/assets/images/my-notes-logo.png',
];

// Install Event
self.addEventListener('install', (event) => {
  console.log('install++');
  event.waitUntil(
    caches.open(imageCache).then((cache) => {
      return cache.addAll(cacheImagesList);
    })
  );
});

self.addEventListener('message', (event) => {
  // Check if the message has the data you want to cache
  if (event.data && event.data.type === 'CACHE_NEW_IMAGES') {
    const urlsToCache = event.data.payload;

    console.log('I listen to message');

    event.waitUntil(
      caches.open(imageCache).then((cache) => {
        console.log('Service Worker is dynamically caching:', urlsToCache);
        return cache.addAll(urlsToCache);
      })
    );
  }
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
        // If exists in cache, return instantly
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
