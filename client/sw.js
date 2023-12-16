const STATIC_CACHE_NAME = 'site-static-v2';
const DYNAMIC_CACHE_NAME = 'site-dynamic-v2';
const FALLBACK_PAGE = '/client/fallback.html';
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
  FALLBACK_PAGE,
];

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE_NAME);
      return cache.addAll(STATIC_ASSETS);
    })(),
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      return Promise.all(
        keys.filter(key => key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME).map(key => caches.delete(key)),
      );
    })(),
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      try {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;
        const fetchedResponse = await fetch(event.request);
        const cache = await caches.open(DYNAMIC_CACHE_NAME);
        cache.put(event.request.url, fetchedResponse.clone());
        return fetchedResponse;
      } catch (error) {
        if (event.request.url.indexOf('.html') < 0) return;
        return await caches.match(FALLBACK_PAGE);
      }
    })(),
  );
});
