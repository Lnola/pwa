const shareButton = document.querySelector('#share-button');

// TODO: update these values
const title = 'Test title';
const text = 'Test text should be part of the message!';
const url = document.location.href;

shareButton.addEventListener('click', async () => {
  const data = { title, text, url };

  if (navigator.share) {
    await navigator.share(data);
  } else {
    alert('Not supported');
  }
});
