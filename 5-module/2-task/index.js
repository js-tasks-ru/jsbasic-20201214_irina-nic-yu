function toggleText() {
  let toggleButton = document.querySelector('.toggle-text-button'),
    textContainer = document.querySelector('#text');

  toggleButton.addEventListener('click', () => {

    if (!textContainer.hasAttribute('hidden')) {
      textContainer.hidden = true;
    } else {
      textContainer.hidden = false;
    }

  });
}
