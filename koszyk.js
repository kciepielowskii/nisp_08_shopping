// Pobieramy elementy z HTML-a
const cartContainer = document.getElementById('cart-container');
const totalPriceElement = document.getElementById('total-price');

// 1. ODCZYT: Funkcja pobierająca koszyk z localStorage
function getCart() {
    // Odczytujemy klucz 'cart'. Jeśli jest pusty, zwracamy pustą tablicę []
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Funkcja pomocnicza do zapisywania zaktualizowanego koszyka
function saveCart(cartArray) {
    localStorage.setItem('cart', JSON.stringify(cartArray));
}

// 2. WYŚWIETLANIE: Funkcja rysująca koszyk i licząca sumę
function renderCart() {
    const cart = getCart();
    cartContainer.innerHTML = ''; // Czyścimy pojemnik przed rysowaniem
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Twój koszyk jest pusty.</p>';
    } else {
        cart.forEach((item, index) => {
            // Tworzymy element dla każdego produktu
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            
            // Zakładamy, że produkt od Studenta A ma item.name i item.price
            itemDiv.innerHTML = `
                <p><strong>${item.name}</strong> - ${item.price} zł</p>
                <button onclick="removeItem(${index})">Usuń</button>
                <hr>
            `;
            cartContainer.appendChild(itemDiv);
            
            // Dodajemy do sumy
            total += parseFloat(item.price);
        });
    }

    // Aktualizujemy sumę na stronie
    totalPriceElement.textContent = total.toFixed(2);
}

// 3. USUWANIE: Funkcja wywoływana po kliknięciu "Usuń"
function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1); // Usuwamy 1 element pod danym indeksem
    saveCart(cart); // Nadpisujemy localStorage bez usuniętego elementu
    renderCart(); // Rysujemy koszyk na nowo (żeby zniknął ze strony)
}

// Odpalamy rysowanie koszyka od razu po załadowaniu strony
renderCart();