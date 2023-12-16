self.addEventListener('install', event => {
  console.log('Installed Service Worker', event);
});

self.addEventListener('activate', event => {
  console.log('Activated Service Worker', event);
});

self.addEventListener('fetch', event => {
  console.log('Caught Fetch Event', event);
});
