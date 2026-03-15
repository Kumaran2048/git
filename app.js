document.addEventListener('DOMContentLoaded', () => {

    // Tab switching logic
    window.switchTab = function (tabId) {
        // Hide all tabs
        const tabs = document.querySelectorAll('.tab-view');
        tabs.forEach(tab => tab.classList.remove('active'));

        // Show target tab
        const target = document.getElementById(tabId);
        if (target) target.classList.add('active');

        // Ensure menu is closed if open
        const menu = document.getElementById('side-menu');
        if (menu) menu.classList.remove('open');

        // Header behavior
        const header = document.querySelector('.app-header');
        const content = document.querySelector('.app-content');
        if (tabId === 'tab-home') {
            if (header) header.style.display = 'flex';
            if (content) content.style.height = 'calc(100% - 60px - 55px)';
        } else {
            if (header) header.style.display = 'flex';
            if (content) content.style.height = 'calc(100% - 60px - 55px)';
        }
    };

    // Toggle sliding menu
    window.toggleMenu = function () {
        const menu = document.getElementById('side-menu');
        if (menu) menu.classList.toggle('open');
    };

    // Date Time Sync
    function updateClock() {
        const now = new Date();
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

        const day = String(now.getDate()).padStart(2, '0');
        const month = months[now.getMonth()];
        const year = now.getFullYear();

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        // Update new valid ticket elements
        const dateEl = document.getElementById('ticket-datetime');
        if (dateEl) dateEl.textContent = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

    // Auth logic
    window.handleLogin = function () {
        const id = document.getElementById('login-id').value.trim();
        const pass = document.getElementById('login-pass').value.trim();

        // Exact user validation requested
        if (id === '192372048') {
            localStorage.setItem('isLoggedIn', 'true');
            document.getElementById('login-screen').style.display = 'none';
            document.querySelector('.app-header').style.visibility = 'visible';
            document.querySelector('.app-content').style.visibility = 'visible';
            document.querySelector('.bottom-nav').style.visibility = 'visible';

            // Go to home tab after successful login
            window.switchTab('tab-home');
        } else {
            alert('Invalid Staff ID / Student ID. Only 192372048 is registered currently.');
        }
    };

    window.handleLogout = function () {
        localStorage.removeItem('isLoggedIn');
        // Hide UI layout
        document.querySelector('.app-header').style.visibility = 'hidden';
        document.querySelector('.app-content').style.visibility = 'hidden';
        document.querySelector('.bottom-nav').style.visibility = 'hidden';

        // Show login screen again
        document.getElementById('login-id').value = '';
        document.getElementById('login-pass').value = '';
        document.getElementById('login-screen').style.display = 'flex';
    };

    // Initialization Flow
    function initApp() {
        // Hide standard UI elements immediately on load
        document.querySelector('.app-header').style.visibility = 'hidden';
        document.querySelector('.app-content').style.visibility = 'hidden';
        document.querySelector('.bottom-nav').style.visibility = 'hidden';

        // Show splash screen
        document.getElementById('splash-screen').style.display = 'flex';
        document.getElementById('login-screen').style.display = 'none';

        // Load persisted photo if exists
        const savedPhoto = localStorage.getItem('savedProfilePic');
        if (savedPhoto) {
            document.getElementById('profile-img-preview').src = savedPhoto;
            document.querySelector('#tab-home .profile-pic').src = savedPhoto;
        }

        // After 2.5 seconds, hide splash and either show login or app
        setTimeout(() => {
            document.getElementById('splash-screen').style.display = 'none';
            if (localStorage.getItem('isLoggedIn') === 'true') {
                document.querySelector('.app-header').style.visibility = 'visible';
                document.querySelector('.app-content').style.visibility = 'visible';
                document.querySelector('.bottom-nav').style.visibility = 'visible';
                window.switchTab('tab-home');
            } else {
                document.getElementById('login-screen').style.display = 'flex';
            }
        }, 2500);
    }

    // Start flow immediately
    initApp();

    // Start clock immediately
    setInterval(updateClock, 1000);
    updateClock();

});
