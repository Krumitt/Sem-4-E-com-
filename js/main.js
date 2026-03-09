// Global JavaScript

// 1. Dark Mode Persistence (Immediate Check for FOUC prevention)
// Run this immediately as the script parses so we don't wait for DOM content to load string
if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');
}

document.addEventListener('DOMContentLoaded', () => {

    // Target both desktop and mobile buttons
    const darkModeBtns = document.querySelectorAll('#dark-mode-btn, #mobile-dark-mode-btn');

    // Add listener to all buttons
    darkModeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Prevent default just in case it's an anchor tag or form submit
            e.preventDefault();
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
        });
    });

    // 2. Mobile Menu Handling (Optional: Close on clicking outside)
    const menuToggle = document.getElementById('menu-toggle');
    const header = document.querySelector('header');

    if (menuToggle && header) {
        document.addEventListener('click', (e) => {
            // Close menu if clicking outside of the header while menu is open
            if (menuToggle.checked && !header.contains(e.target)) {
                menuToggle.checked = false;
            }
        });
    }

    // 3. Search Bar Functionality
    const searchInputs = document.querySelectorAll('input[placeholder*="Search"]');

    searchInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = input.value.trim();
                
                if (query) {
                    // For now, simple alert.
                    alert(`Searching for: ${query}`);
                    
                    // Clear search input
                    input.value = '';
                    
                    // Close mobile menu if open
                    if (menuToggle) menuToggle.checked = false;
                }
            }
        });
    });

    // 4. Automatic Slideshows (Men & Women pages)
    const slides = document.querySelectorAll('input[name="hero"]');
    if (slides.length > 0) {
        let currentSlide = 0;
        
        // Function to move to the next slide
        const nextSlide = () => {
             // Uncheck current
             slides[currentSlide].checked = false;
             
             // Move to next, loop back to start if at the end
             currentSlide = (currentSlide + 1) % slides.length;
             
             // Check new
             slides[currentSlide].checked = true;
        };

        // Set interval for 2 seconds (2000 milliseconds)
        let slideInterval = setInterval(nextSlide, 2000);

        // Optional UX improvement: loop stops when user manually clicks a dot, 
        // to prevent it moving right as they are trying to look at one.
        // We restart the timer after they click.
        slides.forEach((slide, index) => {
            slide.addEventListener('change', () => {
                currentSlide = index;
                clearInterval(slideInterval);
                // Restart interval after interaction
                slideInterval = setInterval(nextSlide, 2000);
            });
        });
    }

    // 5. Global handler for static "Add to Cart" buttons (e.g., on athletes.html)
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            // Normalize text to handle HTML newlines/spaces like "Add to\n      Cart"
            const btnText = e.target.textContent.replace(/\s+/g, ' ').trim();
            
            if (btnText.includes('Add to Cart') || btnText.includes('Add To Cart')) {
                // Only fire if the button doesn't already have an explicit onclick (like the dynamic ones do)
                if (!e.target.hasAttribute('onclick')) {
                    // If not logged in, simulate the same auth check as products.js
                    if (typeof isLoggedIn === 'function' && !isLoggedIn()) {
                        alert("Please log in to add items to your cart.");
                        window.location.href = 'login.html';
                        return;
                    }
                    
                    // For static items, we don't have the exact name, so use a generic success message
                    showToast('Item added to cart!');
                }
            }
        }
    });

});

// Global Function to show a brief popup (Toast notification)
window.showToast = function(message) {
    // Check if a toast container exists, if not create one
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none';
        document.body.appendChild(toastContainer);
    }

    // Create the toast element
    const toast = document.createElement('div');
    toast.className = 'bg-black text-white px-6 py-3 rounded-md shadow-lg transform transition-all duration-300 translate-y-full opacity-0 flex items-center gap-2';
    
    // Add success icon and message
    toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span class="font-medium">${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Trigger animation to slide up and fade in
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-full', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
    });

    // Remove the toast after 1.5 seconds (giving user a bit more time to read)
    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-full', 'opacity-0');
        
        // Wait for css transition to finish before removing from DOM
        setTimeout(() => toast.remove(), 300);
    }, 1000); // 1 second display as requested
};
