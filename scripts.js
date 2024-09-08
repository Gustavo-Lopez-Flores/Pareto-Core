const targetLanguageSelect = document.getElementById('target-language');
const nativeLanguageSelect = document.getElementById('native-language');
const startLearningButton = document.getElementById('start-learning');
const contentArea = document.getElementById('content-area');
const greetingsList = document.getElementById('greetings-list');
const basicPhrasesList = document.getElementById('basic-phrases-list');

startLearningButton.addEventListener('click', () => {
    const targetLanguage = targetLanguageSelect.value;
    const nativeLanguage = nativeLanguageSelect.value;

    contentArea.style.display = 'block';

    // Carregar dados do arquivo JSON
    fetch(`data/${targetLanguage}.json`)
        .then(response => response.json())
        .then(data => {
            // Processar os dados do JSON e exibir no HTML
            displayGreetings(data.greetings, nativeLanguage);
            displayBasicPhrases(data.basicPhrases, nativeLanguage);
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
        });
});

function displayGreetings(greetings, nativeLanguage) {
    greetings.forEach(greeting => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${greeting.phrase}</strong> - ${translatePhrase(greeting.phrase, nativeLanguage)}`;
        greetingsList.appendChild(listItem);
    });
}

function displayBasicPhrases(basicPhrases, nativeLanguage) {
    basicPhrases.forEach(phrase => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${phrase.phrase}</strong> - ${translatePhrase(phrase.phrase, nativeLanguage)}`;
        basicPhrasesList.appendChild(listItem);
    });
}

// Função para traduzir uma frase usando a API do Gemini
function translatePhrase(phrase, nativeLanguage) {
    const apiUrl = `https://gemini.com/translate?text=${encodeURIComponent(phrase)}&target_language=${nativeLanguage}&key=${config.geminiApiKey}`;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => data.translation)
        .catch(error => {
            console.error('Erro na tradução:', error);
            return 'Erro na tradução';
        });
}