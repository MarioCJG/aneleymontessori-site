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

const sections = [...document.querySelectorAll('section[id]')];
const tabs = [...document.querySelectorAll('.tabs .tab')];

const setActive = () => {
    const y = window.scrollY + 120; 
    let current = sections[0]?.id;
    for (const s of sections) {
        if (s.offsetTop <= y) current = s.id;
    }
    tabs.forEach(t => t.classList.toggle('is-active', t.getAttribute('href') === `#${current}`));
};
window.addEventListener('scroll', setActive);
// Carrusel automático
window.addEventListener('load', () => {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;

    const firstImg = gallery.querySelector('img');
    const GAP = 12;
    let STEP = (firstImg?.offsetWidth || 200) + GAP;

    let timer;
    const loop = () => {
        const max = gallery.scrollWidth - gallery.clientWidth - 1;
        if (gallery.scrollLeft >= max) gallery.scrollTo({ left: 0, behavior: 'instant' });

        gallery.scrollBy({ left: STEP, behavior: 'smooth' });
    };

    // corre cada 3s
    const start = () => (timer = setInterval(loop, 3000));
    const stop = () => clearInterval(timer);

    gallery.addEventListener('mouseenter', stop);
    gallery.addEventListener('mouseleave', start);

    window.addEventListener('resize', () => {
        STEP = (firstImg?.offsetWidth || 200) + GAP;
    });

    start();
});

// Galería horizontal 
const gallery = document.querySelector(".gallery");
if (gallery) {
    let scrollAmount = 0;
    setInterval(() => {
        gallery.scrollBy({ left: 220, behavior: "smooth" });
        scrollAmount += 220;
        if (scrollAmount >= gallery.scrollWidth - gallery.clientWidth) {
            gallery.scrollTo({ left: 0, behavior: "smooth" });
            scrollAmount = 0;
        }
    }, 3000);
}

// Modal "Nuestra Historia"
(function () {
    const openBtn = document.getElementById('btnHistoria');
    const modal = document.getElementById('historiaModal');
    if (!openBtn || !modal) return;

    const open = () => {
        modal.classList.add('is-open');
        document.body.classList.add('modal-open');
    };
    const close = () => {
        modal.classList.remove('is-open');
        document.body.classList.remove('modal-open');
    };

    openBtn.addEventListener('click', open);
    modal.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', close));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });
})();

(function () {
    function wireModal(openBtnId, modalId) {
        const openBtn = document.getElementById(openBtnId);
        const modal = document.getElementById(modalId);
        if (!openBtn || !modal) return;

        const open = () => { modal.classList.add('is-open'); document.body.classList.add('modal-open'); };
        const close = () => { modal.classList.remove('is-open'); document.body.classList.remove('modal-open'); };

        openBtn.addEventListener('click', open);
        modal.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', close));
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('is-open')) close(); });
    }

    wireModal('btnProyecto', 'proyectoModal');
})();

// ==== Galería para Talleres extra programáticos ====
(function () {
    const GALLERIES = {
        teatro: [
            "/img/talleres/teatro/teatro.jpg",
            "/img/talleres/teatro/teatro-2.jpg",
            "/img/talleres/teatro/teatro-3.jpg",
            "/img/talleres/teatro/teatro-4.jpg",
            "/img/talleres/teatro/teatro-5.jpg",
            "/img/talleres/teatro/teatro-6.jpg"
        ],
        danza: [
            "/img/talleres/danza/danza.jpg",
            "/img/talleres/danza/danza-2.jpg",
            "/img/talleres/danza/danza-3.jpg",
            "/img/talleres/danza/danza-4.jpg",
            "/img/talleres/danza/danza-5.jpg",
            "/img/talleres/danza/danza-6.jpg"
        ],
        cocina: [
            "/img/talleres/cocina/cocina.jpg",
            "/img/talleres/cocina/cocina-2.jpg",
            "/img/talleres/cocina/cocina-3.jpg",
            "/img/talleres/cocina/cocina-4.jpg",
            "/img/talleres/cocina/cocina-5.jpg",
            "/img/talleres/cocina/cocina-6.jpg"
        ],
        ilustracion: [
            "/img/talleres/ilustracion/ilustracion.jpg",
            "/img/talleres/ilustracion/ilustracion-2.jpg",
            "/img/talleres/ilustracion/ilustracion-3.jpg",
            "/img/talleres/ilustracion/ilustracion-4.jpg",
            "/img/talleres/ilustracion/ilustracion-5.jpg",
            "/img/talleres/ilustracion/ilustracion-6.jpg"
        ]
    };

    const modal = document.getElementById("galeriaModal");
    const grid = document.getElementById("galleryGrid");
    if (!modal || !grid) return;

    const open = () => { modal.classList.add("is-open"); document.body.classList.add("modal-open"); };
    const close = () => { modal.classList.remove("is-open"); document.body.classList.remove("modal-open"); };

    modal.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", close));
    document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("is-open")) close(); });

    document.addEventListener("click", ev => {
        const img = ev.target.closest("img[data-gallery]");
        if (!img) return;
        const key = img.getAttribute("data-gallery");
        const list = GALLERIES[key] || [img.src];
        grid.innerHTML = list.map(src => `<img src="${src}" alt="">`).join("");
        const titleEl = document.getElementById("galeriaTitle");
        if (titleEl) titleEl.textContent = img.alt || "Galería";
        open();
    });
})();

