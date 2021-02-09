import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this._container = null;
    
    this._render();
  }

  _modalContainerTemplate() {
    return `
      <div class="modal">
        <div class="modal__overlay"></div>
          <div class="modal__inner">
            <div class="modal__header">
              <button type="button" class="modal__close">
                <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
              </button>
              <h3 class="modal__title"></h3>
            </div>
            <div class="modal__body">123</div>
        </div>
      </div>`;
  }

  _render() {
    const modalTemplate = this._modalContainerTemplate();
    this._container = createElement(modalTemplate);
    document.body.append(this._container);
    this.addEventListeners();
  }

  addEventListeners() {
    this._container.addEventListener('click', this._onClick);
    document.addEventListener('keydown', this._onKeydown);
  }
  
  _onClick = () => {
    let eventTarget = event.target;
    
    if (!eventTarget.closest('.modal__close')) {
      return;
    }
    
    this.close();
  }

  _onKeydown = (event) => {
    let eventKeyCode = event.code;

    if (eventKeyCode == 'Escape') {
      this.close();
    }
  }

  open() {
    document.body.classList.add('is-modal-open');
    return this._container;
  }

  setTitle(title) {
    this._headingTitle = this._container.querySelector('.modal__title');
    this._headingTitle.textContent = title; 
  }

  setBody(node) {
    this._modalBody = this._container.querySelector('.modal__body');
    this._modalBody.innerHTML = '';
    this._modalBody.append(node);
  }

  close() {
    this._container.remove();
    document.body.classList.remove('is-modal-open');
  }

}


