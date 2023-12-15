const data = {
  imageUrl: 'https://flowbite.com/docs/images/blog/image-1.jpg',
  title: 'Noteworthy technology acquisitions 2021',
  description:
    'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
};

const createCardClone = (template, { imageUrl, title, description }) => {
  const clone = template.cloneNode(true);
  clone.querySelector('.card-image').src = imageUrl;
  clone.querySelector('.card-title').textContent = title;
  clone.querySelector('.card-description').textContent = description;
  return clone;
};

document.addEventListener('DOMContentLoaded', () => {
  const template = document.getElementById('card-template').content;
  const container = document.getElementById('card-container');
  const clone = createCardClone(template, data);
  container.appendChild(clone);
});
