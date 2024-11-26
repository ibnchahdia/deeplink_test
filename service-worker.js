// service-worker.js

self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  // You can add resources to cache here if needed
});

self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
  // You can intercept network requests and serve cached resources here
});