// import { set } from 'https://cdn.jsdelivr.net/npm/idb-keyval@6/+esm';

// const SYNC_TAG = 'sync-tag';

// const requestNotificationPermission = () => {
//   if ('Notification' in window) {
//     Notification.requestPermission().then(permission => {
//       if (permission === 'granted') return console.log('Notification permission granted.');
//       return console.log('Notification permission denied.');
//     });
//   } else {
//     alert('Your browser doesnt support notifications!');
//   }
// };

// const button = document.querySelector('#sync');
// button.addEventListener('click', async () => {
//   if ('serviceWorker' in navigator && 'SyncManager' in window) {
//     const id = 1;
//     const email = 'nola@gmail.com';
//     const name = 'Luka Nola';
//     set(id, { email, name });
//     const serviceWorkerRegistration = await navigator.serviceWorker.ready;
//     serviceWorkerRegistration.sync.register(SYNC_TAG);
//     console.log('Sync set!');
//   } else {
//     alert('Your browser doesnt support background sync!');
//   }
// });

// requestNotificationPermission();

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

  self.registration.showNotification(data.title, options);
}

const button = document.getElementById('notifications');
button.addEventListener('click', () => {
  if ('Notification' in window) {
    Notification.requestPermission()
      .then(result => {
        if (result === 'granted') {
          console.log('granted');
          randomNotification();
        } else alert('fuck you1');
      })
      .catch(err => alert(err));
  } else alert('fck you2');
});
