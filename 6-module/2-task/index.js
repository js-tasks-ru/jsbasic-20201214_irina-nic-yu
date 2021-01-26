import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor({name, price, category, image, id}) {
    this._name = name;
    this._price = price;
    this._category = category;
    this._image = image;
    this._id = id;
    this._container = null;
 
    this._render();
  }

  get elem() {
    return this._container;
  }

  _cardTemplate({image, price, name}) {
    return `<div class="card"><div class="card">
        <div class="card__top">
            <img src="/assets/images/products/${image}" class="card__image" alt="product">
            <span class="card__price">€${price}</span>
        </div>
        <div class="card__body">
            <div class="card__title">${name}</div>
            <button type="button" class="card__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
        </div>
    </div></div>`;
  }

  _render() {
    const template = this._cardTemplate({
      image: this._image, 
      price: this._price.toFixed(2), 
      name: this._name
    });

    this._container = createElement(template);
    this._container.addEventListener('click', this._onCardClick);
  }
  

  _onCardClick = (event) => {
    let target = event.target;

    if (!target.closest(`[class="card__button"]`)) {
      return;
    }

    const productAddEvent = new CustomEvent(
      'product-add', {
        detail: this._id,
        bubbles: true
      });
      
    this._container.dispatchEvent(productAddEvent);
  }
  
}

