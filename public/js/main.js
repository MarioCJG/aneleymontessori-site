(function () {
    const yearEl = document.getElementById('year'); if (yearEl) yearEl.textContent = new Date().getFullYear();
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const open = navLinks.classList.toggle('open');
            navToggle.classList.toggle('is-open', open);
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }
})();