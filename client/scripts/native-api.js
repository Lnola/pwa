const shareButton = document.querySelector('.share-button');
const shareDialog = document.querySelector('.share-dialog');
const closeButton = document.querySelector('.close-button');

const openFallbackDialog = () => {
  shareDialog.classList.add('fallback');
};

const closeFallbackDialog = () => {
  shareDialog.classList.remove('fallback');
};

// TODO: update these values
const data = {
  title: 'Test Title',
  text: 'Test text should be part of the message!',
  url: window.location.href,
};

const nativeShare = async () => {
  try {
    await navigator.share(data);
    console.log('Thanks for sharing!');
  } catch (error) {
    console.log('User aborted sharing');
  }
};

const openDialog = navigator.share ? nativeShare : openFallbackDialog;
shareButton.addEventListener('click', openDialog);
closeButton.addEventListener('click', closeFallbackDialog);
