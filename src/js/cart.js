const cartListElement = document.getElementById('cart-list');
const cartTotalElement = document.getElementById('cart-total');

// Load cart from localStorage
let carts = JSON.parse(localStorage.getItem('carts')) || [];

// Function to render cart items
function renderCart() {
  cartListElement.innerHTML = ''; // Clear existing items
  let totalCartPrice = 0;

  carts.forEach(item => {
    const totalPrice = item.price * item.quantity;
    totalCartPrice += totalPrice;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <input type="number" value="${item.quantity}" min="1" 
               onchange="updateQuantity(${item.id}, this.value)" 
               class="form-control form-control-sm w-75">
      </td>
      <td>$${totalPrice.toFixed(2)}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
      </td>
    `;
    cartListElement.appendChild(row);
  });

  // Update total price
  cartTotalElement.textContent = `Total: $${totalCartPrice.toFixed(2)}`;
}

// Update quantity of item in cart
function updateQuantity(productId, newQuantity) {
  const itemIndex = carts.findIndex(item => item.id === productId);
  if (itemIndex !== -1) {
    carts[itemIndex].quantity = parseInt(newQuantity);
    localStorage.setItem('carts', JSON.stringify(carts));
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  carts = carts.filter(item => item.id !== productId);
  localStorage.setItem('carts', JSON.stringify(carts));
  renderCart();
  alert("Bạn có muốn xóa sản phẩm này không?")
}

// Continue Shopping button
document.querySelector('.btn-warning').addEventListener('click', () => {
  window.location.href = 'product.html';
});

// Checkout button
document.querySelector('.btn-success').addEventListener('click', () => {
  if (carts.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Proceeding to checkout...');
  // Implement checkout logic
});

// Initial render of cart items
document.addEventListener('DOMContentLoaded', renderCart);