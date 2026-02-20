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
