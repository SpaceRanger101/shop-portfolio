// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCheckoutCart() {
    const container = document.getElementById('checkout-cart');
    container.innerHTML = '';
    if (cart.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-4">Your cart is empty</p>';
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'flex justify-between items-center py-2 border-b border-gray-200';
        div.innerHTML = `
            <div>${item.name} (x${item.quantity})</div>
            <div class="font-semibold text-purple-600">MK ${(item.price * item.quantity).toFixed(2)}</div>
        `;
        container.appendChild(div);
    });

    const totalDiv = document.createElement('div');
    totalDiv.className = 'flex justify-between font-bold text-lg mt-4 pt-2 border-t border-gray-300';
    totalDiv.innerHTML = `<span>Total</span><span>MK ${total.toFixed(2)}</span>`;
    container.appendChild(totalDiv);
}

displayCheckoutCart();

// Handle order form submission
const form = document.getElementById('order-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Clear cart
    localStorage.removeItem('cart');
    cart = [];
    displayCheckoutCart();

    // Show thank you message
    document.getElementById('thankyou').classList.remove('hidden');
    form.reset();
});
