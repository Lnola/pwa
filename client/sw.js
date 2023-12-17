const STATIC_CACHE_NAME = 'site-static-v3';
const DYNAMIC_CACHE_NAME = 'site-dynamic-v3';
const FALLBACK_PAGE = '/fallback.html';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/assets/css/layout.css',
  '/assets/css/products.css',
  '/scripts/index.js',
  '/scripts/layout.js',
  '/scripts/products.js',
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

  (async () => {
    const products = await fetch('https://fakestoreapi.com/products');
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    cache.put('/products', products);
  })();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      self.clients.claim();

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
