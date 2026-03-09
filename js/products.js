// Products Data Array
const products = [
    // --- MEN'S GEAR ---
    {
        id: "m_j1",
        name: "Summit Jacket",
        price: 4999,
        image: "../assets/MenProducts/JacketsVests/Jacket1.jpg",
        category: "men",
        subCategory: "JacketsVests",
        featured: true
    },
    {
        id: "m_j2",
        name: "Hardshell Jacket",
        price: 3599,
        image: "../assets/MenProducts/JacketsVests/Jacket2.jpg",
        category: "men",
        subCategory: "JacketsVests",
    },
    {
        id: "m_f1",
        name: "Alpine Fleece",
        price: 3499,
        image: "../assets/MenProducts/Fleece/Fleece1.jpg",
        category: "men",
        subCategory: "Fleece"
    },
    {
        id: "m_b1",
        name: "Trail Pants",
        price: 3999,
        image: "../assets/MenProducts/Bottoms/Bottoms1.jpg",
        category: "men",
        subCategory: "Bottoms"
    },
    {
        id: "m_ft1",
        name: "Trail Runners",
        price: 7999,
        image: "../assets/MenProducts/Footwear/Foot1.jpg",
        category: "men",
        subCategory: "Footwear",
        featured: true
    },

    // --- WOMEN'S GEAR ---
    {
        id: "w_j1",
        name: "Women's Summit Jacket",
        price: 4999,
        image: "../assets/WomenProducts/JacketsVests/Jacket1.jpg",
        category: "women",
        subCategory: "JacketsVests",
        featured: true
    },
    {
        id: "w_f1",
        name: "Women's Alpine Fleece",
        price: 3499,
        image: "../assets/WomenProducts/Fleece/Fleece1.jpg",
        category: "women",
        subCategory: "Fleece"
    },
    {
        id: "w_b1",
        name: "Women's Trail Pants",
        price: 3999,
        image: "../assets/WomenProducts/Bottoms/Bottoms1.jpg",
        category: "women",
        subCategory: "Bottoms"
    },
    {
        id: "w_ft1",
        name: "Women's Trail Runners",
        price: 7999,
        image: "../assets/WomenProducts/Footwear/Foot1.jpg",
        category: "women",
        subCategory: "Footwear",
        featured: true
    },
    
    // --- ATHLETE BUNDLES ---
    // Alex Honnold
    {
        id: "ath_ah1",
        name: "Summit Series Top",
        price: 8999,
        image: "../assets/athletes/AlexProd/Alex_top.jpg",
        category: "athlete",
        subCategory: "AlexHonnold"
    },
    {
        id: "ath_ah2",
        name: "Climbing Pants",
        price: 6999,
        image: "../assets/athletes/AlexProd/Alex_bottoms.jpeg",
        category: "athlete",
        subCategory: "AlexHonnold"
    },
    {
        id: "ath_ah3",
        name: "Approach Shoes",
        price: 12999,
        image: "../assets/athletes/AlexProd/Alex_shoes.jpg",
        category: "athlete",
        subCategory: "AlexHonnold"
    },
    
    // Kit Deslauriers
    {
        id: "ath_kd1",
        name: "Alpine Shell",
        price: 10999,
        image: "../assets/athletes/KitProd/Kit_top.jpg",
        category: "athlete",
        subCategory: "KitDeslauriers"
    },
    {
        id: "ath_kd2",
        name: "Expedition Bibs",
        price: 14999,
        image: "../assets/athletes/KitProd/Kit_bottoms.jpg",
        category: "athlete",
        subCategory: "KitDeslauriers"
    },
    {
        id: "ath_kd3",
        name: "Mountaineering Boots",
        price: 18999,
        image: "../assets/athletes/KitProd/Kit_shoes.jpg",
        category: "athlete",
        subCategory: "KitDeslauriers"
    },
    
    // Tommy Caldwell
    {
        id: "ath_tc1",
        name: "Big Wall Hoodie",
        price: 6499,
        image: "../assets/athletes/TommyProd/Tommy_top.jpg",
        category: "athlete",
        subCategory: "TommyCaldwell"
    },
    {
        id: "ath_tc2",
        name: "Rock Pants",
        price: 5999,
        image: "../assets/athletes/TommyProd/Tommy_bottoms.jpg",
        category: "athlete",
        subCategory: "TommyCaldwell"
    },
    {
        id: "ath_tc3",
        name: "TC Pro Shoes",
        price: 11999,
        image: "../assets/athletes/TommyProd/Tommy_shoes.jpg",
        category: "athlete",
        subCategory: "TommyCaldwell"
    },
    
    // Caroline Gleich
    {
        id: "ath_cg1",
        name: "Ski Jacket",
        price: 12499,
        image: "../assets/athletes/CarolineProd/Caroline_top.jpg",
        category: "athlete",
        subCategory: "CarolineGleich"
    },
    {
        id: "ath_cg2",
        name: "Ski Bibs",
        price: 13999,
        image: "../assets/athletes/CarolineProd/Caroline_bottom.jpg",
        category: "athlete",
        subCategory: "CarolineGleich"
    },
    {
        id: "ath_cg3",
        name: "Touring Boots",
        price: 24999,
        image: "../assets/athletes/CarolineProd/shoes.jpg",
        category: "athlete",
        subCategory: "CarolineGleich"
    }
];

// Reusable function to create the HTML for a single product card
function createProductCard(product) {
    const productCard = document.createElement('div');
    // Using min-w to force them into a horizontal scrolling row
    productCard.className = 'min-w-[280px] border p-4 hover:shadow-lg transition-shadow bg-white rounded-lg text-gray-900';

    productCard.innerHTML = `
        <img src="${product.image}" class="h-64 w-full object-cover rounded-md" alt="${product.name}">
        <h3 class="mt-4 font-semibold text-lg text-black">${product.name}</h3>
        <p class="text-gray-600">₹${product.price.toLocaleString('en-IN')}</p>
        <button onclick="addToCart('${product.id}')" class="mt-3 w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition">
            Add to Cart
        </button>
    `;
    return productCard;
}

// Function to render products into a specific container
function renderProducts(productList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ''; // Clear existing content

    productList.forEach(product => {
        container.appendChild(createProductCard(product));
    });
}

// Function to handle adding to cart
function addToCart(productId) {
    if (typeof isLoggedIn === 'function' && !isLoggedIn()) {
        alert("Please log in to add items to your cart.");
        window.location.href = 'login.html';
        return;
    }

    const product = products.find(p => p.id === productId);
    if (product) {
        // Use auth.js function to get current username
        const username = getCurrentUser();
        const cartKey = `cart_${username}`;
        
        // Retrieve existing cart or create empty array
        let userCart = JSON.parse(localStorage.getItem(cartKey)) || [];
        
        // Check if item already exists in cart, increment quantity if so
        const existingItem = userCart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            userCart.push({ ...product, quantity: 1 });
        }
        
        // Save back to local storage
        localStorage.setItem(cartKey, JSON.stringify(userCart));
        if (typeof showToast === 'function') {
            showToast(`${product.name} added to cart!`);
        } else {
            alert(`${product.name} added to your cart!`);
        }
    }
}

// Function to handle global filtering and sorting for Men's/Women's pages
function renderFilteredGrid(pageCategory) {
    const container = document.getElementById('unified-products-container');
    const noProductsMsg = document.getElementById('no-products-msg');
    if (!container) return;

    // 1. Read Filter State
    const showJackets = document.getElementById('filter-jackets')?.checked;
    const showFleece = document.getElementById('filter-fleece')?.checked;
    const showBottoms = document.getElementById('filter-bottoms')?.checked;
    const showFootwear = document.getElementById('filter-footwear')?.checked;

    // 2. Read Sort State
    const sortOrder = document.getElementById('price-sort')?.value || 'asc';

    // 3. Filter the global array
    let filteredProducts = products.filter(p => {
        // Must match the page category (men/women)
        if (p.category !== pageCategory) return false;

        // Must match at least one checked subCategory
        if (p.subCategory === 'JacketsVests' && showJackets) return true;
        if (p.subCategory === 'Fleece' && showFleece) return true;
        if (p.subCategory === 'Bottoms' && showBottoms) return true;
        if (p.subCategory === 'Footwear' && showFootwear) return true;

        return false;
    });

    // 4. Sort the filtered array
    filteredProducts.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });

    // 5. Render
    container.innerHTML = ''; // Clear container

    if (filteredProducts.length === 0) {
        if (noProductsMsg) noProductsMsg.classList.remove('hidden');
    } else {
        if (noProductsMsg) noProductsMsg.classList.add('hidden');
        filteredProducts.forEach(product => {
            const card = createProductCard(product);
            // remove horizontal scrolling constraints for grid
            card.classList.remove('min-w-[280px]'); 
            container.appendChild(card);
        });
    }
}

// Function to attach event listeners to filters for dynamic updating
function setupFilterListeners(pageCategory) {
    const filters = ['filter-jackets', 'filter-fleece', 'filter-bottoms', 'filter-footwear'];
    filters.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', () => renderFilteredGrid(pageCategory));
        }
    });

    const sortSelect = document.getElementById('price-sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => renderFilteredGrid(pageCategory));
    }
}

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    // --- HOME PAGE (Featured Gear) ---
    if (path.includes('index.html') || path.endsWith('/')) {
        const featuredContainer = document.getElementById('featured-products-container');
        if (featuredContainer) {
            featuredContainer.innerHTML = '';
            // For the homepage, we use the grid, so we just add the 4 featured items once
            const featuredProducts = products.filter(p => p.featured);
            featuredProducts.forEach(product => {
                const card = createProductCard(product);
                // remove the min-width constraint for the grid layout
                card.classList.remove('min-w-[280px]');
                featuredContainer.appendChild(card);
            });
        }
    }

    // --- MEN'S PAGE ---
    else if (path.includes('/men.html')) {
        setupFilterListeners('men');
        renderFilteredGrid('men');
    }

    // --- WOMEN'S PAGE ---
    else if (path.includes('/women.html')) {
        setupFilterListeners('women');
        renderFilteredGrid('women');
    }
});
