document.addEventListener('DOMContentLoaded', () => {
    // --- PRODUCT DATA (Prices converted to INR) ---
    const products = [
        // Electronics
        { id: 1, name: "Smartphone", price: 55920, category: "Electronics", image: "product_assets/electronics1.jpg" },
        { id: 2, name: "Laptop", price: 103920, category: "Electronics", image: "product_assets/electronics2.jpg" },
        { id: 3, name: "Wireless Headphones", price: 15920, category: "Electronics", image: "product_assets/electronics3.jpg" },
        { id: 4, name: "Smart Watch", price: 19920, category: "Electronics", image: "product_assets/electronics4.jpg" },
        { id: 5, name: "Gaming Mouse", price: 6000, category: "Electronics", image: "product_assets/electronics5.jpg" },

        // Clothing
        { id: 6, name: "Graphic T-Shirt", price: 2000, category: "Clothing", image: "product_assets/clothing1.jpg" },
        { id: 7, name: "Denim Jeans", price: 6400, category: "Clothing", image: "product_assets/clothing2.jpg" },
        { id: 8, name: "Comfort Hoodie", price: 4800, category: "Clothing", image: "product_assets/clothing3.jpg" },
        { id: 9, name: "Running Shoes", price: 9600, category: "Clothing", image: "product_assets/clothing4.jpg" },
        { id: 10, name: "Formal Shirt", price: 4000, category: "Clothing", image: "product_assets/clothing5.jpg" },
        
        // Accessories
        { id: 11, name: "Leather Backpack", price: 12000, category: "Accessories", image: "product_assets/accessory1.jpg" },
        { id: 12, name: "Classic Watch", price: 28000, category: "Accessories", image: "product_assets/accessory2.jpg" },
        { id: 13, name: "Sunglasses", price: 7200, category: "Accessories", image: "product_assets/accessory3.jpg" },
        { id: 14, name: "Leather Wallet", price: 3600, category: "Accessories", image: "product_assets/accessory4.jpg" },
        { id: 15, name: "Woven Belt", price: 2800, category: "Accessories", image: "product_assets/accessory5.jpg" },

        // Books
        { id: 16, name: "Sci-Fi Novel", price: 1200, category: "Books", image: "product_assets/book1.jpg" },
        { id: 17, name: "History of the World", price: 2400, category: "Books", image: "product_assets/book2.jpg" },
        { id: 18, name: "Programming Guide", price: 3200, category: "Books", image: "product_assets/book3.jpg" },
        { id: 19, name: "Mystery Thriller", price: 1440, category: "Books", image: "product_assets/book4.jpg" },
        { id: 20, name: "Cookbook", price: 1760, category: "Books", image: "product_assets/book5.jpg" },
    ];

    // --- DOM ELEMENTS ---
    const productGrid = document.getElementById('product-grid');
    const categoryFiltersContainer = document.getElementById('category-filters');
    const priceFilter = document.getElementById('price-filter');
    const priceValue = document.getElementById('price-value');

    let selectedCategory = 'All';
    let currentPrice = 110000; // Updated to match the new max price in HTML

    // --- FUNCTIONS ---
    const displayProducts = (filteredProducts) => {
        productGrid.innerHTML = '';
        if (filteredProducts.length === 0) {
            productGrid.innerHTML = '<p class="no-products">No products match your criteria.</p>';
            return;
        }
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            // Changed currency symbol from $ to ₹
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='product_assets/placeholder.jpg';">
                <h2>${product.name}</h2>
                <div class="price">₹${product.price.toLocaleString('en-IN')}</div>
            `;
            productGrid.appendChild(productCard);
        });
    };
    
    const setupCategoryFilters = () => {
        const categories = ['All', ...new Set(products.map(p => p.category))];
        categoryFiltersContainer.innerHTML = '';
        categories.forEach(category => {
            const button = document.createElement('button');
            button.innerText = category;
            button.dataset.category = category;
            if (category === 'All') button.classList.add('active');
            categoryFiltersContainer.appendChild(button);
        });
    };
    
    const applyFilters = () => {
        let filteredProducts = products;
        if (selectedCategory !== 'All') {
            filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
        }
        filteredProducts = filteredProducts.filter(p => p.price <= currentPrice);
        displayProducts(filteredProducts);
    };

    // --- EVENT LISTENERS ---
    categoryFiltersContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelector('#category-filters .active').classList.remove('active');
            e.target.classList.add('active');
            selectedCategory = e.target.dataset.category;
            applyFilters();
        }
    });
    
    priceFilter.addEventListener('input', (e) => {
        currentPrice = parseInt(e.target.value);
        // Format the displayed price value with commas
        priceValue.textContent = currentPrice.toLocaleString('en-IN');
        applyFilters();
    });

    // --- INITIALIZATION ---
    setupCategoryFilters();
    applyFilters();
    // Set initial price display format
    priceValue.textContent = currentPrice.toLocaleString('en-IN');
});