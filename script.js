// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = 0;

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(name, price, button) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    saveCart();
    updateCart();

    button.innerHTML = '<i class="fas fa-check"></i> Added!';
    button.style.backgroundColor = '#4CAF50';
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
        button.style.backgroundColor = '';
    }, 1500);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity < 1) cart[index].quantity = 1;
    saveCart();
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart text-center text-gray-500 py-4">Your cart is empty</div>';
        cartTotal.textContent = 'MK 0';
        total = 0;
        return;
    }

    total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'cart-item flex justify-between items-center py-2 border-b border-gray-200';
        div.innerHTML = `
            <div class="item-name flex-1">${item.name}</div>
            <div class="flex items-center gap-2 mr-4">
                <button onclick="changeQuantity(${index}, -1)" class="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded transition">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)" class="text-white bg-green-500 hover:bg-green-600 px-2 py-1 rounded transition">+</button>
            </div>
            <div class="item-price text-purple-600 font-semibold">MK ${(item.price * item.quantity).toFixed(2)}</div>
            <button onclick="removeFromCart(${index})" class="text-white bg-gray-500 hover:bg-gray-600 px-2 py-1 rounded transition ml-2">Remove</button>
        `;
        cartItems.appendChild(div);
    });

    cartTotal.textContent = `MK ${total.toFixed(2)}`;
}

updateCart();
