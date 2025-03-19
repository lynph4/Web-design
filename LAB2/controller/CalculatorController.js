import CalculatorModel from '../model/CalculatorModel.js';
import CalculatorView from '../view/CalculatorView.js';

export default class CalculatorController {
  constructor() {
    this.model = new CalculatorModel();
    this.view = new CalculatorView();

    this.bindEvents();
    this.view.updateMode(this.model.getMode());
    this.view.updateDisplay(this.model.getExpression());
  }

  bindEvents() {
    const calculator = document.querySelector('.calculator');
    calculator.addEventListener('click', (event) => {
      const button = event.target.closest('.calc-btn');
      if (button) {
        this.handleButtonClick(button.textContent);
      }
    });

    document.getElementById('switch-toggle').addEventListener('click', () => this.toggleMode());
  }

  handleButtonClick(value) {
    switch (value) {
      case '=':
        this.view.updateDisplay(this.model.evaluate());
        break;
      case 'C':
        this.model.clearExpression();
        this.view.updateDisplay(this.model.getExpression());
        break;
      case 'CE':
        this.model.deleteLast();
        this.view.updateDisplay(this.model.getExpression());
        break;
      default:
        this.model.append(value);
        this.view.updateDisplay(this.model.getExpression());
        break;
    }
  }

  toggleMode() {
    this.model.toggleMode();
    this.view.updateMode(this.model.getMode());
    this.view.updateDisplay(this.model.getExpression());
  }
}