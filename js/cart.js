// js/cart.js

document.addEventListener('DOMContentLoaded', () => {
    // Only run on cart page
    if (!window.location.pathname.includes('cart.html')) return;

    renderCart();

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
});

function getCartKey() {
    // Get the current user from auth.js, default to guest
    const username = typeof getCurrentUser === 'function' ? getCurrentUser() : 'guest';
    return `cart_${username}`;
}

function getCartData() {
    const key = getCartKey();
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveCartData(cart) {
    const key = getCartKey();
    localStorage.setItem(key, JSON.stringify(cart));
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('summary-subtotal');
    const taxEl = document.getElementById('summary-tax');
    const totalEl = document.getElementById('summary-total');
    
    if (!container || !subtotalEl || !taxEl || !totalEl) return;

    const username = typeof getCurrentUser === 'function' ? getCurrentUser() : 'guest';
    
    // If user is not logged in, show login prompt instead
    if (username === 'guest') {
        container.innerHTML = `
            <div class="text-center py-12 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h2 class="text-xl font-bold mb-2">Your cart is empty</h2>
                <p class="text-gray-500 dark:text-gray-400 mb-6">Please log in to view and add items to your cart.</p>
                <a href="login.html" class="inline-block bg-black dark:bg-white text-white dark:text-black font-medium py-3 px-8 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition">
                    Sign In to Continue
                </a>
            </div>
        `;
        // Reset summary
        subtotalEl.innerText = '₹0';
        taxEl.innerText = '₹0';
        totalEl.innerText = '₹0';
        return;
    }

    const cart = getCartData();

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h2 class="text-xl font-bold mb-2">Your cart is empty!</h2>
                <p class="text-gray-500 dark:text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
                <a href="index.html" class="inline-block bg-black dark:bg-white text-white dark:text-black font-medium py-3 px-8 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition">
                    Explore Gear
                </a>
            </div>
        `;
        // Reset summary
        subtotalEl.innerText = '₹0';
        taxEl.innerText = '₹0';
        totalEl.innerText = '₹0';
        return;
    }

    // Render items
    container.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += (item.price * item.quantity);
        
        const itemEl = document.createElement('div');
        itemEl.className = 'flex gap-6 border dark:border-gray-700 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm relative';
        
        itemEl.innerHTML = `
            <button onclick="removeFromCart('${item.id}')" class="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
            <div class="w-32 h-32 bg-gray-100 dark:bg-gray-700 flex-shrink-0 rounded-md overflow-hidden">
                <img src="${item.image}" class="w-full h-full object-cover">
            </div>
            <div class="flex-grow flex flex-col justify-between pt-1">
                <div class="pr-8">
                    <h3 class="font-semibold text-lg text-black dark:text-white">${item.name}</h3>
                    <p class="text-gray-500 dark:text-gray-400 text-sm">Item ID: ${item.id} | ${item.category || 'Gear'}</p>
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center border dark:border-gray-600 rounded">
                        <button onclick="updateQuantity('${item.id}', -1)" class="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition">-</button>
                        <span class="px-3 py-1 font-medium text-black dark:text-white">${item.quantity}</span>
                        <button onclick="updateQuantity('${item.id}', 1)" class="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition">+</button>
                    </div>
                    <p class="font-bold text-black dark:text-white">₹${(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
            </div>
        `;
        container.appendChild(itemEl);
    });

    // Update Summary
    const taxRate = 0.18; // 18% tax
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    subtotalEl.innerText = `₹${subtotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    taxEl.innerText = `₹${tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    totalEl.innerText = `₹${total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
}

// Attached to window to be accessible from inline onClick handlers in HTML
window.updateQuantity = function(productId, change) {
    let cart = getCartData();
    const itemIndex = cart.findIndex(p => p.id === productId);
    
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        
        // Remove item if quantity drops to 0
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        saveCartData(cart);
        renderCart(); // Re-render the UI
    }
};

window.removeFromCart = function(productId) {
    let cart = getCartData();
    cart = cart.filter(p => p.id !== productId);
    saveCartData(cart);
    renderCart(); // Re-render the UI
};

function handleCheckout() {
    const cart = getCartData();
    if (cart.length === 0) {
        if (typeof showToast === 'function') {
            showToast("Your cart is empty!");
        } else {
            alert("Your cart is empty!");
        }
        return;
    }
    
    // Clear the cart
    saveCartData([]);
    renderCart(); // Re-render the UI
    
    // Show success message and redirect
    if (typeof showToast === 'function') {
        showToast("Order placed successfully! Redirecting...");
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        alert("Order placed successfully! Redirecting...");
        window.location.href = 'index.html';
    }
}
