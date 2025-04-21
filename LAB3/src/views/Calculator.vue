<template>
  <section class="d-flex calculator-container flex-column align-items-center justify-content-center">
    <div class="info">
      <h1 class="fw-bold">ОНЛАЙН КАЛЬКУЛЯТОР</h1>
      <p class="text-muted">
        Онлайн калькулятор допоможе вам вирішити складні математичні задачі. Розв'язувати задачі дуже просто з нашим
        онлайн калькулятором.
      </p>
    </div>

    <button class="switch-btn" @click="toggleMode">
      <img :src="modeIcon" alt="Mode Icon" style="width: 30px; height: 30px;">
      <span>{{ modeText }}</span>
    </button>

    <div class="calculator">
      <div class="display-container">
        <div class="display">{{ display }}</div>
      </div>

      <div v-if="mode === 'regular'" class="regular-mode">
        <button v-for="(btn, index) in regularButtons" :key="'r' + index" :class="['calc-btn', btn.class]"
          @click="handleButtonClick(btn.label)">
          {{ btn.label }}
        </button>
      </div>

      <div v-if="mode === 'programmer'" class="programmer-mode">
        <button v-for="(btn, index) in programmerButtons" :key="'p' + index" :class="['calc-btn', btn.class]"
          @click="handleButtonClick(btn.label)">
          {{ btn.label }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { evaluate } from 'mathjs';

const expression = ref('');
const isBinaryMode = ref(false);
const actions = ref([]);
const operatorsMap = { '×': '*', '−': '-', '÷': '/', '+': '+' };
const display = ref('');

const mode = computed(() => isBinaryMode.value ? 'programmer' : 'regular');
const modeIcon = computed(() => isBinaryMode.value ? '/regular.png' : '/binary.png');
const modeText = computed(() => isBinaryMode.value ? 'Звичайний' : 'Двійковий');

const regularButtons = [
  { label: '%', class: '' },
  { label: '√', class: '' },
  { label: 'CE', class: '' },
  { label: 'C', class: 'dark-btn' },

  { label: '7', class: '' },
  { label: '8', class: '' },
  { label: '9', class: '' },
  { label: '−', class: 'red-btn' },

  { label: '4', class: '' },
  { label: '5', class: '' },
  { label: '6', class: '' },
  { label: '/', class: 'blue-btn' },

  { label: '1', class: '' },
  { label: '2', class: '' },
  { label: '3', class: '' },
  { label: '×', class: 'yellow-btn' },

  { label: '0', class: '' },
  { label: '.', class: '' },
  { label: '=', class: '' },
  { label: '+', class: 'green-btn' }
];

const programmerButtons = [
  { label: '0', class: '' },
  { label: '1', class: '' },
  { label: 'C', class: 'dark-btn' },
  { label: '+', class: 'green-btn' },
  { label: '−', class: 'red-btn' },
  { label: '×', class: 'yellow-btn' },
  { label: '/', class: 'blue-btn' },
  { label: '=', class: '' }
];

function toggleMode() {
  isBinaryMode.value = !isBinaryMode.value;
  clearExpression();
  display.value = expression.value || '';
}

function append(value) {
  actions.value.push(value);
  const mappedValue = operatorsMap[value] || value;
  const isNewOperator = /[\+\-×÷*\/√%]/.test(mappedValue);

  if (expression.value === 'Error') {
    clearExpression();
  } else if (!expression.value.length) {
    expression.value += isNewOperator ? '' : mappedValue;
    display.value = formatDisplay(expression.value);
    return;
  }

  const lastChar = expression.value.slice(-1);
  const isLastOperator = /[\+\-×÷*\/√%]/.test(lastChar);

  if (isLastOperator && isNewOperator) {
    expression.value = expression.value.slice(0, -1) + mappedValue;
  } else {
    expression.value += mappedValue;
  }
  display.value = formatDisplay(expression.value);
}

function clearExpression() {
  expression.value = '';
  actions.value = [];
  display.value = '0';
}

function deleteLast() {
  if (!actions.value.length) {
    clearExpression();
    return;
  }

  const lastChar = expression.value.slice(-1);
  const hasOperator = /[\+\-×÷*\/√%]/.test(expression.value);

  if (!hasOperator) {
    clearExpression();
  } else if (
    (!isBinaryMode.value && /[0-9.]/.test(lastChar)) ||
    (isBinaryMode.value && /[0-1]/.test(lastChar))
  ) {
    expression.value = expression.value.slice(0, -1);
    actions.value.pop();
  }
  display.value = formatDisplay(expression.value) || '0';
}

function evaluateExpression() {
  if (!expression.value || expression.value === 'Error') {
    return '0';
  }
  let result;
  try {
    if (isBinaryMode.value) {
      const numbers = expression.value.match(/[01]+/g) || [];
      const length = numbers.reduce((max, num) => Math.max(max, num.length), 0);
      const binaryExpression = expression.value.replace(/([01]+)/g, (match) => parseInt(match, 2));
      result = evaluate(binaryExpression);
      result = result.toString(2).padStart(length, '0');
    } else {
      result = handleSpecialOperations(expression.value);
    }
    expression.value = result;
  } catch (error) {
    expression.value = 'Error';
  }
  actions.value = [];
  return expression.value;
}

function handleSpecialOperations(expr) {
  if (expr.includes('√')) {
    const number = parseFloat(expr.replace('√', ''));
    return Number.isNaN(number) || number < 0 ? 'Error' : Math.sqrt(number).toString();
  }
  return evaluate(expr).toString();
}

function handleButtonClick(value) {
  switch (value) {
    case '=':
      display.value = evaluateExpression();
      break;
    case 'C':
      clearExpression();
      display.value = expression.value || '0';
      break;
    case 'CE':
      deleteLast();
      display.value = expression.value || '0';
      break;
    default:
      append(value);
      display.value = formatDisplay(expression.value) || '0';
      break;
  }
}

function formatDisplay(val) {
  return val.replace(/\*/g, '×').replace(/\//g, '÷').replace(/-/g, '−');
}
</script>