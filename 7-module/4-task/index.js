import createElement from '../../assets/lib/create-element.js';
export default class StepSlider {
  constructor({ steps, value = null }) {
    if (value == null) {
      value = Math.floor(steps / 2);
    }
    this._stepsCount = steps;
    this._value = value;
    this._container = null;
    this._oneStepProgress = 100 / (this._stepsCount - 1); 

    this._render();
  }

  get elem() {
    return this._container;
  }

  _stepSliderTemplate(stepsCount) {
    return `
    <div class="slider">
      <div class="slider__thumb">
        <span class="slider__value"></span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps">
        ${this._renderSteps(stepsCount)}
      </div>
    </div>`;
  }

  _renderSteps(stepsCount) {
    let stepsTemplate = [];
    let count = 0;
    do {
      stepsTemplate.push(`<span value='${count}'></span>`);
      count++;
    }
    while (count < stepsCount);

    return stepsTemplate.join('');
  }

  _setThumbPosition(index) {
    this._thumb.style.left = `${this._oneStepProgress * index}%`;
    this._progress.style.width = `${this._oneStepProgress * index}%`;
  }

  _stepActive(index) {
    let activeStep = this._steps[index];
    this._steps.forEach((element) => {
      element.classList.remove('slider__step-active');
    });
    activeStep.classList.add('slider__step-active');

    this._value = index;
    this._sliderValue.textContent = index;
    
  }

  _setElements() {
    this._sliderSteps = this._container.querySelector('.slider__steps');
    this._steps = [...this._sliderSteps.children];
    this._thumb = this._container.querySelector('.slider__thumb');
    this._sliderValue = this._container.querySelector('.slider__value');
    this._progress = this._container.querySelector('.slider__progress'); 

  }

  _render() {
    const template = this._stepSliderTemplate(this._stepsCount);
    this._container = createElement(template);

    this._setElements();

    this._stepActive(this._value);

    this._setThumbPosition(this._value);
  
    this.addEventListeners();
    
  }

  addEventListeners() {
    this._container.addEventListener('click', this._onClick);
    this._container.addEventListener('pointerdown', this._onDown);
    this._thumb.ondragstart = () => false;
    this._thumb.pointerdown = () => false;
    this._thumb.pointermove = () => false;
    
  }

  _onClick = (event) => {
    let currentPosition = event.pageX;
    let currentPositionIndex = this._getClosestStepIndex(currentPosition);

    this._stepActive(currentPositionIndex);
    this._setThumbPosition(this._value);

    this._createSliderChangeEvent();
  }


  _onDown = (event) => {
    let target = event.target;

    if (target != this._thumb) {
      return;
    }

    this._thumb.style.position = "absolute";
    this._thumb.style.zIndex = 1000;

    document.addEventListener('pointermove', this._onMove);
    document.addEventListener('pointerup', this._onUp, {once: true});
  }


  _onMove = (event) => { 
    this._container.classList.add('slider_dragging');

    let currenPositionPercentage = this._currenPositionPercentage(event.pageX);
  
    if (currenPositionPercentage < 0 || currenPositionPercentage > 100) {
      return;
    }

    this._thumb.style.left = `${currenPositionPercentage}%`;  
    this._progress.style.width = `${currenPositionPercentage}%`;
    
    let currentPosition = event.pageX;
    let currentPositionIndex = this._getClosestStepIndex(currentPosition);

    this._stepActive(currentPositionIndex);
  }

  _currenPositionPercentage(pageX) {
    const containerWidth = this._container.offsetWidth;
    let currentPositionInContainer = pageX - this._container.getBoundingClientRect().x;    
    return currentPositionInContainer * 100 / containerWidth;
  }

  _getClosestStepIndex(pageX) {
    this._stepsPositionX = this._steps.map((element) => element.getBoundingClientRect().x);

    let smallestDistance = this._stepWidth();
    let currentStepIndex;

    this._stepsPositionX.forEach((elem, index) => {
      let distance = Math.abs(pageX - elem);
  
      if (distance < smallestDistance) {
        smallestDistance = distance;
        currentStepIndex = index;
      }
    });
    
    return currentStepIndex;
  }
   
  _stepWidth() {
    return this._sliderSteps.offsetWidth / (this._stepsCount - 1);
  }

  _onUp = () => {
    this._container.classList.remove('slider_dragging');
    this._setThumbPosition(this._value);
    this._createSliderChangeEvent();
  
    document.removeEventListener('pointermove', this._onMove);
  }

  _createSliderChangeEvent() {
    let sliderChangeEvent = new CustomEvent('slider-change', { 
      detail: Number(this._value), 
      bubbles: true 
    });
    this._container.dispatchEvent(sliderChangeEvent);
  }
}
