// Products data
const products = [
  {
    id: 1,
    name: '7 thói quen để thành đạt',
    price: 100,
    description: '7 thói quen để thành đạt',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM29wVpbWn7Pbytc2sY3EcvQF7kyu_sffLbA&s'
  },
  {
    id: 2,
    name: 'Mặc kệ thiên hạ, sống như người Nhật',
    price: 100,
    description: 'Mặc kệ thiên hạ, sống như người Nhật',
    image: 'https://salt.tikicdn.com/ts/product/5b/6b/94/a089201dc82d150004dc3d5564199049.jpg'
  },
  {
    id: 3,
    name: 'Đọc vị bất kỳ ai ',
    price: 100,
    description: 'Mặc kệ thiên hạ, sống như người Nhật',
    image: 'https://product.hstatic.net/200000900535/product/doc-vi-bat-ky-ai-dau-trien-200.000-ban-bia-1_9098c0e38c6c4795860ed24f7b490cb9.jpg'
  },
  {
    id: 4,
    name: 'Đời thay đổi khi chúng ta thay đổi',
    price: 100,
    description: 'Đời thay đổi khi chúng ta thay đổi',
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1631080681i/40221381.jpg'
  },
  {
    id: 5,
    name: 'Nhà Giả Kim',
    price: 100,
    description: 'Nhà Giả Kim',
    image: 'https://reviewsach.net/wp-content/uploads/2017/05/Sa%CC%81ch-Nha%CC%80-Gia%CC%89-Kim-reviewsach.net_.jpg'
  },
  {
    id: 6,
    name: 'Đắc nhân tâm',
    price: 100,
    description: 'Đắc nhân tâm',
    image: 'https://tiki.vn/blog/wp-content/uploads/2023/08/phan-4-dac-nhan-tam-1024x1024.jpg'
  },
];

const productDIV = document.getElementById('product-list');

// Initialize cart from localStorage
let carts = JSON.parse(localStorage.getItem('carts')) || [];

// Render products dynamically
function renderProducts() {
  productDIV.innerHTML = ''; // Clear existing products
  products.forEach(product => {
    productDIV.innerHTML += `
      <div class="card col-12 col-sm-6 col-md-4 col-lg-3 m-2">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text text-danger">$${product.price}</p>
          <p>${product.description}</p>
          <button class="btn btn-success" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;
  });
}

// Add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  
  if (!product) return;

  const existingItemIndex = carts.findIndex(item => item.id === productId);

  if (existingItemIndex > -1) {
    // Increment quantity if product exists
    carts[existingItemIndex].quantity++;
  } else {
    // Add new product to cart
    carts.push({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      quantity: 1 
    });
  }

  localStorage.setItem('carts', JSON.stringify(carts));
  
  // Use browser's built-in notification system
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      new Notification(`${product.name} added to cart!`);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(`${product.name} added to cart!`);
        }
      });
    }
  } else {
    alert(`${product.name} added to cart!`);
  }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});