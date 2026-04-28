const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

orderForm.addEventListener('submit', function(event) {
    // Zatrzymujemy domyślne odświeżanie strony przez formularz
    event.preventDefault(); 
    
    // 1. Czyścimy koszyk z localStorage
    localStorage.removeItem('cart');
    
    // 2. Chowamy formularz i pokazujemy komunikat o sukcesie
    orderForm.style.display = 'none';
    successMessage.style.display = 'block';
});