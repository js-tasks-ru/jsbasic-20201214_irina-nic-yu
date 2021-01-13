function initCarousel() {
  const slidesContainer = document.querySelector('.carousel__inner'),
    carouselSlides = document.querySelectorAll('.carousel__slide'),
    carouselArrow = document.querySelectorAll('.carousel__arrow'),
    rightArrow = carouselArrow[0],
    leftArrow = carouselArrow[1],
    slideWidth = carouselSlides[0].offsetWidth;

  let actualSlidePosition = 0;
  leftArrow.style.display = 'none';

  function showElement(element) {
    element.style.display = '';
  }

  function hideElement(element) {
    element.style.display = 'none';
  }

  function moveSlides() {
    slidesContainer.style.transform = `translateX(-${slideWidth*actualSlidePosition}px)`;
  }

  rightArrow.addEventListener('click', () => {
    showElement(leftArrow);
    actualSlidePosition++;
    moveSlides();

    if (actualSlidePosition >= (carouselSlides.length - 1)) {
      hideElement(rightArrow);
    }

  });

  leftArrow.addEventListener('click', () => {
    showElement(rightArrow);
    actualSlidePosition--;
    moveSlides();

    if (actualSlidePosition <= 0) {
      hideElement(leftArrow);
    }

  });

}
