import { set } from 'https://cdn.jsdelivr.net/npm/idb-keyval@6/+esm';

const SYNC_TAG = 'sync-tag';

const button = document.querySelector('#sync');
button.addEventListener('click', async () => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    const id = 1;
    const email = 'nola@gmail.com';
    const name = 'Luka Nola';
    set(id, { email, name });
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    serviceWorkerRegistration.sync.register(SYNC_TAG);
    console.log('Sync set!');
  } else {
    alert('Vas preglednik ne podrzava background sync!');
  }
});
