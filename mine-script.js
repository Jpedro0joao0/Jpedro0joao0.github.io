// Nomes por categoria
const nameData = {
    warrior: {
        prefixes: ['Dragon', 'Shadow', 'Storm', 'Blade', 'Thunder', 'Iron', 'Stone', 'Fire', 'Dark', 'Crimson'],
        middles: ['Slayer', 'Breaker', 'Killer', 'Master', 'Destroyer', 'Hunter', 'Warrior', 'Lord', 'Knight', 'Ranger'],
        suffixes: ['Pro', 'King', 'Legend', 'Hero', 'Elite', 'Alpha', 'Prime', 'Titan', 'Beast', 'Reaper']
    },
    builder: {
        prefixes: ['Block', 'Crystal', 'Timber', 'Stone', 'Gold', 'Diamond', 'Emerald', 'Pixel', 'Craft', 'Build'],
        middles: ['Master', 'Creator', 'Smith', 'Architect', 'Designer', 'Creator', 'Constructor', 'Crafter', 'Maker', 'Artist'],
        suffixes: ['Builder', 'Smith', 'Craftsman', 'Architect', 'Master', 'Pro', 'Expert', 'King', 'Genius', 'Maker']
    },
    mage: {
        prefixes: ['Mystic', 'Arcane', 'Crystal', 'Enchant', 'Magic', 'Spell', 'Potion', 'Hex', 'Curse', 'Mystical'],
        middles: ['Wizard', 'Mage', 'Sorcerer', 'Enchanter', 'Conjurer', 'Sage', 'Mystic', 'Oracle', 'Warlock', 'Invoker'],
        suffixes: ['Wizard', 'Mage', 'Sage', 'Master', 'Lord', 'King', 'Supreme', 'Eternal', 'Ancient', 'Infinite']
    },
    ranger: {
        prefixes: ['Swift', 'Arrow', 'Wind', 'Forest', 'Eagle', 'Falcon', 'Wolf', 'Shadow', 'Night', 'Silent'],
        middles: ['Archer', 'Hunter', 'Scout', 'Ranger', 'Tracker', 'Nomad', 'Wanderer', 'Explorer', 'Pathfinder', 'Traveler'],
        suffixes: ['Archer', 'Hunter', 'Scout', 'Ranger', 'Shot', 'Aim', 'Strike', 'Arrow', 'Bow', 'Master']
    },
    miner: {
        prefixes: ['Deep', 'Dark', 'Coal', 'Iron', 'Diamond', 'Emerald', 'Gold', 'Cave', 'Stone', 'Rock'],
        middles: ['Digger', 'Miner', 'Excavator', 'Explorer', 'Delver', 'Driller', 'Extractor', 'Collector', 'Gatherer', 'Quarry'],
        suffixes: ['Miner', 'Digger', 'Pick', 'Excavator', 'Master', 'Pro', 'King', 'Legend', 'Ore', 'Gem']
    }
};

let currentCategory = 'warrior';

function selectCategory(category) {
    currentCategory = category;
    
    // Remover active de todos os botões
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Adicionar active ao botão clicado
    event.target.classList.add('active');
    
    generateName();
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateName() {
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeUnderscores = document.getElementById('include-underscores').checked;
    
    const data = nameData[currentCategory];
    
    let name = '';
    const rand = Math.random();
    
    if (rand < 0.33) {
        // Formato: Prefix + Middle + Suffix
        name = getRandomElement(data.prefixes) + 
               getRandomElement(data.middles) + 
               getRandomElement(data.suffixes);
    } else if (rand < 0.66) {
        // Formato: Prefix + Suffix
        name = getRandomElement(data.prefixes) + getRandomElement(data.suffixes);
    } else {
        // Formato: Middle + Suffix
        name = getRandomElement(data.middles) + getRandomElement(data.suffixes);
    }
    
    // Adicionar números aleatórios
    if (includeNumbers && Math.random() > 0.5) {
        const randomNum = Math.floor(Math.random() * 1000);
        name += randomNum;
    }
    
    // Adicionar underscores
    if (includeUnderscores && Math.random() > 0.6) {
        const randomNum = Math.floor(Math.random() * 100);
        name = name + '_' + randomNum;
    }
    
    // Capitalizar primeira letra
    name = name.charAt(0).toUpperCase() + name.slice(1);
    
    document.getElementById('generated-name').textContent = name;
    generateSuggestions();
}

function generateSuggestions() {
    const suggestionsList = document.getElementById('suggestions-list');
    suggestionsList.innerHTML = '';
    
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeUnderscores = document.getElementById('include-underscores').checked;
    
    const suggestions = new Set();
    
    // Gerar 6 sugestões únicas
    while (suggestions.size < 6) {
        const data = nameData[currentCategory];
        let name = '';
        
        const rand = Math.random();
        if (rand < 0.33) {
            name = getRandomElement(data.prefixes) + 
                   getRandomElement(data.middles) + 
                   getRandomElement(data.suffixes);
        } else if (rand < 0.66) {
            name = getRandomElement(data.prefixes) + getRandomElement(data.suffixes);
        } else {
            name = getRandomElement(data.middles) + getRandomElement(data.suffixes);
        }
        
        if (includeNumbers && Math.random() > 0.5) {
            const randomNum = Math.floor(Math.random() * 1000);
            name += randomNum;
        }
        
        if (includeUnderscores && Math.random() > 0.6) {
            const randomNum = Math.floor(Math.random() * 100);
            name = name + '_' + randomNum;
        }
        
        name = name.charAt(0).toUpperCase() + name.slice(1);
        suggestions.add(name);
    }
    
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.textContent = suggestion;
        div.onclick = () => {
            document.getElementById('generated-name').textContent = suggestion;
            copyName();
        };
        suggestionsList.appendChild(div);
    });
}

function copyName() {
    const name = document.getElementById('generated-name').textContent;
    navigator.clipboard.writeText(name).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✅ Copiado!';
        
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

// Gerar nome inicial ao carregar a página
window.addEventListener('load', () => {
    generateName();
});
