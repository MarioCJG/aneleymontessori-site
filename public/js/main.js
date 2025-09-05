(function () {
    const yearEl = document.getElementById('year'); if (yearEl) yearEl.textContent = new Date().getFullYear();
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) { navToggle.addEventListener('click', () => navLinks.classList.toggle('open')); }
})();