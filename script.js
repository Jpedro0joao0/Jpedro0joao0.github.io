let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    if (display.value.length < 20) {
        expression += num;
        updateDisplay();
    }
}

function appendOperator(operator) {
    if (expression && !isOperator(expression[expression.length - 1])) {
        expression += operator;
        updateDisplay();
    }
}

function isOperator(char) {
    return ['+', '-', '*', '/', '%'].includes(char);
}

function updateDisplay() {
    display.value = expression || '0';
}

function calculate() {
    try {
        if (expression) {
            let calcExpression = expression.replace(/×/g, '*');
            let result = eval(calcExpression);
            expression = result.toString();
            updateDisplay();
        }
    } catch (error) {
        display.value = 'Erro';
        expression = '';
        setTimeout(() => {
            display.value = '0';
        }, 1500);
    }
}

function clearDisplay() {
    expression = '';
    display.value = '0';
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendNumber('.');
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        appendOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});

updateDisplay();