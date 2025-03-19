export default class CalculatorView {
    constructor() {
        this.displayElement = document.getElementById('display');
        this.modeTextElement = document.getElementById('mode-text');
        this.regularModeElement = document.querySelector('.regular-mode');
        this.binaryModeElement = document.querySelector('.programmer-mode');
        this.modeIconElement = document.getElementById('mode-icon');
    }

    updateDisplay(text) {
        this.displayElement.textContent = text;
    }

    updateMode(isBinary) {
        if (isBinary) {
            this.modeTextElement.textContent = 'Звичайний';
            this.regularModeElement.style.display = 'none';
            this.binaryModeElement.style.display = 'grid';
            this.modeIconElement.src = 'regular.png';
        }
        else {
            this.modeTextElement.textContent = 'Двійковий';
            this.regularModeElement.style.display = 'grid';
            this.binaryModeElement.style.display = 'none';
            this.modeIconElement.src = 'binary.png';
        }
    }
}