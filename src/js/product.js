// Products data
const products = [
  {
    id: 1,
    name: 'Nhà Giả Kim',
    price: 100,
    description: 'Nhà Giả Kim',
    image: 'https://reviewsach.net/wp-content/uploads/2017/05/Sa%CC%81ch-Nha%CC%80-Gia%CC%89-Kim-reviewsach.net_.jpg'
  },
  {
    id: 2,
    name: 'Đắc nhân tâm',
    price: 100,
    description: 'Đắc nhân tâm',
    image: 'https://tiki.vn/blog/wp-content/uploads/2023/08/phan-4-dac-nhan-tam-1024x1024.jpg'
  },
  {
    id:3,
    name: 'Nhà Giả Kim',
    price: 100,
    description: 'Nhà Giả Kim',
    image: 'https://reviewsach.net/wp-content/uploads/2017/05/Sa%CC%81ch-Nha%CC%80-Gia%CC%89-Kim-reviewsach.net_.jpg'
  },
  {
    id:4 ,
    name: 'Đắc nhân tâm',
    price: 100,
    description: 'Đắc nhân tâm',
    image: 'https://tiki.vn/blog/wp-content/uploads/2023/08/phan-4-dac-nhan-tam-1024x1024.jpg'
  },
  {
    id: 5,
    name: '7 thói quen để thành đạt',
    price: 100,
    description: '7 thói quen để thành đạt',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM29wVpbWn7Pbytc2sY3EcvQF7kyu_sffLbA&s'
  },
  {
    id: 6,
    name: 'Mặc kệ thiên hạ, sống như người Nhật',
    price: 100,
    description: 'Mặc kệ thiên hạ, sống như người Nhật',
    image: 'https://mediabbn.mediatech.vn/upload/image/202111/medium/105893_4b809e6a4e0c0e465926fbd257d6d094.jpg'
  },
  {
    id:7,
    name: 'Đọc vị bất kỳ ai',
    price: 100,
    description: 'Đọc vị bất kỳ ai',
    image: 'https://product.hstatic.net/200000900535/product/doc-vi-bat-ky-ai-dau-trien-200.000-ban-bia-1_9098c0e38c6c4795860ed24f7b490cb9.jpg'
  },
  {
    id: 8,
    name: 'Đời thay đổi khi chúng ta thay đổi',
    price: 100,
    description: 'Đời thay đổi khi chúng ta thay đổi',
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1631080681i/40221381.jpg'
  },
];

// Get references to the product list and a form for adding/editing products
const productDIV = document.getElementById('product-list');
const addEditFormHTML = `
  <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="productModalLabel">Add/Edit Product</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="productForm">
            <input type="hidden" id="productId" value="">
            <div class="mb-3">
              <label for="productName" class="form-label">Product Name</label>
              <input type="text" class="form-control" id="productName" required>
            </div>
            <div class="mb-3">
              <label for="productPrice" class="form-label">Price</label>
              <input type="number" class="form-control" id="productPrice" required>
            </div>
            <div class="mb-3">
              <label for="productDescription" class="form-label">Description</label>
              <textarea class="form-control" id="productDescription" required></textarea>
            </div>
            <div class="mb-3">
              <label for="productImage" class="form-label">Image URL</label>
              <input type="url" class="form-control" id="productImage" required>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
`;
document.body.insertAdjacentHTML('beforeend', addEditFormHTML);

// Render products dynamically
function renderProducts() {
  productDIV.innerHTML = ''; // Clear existing products
  products.forEach(product => {
    productDIV.innerHTML += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" id="product-${product.id}">
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text text-danger">$${product.price}</p>
            <p>${product.description}</p>
            <button class="btn btn-success" onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  });
}

// Add a new product
function addProduct() {
  const id = products.length ? products[products.length - 1].id + 1 : 1;
  const name = document.getElementById('productName').value;
  const price = parseFloat(document.getElementById('productPrice').value);
  const description = document.getElementById('productDescription').value;
  const image = document.getElementById('productImage').value;

  products.push({ id, name, price, description, image });
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
}

// Edit an existing product
function editProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  document.getElementById('productId').value = product.id;
  document.getElementById('productName').value = product.name;
  document.getElementById('productPrice').value = product.price;
  document.getElementById('productDescription').value = product.description;
  document.getElementById('productImage').value = product.image;

  const productModal = new bootstrap.Modal(document.getElementById('productModal'));
  productModal.show();
}

// Save changes to a product
function saveProductChanges() {
  const id = parseInt(document.getElementById('productId').value, 10);
  const name = document.getElementById('productName').value;
  const price = parseFloat(document.getElementById('productPrice').value);
  const description = document.getElementById('productDescription').value;
  const image = document.getElementById('productImage').value;

  const productIndex = products.findIndex(p => p.id === id);

  if (productIndex > -1) {
    // Update existing product
    products[productIndex] = { id, name, price, description, image };
  } else {
    // Add new product
    products.push({ id, name, price, description, image });
  }

  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
}

// Delete a product
function deleteProduct(id) {
  const confirmDelete = confirm('Are you sure you want to delete this product?');
  if (!confirmDelete) return;

  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex > -1) {
    products.splice(productIndex, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
  }
}

// Initialize form submission
document.getElementById('productForm').addEventListener('submit', event => {
  event.preventDefault();
  saveProductChanges();

  const productModal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
  productModal.hide();
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  const storedProducts = JSON.parse(localStorage.getItem('products'));
  if (storedProducts) products.splice(0, products.length, ...storedProducts);
  renderProducts();
});

const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const cartItem = cart.find(item => item.id === product.id);
  if (cartItem) {
    cartItem.quantity += 1; 
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  // Lưu giỏ hàng vào localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  alert('Product added to cart!');
}

// Redirect to cart page (Optional)
function goToCart() {
  window.location.href = 'cart.html';
}
