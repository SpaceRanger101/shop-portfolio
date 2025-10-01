let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

function loadCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="text-gray-500 text-center">Your cart is empty</p>`;
  } else {
    cart.forEach((item, index) => {
      total += item.price;
      cartItemsContainer.innerHTML += `
        <div class="bg-white shadow rounded p-4 flex justify-between items-center">
          <span>${item.name}</span>
          <span>MK ${item.price}</span>
          <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>
        </div>
      `;
    });
  }

  cartTotal.innerText = `MK ${total}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

window.onload = loadCart;
