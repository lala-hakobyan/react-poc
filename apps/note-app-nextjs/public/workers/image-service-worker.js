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
