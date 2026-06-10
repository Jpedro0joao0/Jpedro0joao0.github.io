// ===== TEMA SYSTEM =====

const themes = {
    'purple-dark': { class: '', rgb: '168, 85, 247' },
    'blue-dark': { class: 'blue-theme', rgb: '59, 130, 246' },
    'cyan-dark': { class: 'cyan-theme', rgb: '6, 182, 212' },
    'pink-dark': { class: 'pink-theme', rgb: '236, 72, 153' },
    'green-dark': { class: 'green-theme', rgb: '16, 185, 129' },
    'orange-dark': { class: 'orange-theme', rgb: '249, 115, 22' }
};

function switchTheme(themeName) {
    const theme = themes[themeName];
    
    // Remove all theme classes
    Object.values(themes).forEach(t => {
        if (t.class) document.body.classList.remove(t.class);
    });
    
    // Add new theme class
    if (theme.class) {
        document.body.classList.add(theme.class);
    }
    
    // Set CSS variable for RGB
    document.documentElement.style.setProperty('--primary-rgb', theme.rgb);
    
    // Save preference
    localStorage.setItem('selectedTheme', themeName);
}

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selectedTheme') || 'purple-dark';
    document.getElementById('theme-select').value = savedTheme;
    switchTheme(savedTheme);
});

// ===== CONVERSOR DE MOEDAS =====

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
    
    const amountInUSD = amount / exchangeRates[fromCurrency];
    const result = amountInUSD * exchangeRates[toCurrency];
    
    document.getElementById('result').value = result.toFixed(2);
    
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

document.getElementById('amount')?.addEventListener('input', updateConversion);

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

// ===== MINECRAFT NAME GENERATOR =====

const minecraftNames = {
    warrior: {
        prefixes: ['Dragon', 'Shadow', 'Blade', 'Dark', 'Iron', 'Storm', 'Battle', 'Fire'],
        suffixes: ['Slayer', 'Killer', 'Master', 'Breaker', 'Crusher', 'Bane', 'Hunter', 'Knight']
    },
    builder: {
        prefixes: ['Build', 'Craft', 'Stone', 'Wood', 'Brick', 'Master', 'Grand', 'Epic'],
        suffixes: ['Architect', 'Engineer', 'Smith', 'Maker', 'Constructor', 'Artist', 'Creator', 'Pro']
    },
    mage: {
        prefixes: ['Mystic', 'Spell', 'Wizard', 'Magic', 'Arcane', 'Enchant', 'Cosmic', 'Void'],
        suffixes: ['Mage', 'Wizard', 'Caster', 'Sorcerer', 'Warlock', 'Enchanter', 'Master', 'Lord']
    },
    ranger: {
        prefixes: ['Arrow', 'Swift', 'Silent', 'Forest', 'Night', 'Hunter', 'Bow', 'Quick'],
        suffixes: ['Archer', 'Scout', 'Ranger', 'Hunter', 'Tracker', 'Marksman', 'Sniper', 'Master']
    },
    miner: {
        prefixes: ['Deep', 'Mine', 'Diamond', 'Gold', 'Stone', 'Ore', 'Dig', 'Drill'],
        suffixes: ['Miner', 'Digger', 'Prospector', 'Excavator', 'Specialist', 'Master', 'Expert', 'Pro']
    }
};

let currentCategory = 'warrior';
let generatedSuggestions = [];

function selectCategory(category) {
    currentCategory = category;
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    generateName();
}

function generateName() {
    const categoryData = minecraftNames[currentCategory];
    const prefix = categoryData.prefixes[Math.floor(Math.random() * categoryData.prefixes.length)];
    const suffix = categoryData.suffixes[Math.floor(Math.random() * categoryData.suffixes.length)];
    
    let name = prefix + suffix;
    
    const includeNumbers = document.getElementById('include-numbers')?.checked;
    const includeUnderscores = document.getElementById('include-underscores')?.checked;
    
    if (includeNumbers && Math.random() > 0.5) {
        name += Math.floor(Math.random() * 999);
    }
    
    if (includeUnderscores && Math.random() > 0.5) {
        const position = Math.floor(Math.random() * name.length);
        name = name.slice(0, position) + '_' + name.slice(position);
    }
    
    document.getElementById('generated-name').textContent = name;
    
    if (!generatedSuggestions.includes(name)) {
        generatedSuggestions.unshift(name);
        if (generatedSuggestions.length > 10) {
            generatedSuggestions.pop();
        }
    }
    
    updateSuggestionsList();
}

function updateSuggestionsList() {
    const suggestionsList = document.getElementById('suggestions-list');
    suggestionsList.innerHTML = '';
    
    generatedSuggestions.forEach(name => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.textContent = name;
        item.onclick = () => {
            document.getElementById('generated-name').textContent = name;
        };
        suggestionsList.appendChild(item);
    });
}

function copyName() {
    const name = document.getElementById('generated-name').textContent;
    navigator.clipboard.writeText(name);
    alert('✅ Nome copiado: ' + name);
}

// ===== RECEITAS =====

const recipes = [
    {
        name: '🍝 Macarrão à Carbonara',
        ingredients: ['Macarrão', 'Ovos', 'Bacon', 'Queijo Parmesão', 'Sal e Pimenta'],
        instructions: 'Cozinhe o macarrão, frite o bacon. Misture ovos com queijo e despeje sobre o macarrão quente com bacon. Tempere com sal e pimenta.'
    },
    {
        name: '🥞 Panquecas Simples',
        ingredients: ['Farinha de trigo', 'Ovos', 'Leite', 'Açúcar', 'Fermento em pó', 'Sal'],
        instructions: 'Misture os ingredientes secos. Bata os ovos com leite e junte à mistura. Cozinhe em fogo médio até dourar dos dois lados.'
    },
    {
        name: '🍗 Frango Assado',
        ingredients: ['Frango', 'Alho', 'Limão', 'Azeite', 'Sal', 'Pimenta'],
        instructions: 'Tempere o frango com alho, limão, sal e pimenta. Regue com azeite. Asse em forno pré-aquecido a 200°C por 40-50 minutos.'
    },
    {
        name: '🥗 Salada Mista',
        ingredients: ['Alface', 'Tomate', 'Pepino', 'Cebola roxa', 'Azeitona', 'Azeite', 'Vinagre'],
        instructions: 'Lave e pique os vegetais. Misture-os em uma tigela. Tempere com azeite, vinagre, sal e pimenta a gosto.'
    },
    {
        name: '🍳 Ovos Mexidos',
        ingredients: ['Ovos', 'Manteiga', 'Sal', 'Pimenta', 'Cebolinha (opcional)'],
        instructions: 'Derreta a manteiga em fogo médio. Bata os ovos e despeje na panela. Mexa constantemente até ficar cremoso.'
    },
    {
        name: '🍚 Arroz com Feijão',
        ingredients: ['Arroz', 'Feijão cozido', 'Cebola', 'Alho', 'Azeite', 'Sal'],
        instructions: 'Refogue cebola e alho em azeite. Adicione o arroz e o feijão. Cozinhe em fogo médio com água até ficar macio.'
    },
    {
        name: '🥕 Cenoura Refogada',
        ingredients: ['Cenoura', 'Alho', 'Azeite', 'Sal', 'Pimenta'],
        instructions: 'Corte a cenoura em tiras finas. Refogue com alho em azeite por 5-7 minutos até ficar al dente.'
    },
    {
        name: '🍜 Sopa de Legumes',
        ingredients: ['Cenoura', 'Batata', 'Cebola', 'Abóbora', 'Caldo de carne', 'Sal'],
        instructions: 'Pique os legumes. Cozinhe em caldo quente por 20 minutos até ficarem macios. Tempere a gosto.'
    }
];

function getRandomRecipe() {
    const recipe = recipes[Math.floor(Math.random() * recipes.length)];
    
    let ingredientsList = recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');
    
    const recipeHTML = `
        <h2>${recipe.name}</h2>
        <div class="recipe-ingredients">
            <h3>📋 Ingredientes:</h3>
            <ul>${ingredientsList}</ul>
        </div>
        <p><strong>Modo de Preparo:</strong></p>
        <p>${recipe.instructions}</p>
    `;
    
    document.getElementById('recipe-display').innerHTML = recipeHTML;
}

// ===== PIADAS =====

const jokes = [
    {
        setup: 'Por que o livro de matemática se suicidou?',
        punchline: 'Porque tinha muitos problemas! 😂'
    },
    {
        setup: 'O que o zero falou para o oito?',
        punchline: 'Que cinturão legal! 🎀'
    },
    {
        setup: 'Por que a galinha atravessou a rua?',
        punchline: 'Para chegar do outro lado! 🐔'
    },
    {
        setup: 'Qual é o comedor de fruta favorito do computador?',
        punchline: 'Maçã! 🍎'
    },
    {
        setup: 'O que um acento agudo falou para um acento circunflexo?',
        punchline: 'Sai do meu chapéu! 🎩'
    },
    {
        setup: 'Por que a bactéria morreu?',
        punchline: 'Porque ficou sem cultura! 🧬'
    },
    {
        setup: 'Como chama um urso sem dentes?',
        punchline: 'Bala de goma! 🐻'
    },
    {
        setup: 'O que o cinto falou para a calça?',
        punchline: 'Me dá um abraço, tá caindo tudo! 👖'
    },
    {
        setup: 'Por que o tomate ficou vermelho?',
        punchline: 'Porque viu a salada nua! 🍅'
    },
    {
        setup: 'O que a zebra falou para o leão?',
        punchline: 'Você está com fome ou é só inveja? 🦓'
    }
];

function getRandomJoke() {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    
    const jokeHTML = `
        <h2>${joke.setup}</h2>
        <p style="margin-top: 20px; font-size: 1.1rem; color: #fff;">${joke.punchline}</p>
    `;
    
    document.getElementById('joke-display').innerHTML = jokeHTML;
}

// ===== TABS =====

function switchTab(tabName) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// ===== KEYBOARD EVENTS FOR CALCULATOR =====

document.addEventListener('keydown', (e) => {
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

// ===== INITIALIZE =====

if (display) {
    updateDisplay();
    updateConversion();
}
