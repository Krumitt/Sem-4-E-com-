// js/auth.js

// Constant for the default logged-out user ID
const GUEST_ID = 'guest';

// Get current user ID (returns username or 'guest')
function getCurrentUser() {
    return localStorage.getItem('currentUser') || GUEST_ID;
}

// Check if user is logged in
function isLoggedIn() {
    return getCurrentUser() !== GUEST_ID;
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {

    // --- NAVBAR LOGIN/LOGOUT LOGIC ---
    // Find all links that go to login.html (typically in navbar and mobile menu)
    const loginLinks = document.querySelectorAll('a[href="login.html"]');
    
    if (isLoggedIn()) {
        const username = getCurrentUser();
        
        loginLinks.forEach(link => {
            // Change "Login" to "Logout (username)"
            link.textContent = `Logout (${username})`;
            link.href = "#"; // Prevent navigation
            
            // Add logout functionality
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // "Logout" assigns the default ID by removing the currentUser key
                localStorage.removeItem('currentUser');
                // Reload the page to reflect changes
                window.location.reload();
            });
        });
    }

    // --- LOGIN PAGE SPECIFIC LOGIC ---
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm && signupForm) {
        // Toggle forms
        document.getElementById('show-signup').addEventListener('click', () => {
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
            document.querySelector('h1').textContent = 'Create Account';
            document.querySelector('.text-gray-500.text-sm').textContent = 'Sign up to start your adventure';
        });

        document.getElementById('show-login').addEventListener('click', () => {
            signupForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
            document.querySelector('h1').textContent = 'Welcome Back';
            document.querySelector('.text-gray-500.text-sm').textContent = 'Sign in to continue your adventure';
        });

        // Initialize users array in local storage if it doesn't exist
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([]));
        }

        // Handle Signup
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('reg-username').value.trim();
            const password = document.getElementById('reg-password').value.trim();

            if (!username || !password) return;

            const users = JSON.parse(localStorage.getItem('users'));
            
            // Check if username already exists
            if (users.find(u => u.username === username)) {
                alert('Username already exists. Please choose another.');
                return;
            }

            // Save new user
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));

            // Log user in directly after signup
            localStorage.setItem('currentUser', username);
            alert('Account created successfully!');
            window.location.href = 'index.html'; 
        });

        // Handle Login
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!username || !password) return;

            const users = JSON.parse(localStorage.getItem('users'));
            
            // Verify credentials
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                // Success
                localStorage.setItem('currentUser', username);
                window.location.href = 'index.html'; 
            } else {
                alert('Invalid username or password.');
            }
        });
        
        // If they are already logged in and visit login page, redirect them home
        if (isLoggedIn()) {
            window.location.href = 'index.html';
        }
    }
});
