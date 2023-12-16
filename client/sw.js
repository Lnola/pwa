const STATIC_CACHE_NAME = 'site-static-v1';
const STATIC_ASSETS = [
  '/client',
  '/client/index.html',
  '/client/assets/css/layout.css',
  '/client/assets/css/products.css',
  '/client/scripts/index.js',
  '/client/scripts/layout.js',
  '/client/scripts/products.js',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
  'https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE_NAME);
      return cache.addAll(STATIC_ASSETS);
    })(),
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      const cachedResponse = await caches.match(event.request);
      return cachedResponse || fetch(event.request);
    })(),
  );
});
