// ===== CONVERSOR DE MOEDAS =====

// Taxas de câmbio simuladas (em produção usar API real)
const exchangeRates = {
    'USD': 1,
    'EUR': 0.92,
    'GBP': 0.79,
    'JPY': 149.50,
    'AUD': 1.53,
    'CAD': 1.36,
    'CHF': 0.88,
    'CNY': 7.24,
    'INR': 83.12,
    'MXN': 17.05
};

function updateConversion() {
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    
    if (amount === 0) {
        document.getElementById('result').value = '0';
        return;
    }
    
    // Converter para USD primeiro, depois para a moeda destino
    const amountInUSD = amount / exchangeRates[fromCurrency];
    const result = amountInUSD * exchangeRates[toCurrency];
    
    document.getElementById('result').value = result.toFixed(2);
    
    // Atualizar taxa de câmbio
    const rate = (exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4);
    document.getElementById('exchange-rate').textContent = 
        `1 ${fromCurrency} = ${rate} ${toCurrency}`;
}

function swapCurrencies() {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    
    updateConversion();
}

function copyResult() {
    const result = document.getElementById('result');
    if (result.value) {
        navigator.clipboard.writeText(result.value);
        alert('✅ Valor copiado: ' + result.value);
    }
}

document.getElementById('amount').addEventListener('input', updateConversion);

// ===== CALCULADORA =====

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

// ===== TABS =====

function switchTab(tabName) {
    // Ocultar todas as abas
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    // Remover active de todos os botões
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Mostrar aba selecionada
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Eventos de teclado para calculadora
document.addEventListener('keydown', (e) => {
    // Só processar se a aba da calculadora estiver visível
    if (document.getElementById('calculator').classList.contains('active')) {
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
    }
});

// Inicializar display
updateDisplay();
updateConversion();
