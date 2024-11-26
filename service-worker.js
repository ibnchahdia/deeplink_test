// Give your cache a name
const CACHE_NAME = 'my-app-cache-v1';

// List of files to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/icon-192.png',
  '/assets/icon-512.png'
];

// Install event - caching files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serving cached content when offline
self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});

// Activate event - updating the cache
self.addEventListener('activate', (event) => {
  console.log('Service Worker activate.');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});
