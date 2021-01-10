function toggleText() {
  let toggleButton = document.querySelector('.toggle-text-button'),
    textContainer = document.querySelector('#text');

  toggleButton.addEventListener('click', () => {

    if (!textContainer.hasAttribute('hidden')) {
      textContainer.setAttribute('hidden', null);
    } else {
      textContainer.removeAttribute('hidden');
    }

  });
}
