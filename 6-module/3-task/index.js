import createElement from '../../assets/lib/create-element.js';
export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this._container = null;

    this._render();
  }

  get elem() {
    return this._container;
  }

  carouselTemplate({slides}) {
    return `
    <div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner">
    ${slides.map(this.slidesTemplate).join('')}
    </div>
    </div>`;
  }
  
  slidesTemplate (product) {
    return `
    <div class="carousel__slide" data-id="${product.id}" data-state="hidden">
    <img src="/assets/images/carousel/${product.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${product.price.toFixed(2)}</span>
        <div class="carousel__title">${product.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`;
  }

  setElements() {
    this._slidesContainer = this._container.querySelector('.carousel__inner');
    this._carouselSlides = this._container.querySelectorAll('.carousel__slide');
    this._rightArrow = this._container.querySelectorAll('.carousel__arrow')[0];
    this._leftArrow = this._container.querySelectorAll('.carousel__arrow')[1];
    this._actualSlidePosition = 0;
    this._leftArrow.style.display = 'none';
  }

  _onAddClick = (event) => {
    let target = event.target;

    if (!target.closest(`.carousel__button`)) {
      return;
    }
    
    let slideId = target.closest(`[data-id]`).dataset.id;

    const newEvent = new CustomEvent("product-add", {
      detail: slideId, 
      bubbles: true
    });

    this._container.dispatchEvent(newEvent);
  }

  _onLeftArrowClick = () => {
    this.showElement(this._rightArrow);
    this._actualSlidePosition--;
    this.moveSlides();

    if (this._actualSlidePosition <= 0) {
      this.hideElement(this._leftArrow);
    }
  };

  _onRightArrowClick = () => {
    this.showElement(this._leftArrow);
    this._actualSlidePosition++;
    this.moveSlides();

    if (this._actualSlidePosition >= (this._carouselSlides.length - 1)) {
      this.hideElement(this._rightArrow);
    }
  };

  showElement(element) {
    element.style.display = '';
  }

  hideElement(element) {
    element.style.display = 'none';
  }

  moveSlides() {
    let slideWidth = this._carouselSlides[0].offsetWidth;
    this._slidesContainer.style.transform = `translateX(-${slideWidth*this._actualSlidePosition}px)`;
  }

  addEventListeners() {
    this._container.addEventListener('click', this._onAddClick);
    this._rightArrow.addEventListener('click', this._onRightArrowClick);
    this._leftArrow.addEventListener('click', this._onLeftArrowClick);
  }

  _render() {
    const template = this.carouselTemplate({slides: this.slides});
    this._container = createElement(template);

    this.setElements();
    
    this.addEventListeners();
  }

}

