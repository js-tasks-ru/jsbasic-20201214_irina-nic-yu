import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this._container = null;
    this._scrollStep = 350;

    this._render();
  }

  get elem() {
    return this._container; 
  }

  _ribbonTemplate(items) {
    return `
    <div class="ribbon">
      ${this._buttonTemplate('left')}
      <nav class="ribbon__inner">
        ${items.map(this._ribbonItemsTemplate).join('')}
      </nav>
      ${this._buttonTemplate('right')}
    </div>`;
  }

  _buttonTemplate(button) {
    return `
    <button class="ribbon__arrow ribbon__arrow_${button}">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`;
  }
  _ribbonItemsTemplate({id, name}) {
    return `<a href="#" class="ribbon__item" data-id="${id}">${name}</a>`;
  }

  _setElements() {
    this._ribbonInner = this._container.querySelector('.ribbon__inner');
    this._ribbonItems = this._container.querySelectorAll('.ribbon__item');
    this._lastRibbonItem = this._ribbonItems[this._ribbonItems.length-1];
    this._rightButton = this._container.querySelector('.ribbon__arrow_right');
    this._leftButton = this._container.querySelector('.ribbon__arrow_left');
    this._rightButton.classList.add('ribbon__arrow_visible');
  }

  _addEventListeners() {
    this._leftButton.addEventListener('click', this._onLeftClick);
    this._rightButton.addEventListener('click', this._onRightClick);
    this._ribbonInner.addEventListener('scroll', this._onScroll);
    this._ribbonInner.addEventListener('click', this._onCategoryClick);
  }

  _onLeftClick = () => {
    this._ribbonInner.scrollBy(-this._scrollStep, 0);
  }

  _onRightClick = () => {
    this._ribbonInner.scrollBy(this._scrollStep, 0);
  }

  _onScroll = () => {
    let scrollWidth = this._ribbonInner.scrollWidth;
    let clientWidth = this._ribbonInner.clientWidth;
    let scrollLeft = this._ribbonInner.scrollLeft;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft == 0) {
      this._hideButton(this._leftButton);
    } else {
      this._showButton(this._leftButton);
    }

    if (Math.round(scrollRight) == 0) {
      this._hideButton(this._rightButton);
    } else {
      this._showButton(this._rightButton);
    }
  }

  _hideButton(button) {
    return button.classList.remove('ribbon__arrow_visible');
  }

  _showButton(button) {
    return button.classList.add('ribbon__arrow_visible');
  }

  _onCategoryClick = (event) => {
    let eventTarget = event.target;

    if (!eventTarget.classList.contains('ribbon__item')) {
      return;
    }

    event.preventDefault();

    let categoryId = eventTarget.dataset.id;
    let ribbonSelect = new CustomEvent('ribbon-select', { 
      detail: categoryId,
      bubbles: true 
    });

    this.elem.dispatchEvent(ribbonSelect);

  }

  _render() {
    const template = this._ribbonTemplate(this.categories);
    this._container = createElement(template);

    this._setElements();
    this._addEventListeners();
  }

}
