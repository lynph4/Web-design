export default class CalculatorModel {
  constructor() {
    this.expression = '';
    this.isBinaryMode = false;
    this.isEvaluated = false;
    this.actions = [];
    this.operatorsMap = { '×': '*', '−': '-', '÷': '/', '+': '+' };
  }

  toggleMode() {
    this.isBinaryMode = !this.isBinaryMode;
    this.clearExpression();
  }

  getExpression() {
    return this.expression;
  }

  getMode() {
    return this.isBinaryMode;
  }

  append(value) {
    this.actions.push(value);

    const mappedValue = this.operatorsMap[value] || value;
    const isNewOperator = /[\+\-×÷*\/√%]/.test(mappedValue);
    console.log(`isNewOperator: ${isNewOperator}`);

    if (this.expression === 'Error') {
      this.clearExpression();
    }
    else if (!this.expression.length) {
      this.expression += isNewOperator ? '' : mappedValue;
      return;
    }

    const lastChar = this.expression.slice(-1);
    const isLastOperator = /[\+\-×÷*\/√%]/.test(lastChar);

    if (isLastOperator && isNewOperator) {
      this.expression = this.expression.slice(0, -1) + mappedValue;
    } else {
      this.expression += mappedValue;
    }
  }

  clearExpression() {
    this.expression = '';
  }

  deleteLast() {
    if (!this.actions.length) {
      this.clearExpression();
      return;
    }

    const lastChar = this.expression.slice(-1);
    const hasOperator = /[\+\-×÷*\/√%]/.test(this.expression);

    if (!hasOperator) {
      this.clearExpression();
    } else if (
      (!this.isBinaryMode && /[0-9.]/.test(lastChar)) ||
      (this.isBinaryMode && /[0-1]/.test(lastChar))
    ) {
      this.expression = this.expression.slice(0, -1);
    }
  }

  evaluate() {
    if (!this.expression || this.expression === 'Error') {
      return '0';
    }
    let result;
    try {
      console.log(`Expression: ${this.expression}`);
      if (this.isBinaryMode) {
        const numbers = this.expression.match(/[01]+/g) || [];
        const length = numbers.reduce((max, num) => Math.max(max, num.length), 0);
        const binaryExpression = this.expression.replace(/([01]+)/g, (match) => parseInt(match, 2));
        console.log(`Binary to decimal: ${binaryExpression}`);
        result = eval(binaryExpression);
        result = result.toString(2).padStart(length, '0');
      }
      else {
        result = this.handleSpecialOperations(this.expression);
      }
      this.expression = result;
    } catch (error) {
      this.expression = 'Error';
    }
    this.actions = [];
    return this.expression;
  }

  handleSpecialOperations(expr) {
    if (expr.includes('√')) {
      const number = parseFloat(expr.replace('√', ''));
      console.log(`Number: ${number}`);
      return Number.isNaN(number) || number < 0 ? 'Error' : Math.sqrt(number).toString();
    }
    return eval(expr).toString();
  }
}