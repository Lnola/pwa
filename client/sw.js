// import { del, entries as getEntries } from 'https://cdn.jsdelivr.net/npm/idb-keyval@6/+esm';

// const STATIC_CACHE_NAME = 'site-static-v10';
// const DYNAMIC_CACHE_NAME = 'site-dynamic-v10';
// const FALLBACK_PAGE = '/fallback.html';
// const STATIC_ASSETS = [
//   '/',
//   '/index.html',
//   'favicon.ico',
//   '/manifest.json',
//   '/assets/css/layout.css',
//   '/assets/css/share.css',
//   '/scripts/index.js',
//   '/scripts/layout.js',
//   '/scripts/share.js',
//   'https://fonts.googleapis.com/icon?family=Material+Icons',
//   'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
//   'https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
//   'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
//   FALLBACK_PAGE,
// ];
// const SYNC_TAG = 'sync-tag';

self.addEventListener('install', event => {
  function randomNotification() {
    var data = { title: 'title', body: 'body', redirectUrl: '/' };

    var options = {
      body: data.body,
      icon: 'favicon.ico',
      badge: 'favicon.ico',
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      data: {
        redirectUrl: data.redirectUrl,
      },
    };

    console.log('showing');
    self.registration.showNotification(data.title, options);
  }

  randomNotification();

  // const button = document.getElementById('notifications');
  // button.addEventListener('click', () => {
  //   if ('Notification' in window) {
  //     Notification.requestPermission()
  //       .then(result => {
  //         if (result === 'granted') {
  //           console.log('granted');
  //           randomNotification();
  //         } else alert('fuck you1');
  //       })
  //       .catch(err => alert(err));
  //   } else alert('fck you2');
  // });
});

// self.addEventListener('install', event => {
//   event.waitUntil(
//     (async () => {
//       const cache = await caches.open(STATIC_CACHE_NAME);
//       return cache.addAll(STATIC_ASSETS);
//     })(),
//   );
// });

// self.addEventListener('activate', event => {
//   event.waitUntil(
//     (async () => {
//       self.clients.claim();

//       const keys = await caches.keys();
//       return Promise.all(
//         keys.filter(key => key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME).map(key => caches.delete(key)),
//       );
//     })(),
//   );
// });

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     (async () => {
//       try {
//         const cachedResponse = await caches.match(event.request);
//         if (cachedResponse) return cachedResponse;
//         const fetchedResponse = await fetch(event.request);
//         const cache = await caches.open(DYNAMIC_CACHE_NAME);
//         cache.put(event.request.url, fetchedResponse.clone());
//         return fetchedResponse;
//       } catch (error) {
//         if (event.request.url.indexOf('.html') < 0) return;
//         return await caches.match(FALLBACK_PAGE);
//       }
//     })(),
//   );
// });

// async function createSubscription(data) {
//   try {
//     const response = await fetch('https://fakestoreapi.com/users', {
//       method: 'POST',
//       body: JSON.stringify(data),
//     });
//     const json = await response.json();
//     if (!json.id) {
//       console.log('No id in response. Subscription might not be successful!');
//       return false;
//     }
//     console.log('Subscription successful, deleting from db!');
//     return true;
//   } catch (error) {
//     console.error('Sync Failed!');
//     return false;
//   }
// }

// function createNotification(isSuccessful) {
//   if (Notification.permission === 'granted') {
//     const body = isSuccessful
//       ? 'Your subscription has been successfully synced.'
//       : 'Subscription sync failed. Please try again.';
//     const icon = '/favicon.ico';
//     self.registration.showNotification('Subscription Sync Status', { body, icon });
//   }
// }

// self.addEventListener('sync', event => {
//   if (event.tag !== SYNC_TAG) return;
//   console.log(`Sync event "${event.tag}" recieved!`);
//   event.waitUntil(
//     (async () => {
//       const entries = await getEntries();
//       for (const [id, data] of entries) {
//         const isSuccessful = await createSubscription(data);
//         if (isSuccessful) del(id);
//         createNotification(isSuccessful);
//       }
//     })(),
//   );
// });
