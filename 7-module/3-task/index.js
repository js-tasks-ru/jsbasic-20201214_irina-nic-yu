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

  _stepActive(value) {
    this._steps.map((element) => {
      element.classList.remove('slider__step-active');
    });

    let activeStep = this._steps[value];
    activeStep.classList.add('slider__step-active');

    this._sliderValue.textContent = value;
    this._thumb.style.left = `${this._oneStepProgress * value}%`;
    this._progress.style.width = `${this._oneStepProgress * value}%`;
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
  
    this.addEventListeners();
  }

  addEventListeners() {
    this._container.addEventListener('click', this._onClick);
  }

  _onClick = (event) => {
    let clickPosition = event.clientX;
    let currentStep = this._getcurrentStep(clickPosition);
    
    this._value = currentStep.getAttribute('value');
    this._stepActive(this._value);

    let sliderChangeEvent = new CustomEvent('slider-change', { 
      detail: Number(this._value), 
      bubbles: true 
    });
    this._container.dispatchEvent(sliderChangeEvent);

  }

  _getcurrentStep(eventTarget) {
    let stepsPosition = this._steps.map((element) => element.getBoundingClientRect().x);

    let smallestDistance = this._stepWidth;
    let currentStepIndex;

    stepsPosition.forEach((elem, index) => {
      let distance = Math.abs(eventTarget - elem);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        currentStepIndex = index;
      }
    });

    return this._steps[currentStepIndex];
  }

  get _stepWidth () {
    return this._sliderSteps.offsetWidth / (this._stepsCount - 1);
  }

}
