// main.js
// Scroll suave para links con #
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id.length > 1) {
            e.preventDefault();
            document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.replaceState(null, '', id);
        }
    });
});

// Resalta la pestaña activa segun scroll
const sections = [...document.querySelectorAll('section[id]')];
const tabs = [...document.querySelectorAll('.tabs .tab')];

const setActive = () => {
    const y = window.scrollY + 120; // compensar header fijo
    let current = sections[0]?.id;
    for (const s of sections) {
        if (s.offsetTop <= y) current = s.id;
    }
    tabs.forEach(t => t.classList.toggle('is-active', t.getAttribute('href') === `#${current}`));
};
window.addEventListener('scroll', setActive);
window.addEventListener('load', setActive);

// Galería horizontal (scroll por rueda)
document.querySelectorAll('.gallery').forEach(g => {
    g.addEventListener('wheel', e => {
        e.preventDefault();
        g.scrollLeft += e.deltaY;
    }, { passive: false });
});
