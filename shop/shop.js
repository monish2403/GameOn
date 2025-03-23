// Data
const categories = ['All', 'Shoes', 'Jerseys', 'Equipment', 'Accessories'];
const brands = ['Nike', 'Adidas', 'Under Armour', 'Puma', 'New Balance'];
const products = [
  {
    id: 1,
    name: 'Nike Air Zoom Pegasus 38',
    price: 129.99,
    rating: 4,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
  },
  {
    id: 2,
    name: 'Professional Basketball',
    price: 29.99,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf',
  },
  {
    id: 3,
    name: 'Premium Soccer Jersey',
    price: 89.99,
    rating: 4,
    image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d',
  },
  {
    id: 4,
    name: 'Training Resistance Bands',
    price: 24.99,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc',
  },
];

// DOM Elements
const categoryButtons = document.getElementById('categoryButtons');
const brandFilters = document.getElementById('brandFilters');
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// State
let selectedCategory = 'All';
let selectedBrands = new Set();
let searchQuery = '';

// Initialize Categories
function initializeCategories() {
  categories.forEach(category => {
    const button = document.createElement('button');
    button.textContent = category;
    button.className = category === selectedCategory ? 'active' : '';
    button.addEventListener('click', () => {
      document.querySelectorAll('.category-buttons button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      selectedCategory = category;
      renderProducts();
    });
    categoryButtons.appendChild(button);
  });
}

// Initialize Brands
function initializeBrands() {
  brands.forEach(brand => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = brand;
    checkbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        selectedBrands.add(brand);
      } else {
        selectedBrands.delete(brand);
      }
      renderProducts();
    });
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(brand));
    brandFilters.appendChild(label);
  });
}

// Create Product Card
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  
  card.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-details">
      <h3 class="product-name">${product.name}</h3>
      <div class="rating">
        ${Array(5).fill('').map((_, i) => `
          <svg class="star" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${i < product.rating ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        `).join('')}
      </div>
      <div class="product-footer">
        <span class="price">$${product.price.toFixed(2)}</span>
        <div class="product-buttons">
          <button class="cart-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z"></path>
              <path d="M20 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z"></path>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
          <button class="buy-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  return card;
}

// Filter Products
function filterProducts() {
  return products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.name.includes(selectedCategory);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrands = selectedBrands.size === 0 || selectedBrands.has(product.brand);
    return matchesCategory && matchesSearch && matchesBrands;
  });
}

// Sort Products
function sortProducts(products) {
  const sortValue = sortSelect.value;
  return [...products].sort((a, b) => {
    switch (sortValue) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'best':
        return b.rating - a.rating;
      default:
        return b.id - a.id; // Newest
    }
  });
}

// Render Products
function renderProducts() {
  const filteredProducts = filterProducts();
  const sortedProducts = sortProducts(filteredProducts);
  
  productsGrid.innerHTML = '';
  sortedProducts.forEach(product => {
    productsGrid.appendChild(createProductCard(product));
  });
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderProducts();
});

sortSelect.addEventListener('change', renderProducts);

// Initialize
function initialize() {
  initializeCategories();
  initializeBrands();
  renderProducts();
}

// Start the app
initialize();