// 1. Wybieramy elementy z HTML
const input = document.getElementById('itemInput');
const btn = document.getElementById('addBtn');
const list = document.getElementById('shoppingList');
const resetBtn = document.getElementById('resetBtn');

// 2. Ładowanie danych z "bazy" (LocalStorage) przy starcie strony
document.addEventListener('DOMContentLoaded', () => {
    const savedItems = JSON.parse(localStorage.getItem('mojaListaZakupow')) || [];
    savedItems.forEach(item => createListItem(item.text, item.completed));
});

// 3. Obsługa dodawania nowego produktu
btn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text !== "") {
        createListItem(text, false);
        saveToStorage();
        input.value = ""; // Czyścimy pole wpisywania
        input.focus();    // Ustawiamy kursor z powrotem w polu
    }
});

// 4. Obsługa klawisza "Enter" (ułatwienie dla użytkownika)
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btn.click();
    }
});

// 5. Główna funkcja tworząca element listy
function createListItem(text, isCompleted) {
    const li = document.createElement('li');
    li.textContent = text;
    
    // Jeśli produkt był już kupiony, dodajemy klasę CSS
    if (isCompleted) {
        li.classList.add('completed');
    }

    // Kliknięcie w tekst -> zaznaczanie jako kupione (toggle)
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveToStorage();
    });

    // Tworzymy przycisk usuwania (X)
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'delete-btn';
    
    // Obsługa usuwania pojedynczego elementu
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Ważne: żeby kliknięcie w X nie zaznaczało produktu jako kupiony
        li.remove();
        saveToStorage();
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
}

// 6. Funkcja zapisu stanu listy do pamięci przeglądarki
function saveToStorage() {
    const allItems = document.querySelectorAll('li');
    const itemsArray = [];
    
    allItems.forEach(li => {
        itemsArray.push({
            text: li.firstChild.textContent, // Pobieramy tylko tekst (bez X)
            completed: li.classList.contains('completed')
        });
    });
    
    localStorage.setItem('mojaListaZakupow', JSON.stringify(itemsArray));
}

// 7. Obsługa przycisku resetu
resetBtn.addEventListener('click', () => {
    if (confirm("Czy na pewno chcesz usunąć wszystkie produkty z listy?")) {
        list.innerHTML = "";
        localStorage.removeItem('mojaListaZakupow');
    }
});