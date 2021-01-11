function initCarousel() {
  const slidesContainer = document.querySelector('.carousel__inner'),
    carouselSlides = document.querySelectorAll('.carousel__slide'),
    carouselArrow = document.querySelectorAll('.carousel__arrow'),
    rightArrow = carouselArrow[0],
    leftArrow = carouselArrow[1];

  const slideWidth = carouselSlides[0].offsetWidth;

  let actualSlidePosition = 0;
  leftArrow.style.display = 'none';

  rightArrow.addEventListener('click', () => {
    leftArrow.style.display = '';
    actualSlidePosition++;
    slidesContainer.style.transform = `translateX(-${slideWidth*actualSlidePosition}px)`;

    if (actualSlidePosition >= (carouselSlides.length - 1)) {
      rightArrow.style.display = 'none';
    }

  });

  leftArrow.addEventListener('click', () => {
    rightArrow.style.display = '';
    actualSlidePosition--;
    slidesContainer.style.transform = `translateX(-${slideWidth*actualSlidePosition}px)`;

    if (actualSlidePosition <= 0) {
      leftArrow.style.display = 'none';
    }

  });

}
