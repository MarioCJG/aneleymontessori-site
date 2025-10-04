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

// ==== Carrusel del HERO con autoplay + flechas ====
(function () {
    const hero = document.querySelector('#hero');
    if (!hero) return;

    const track = hero.querySelector('.hero__slides');
    const slides = [...hero.querySelectorAll('.hero__slides img')];
    const prevBtn = hero.querySelector('.hero__arrow--prev');
    const nextBtn = hero.querySelector('.hero__arrow--next');

    if (!track || slides.length === 0) return;

    let index = 0;
    const total = slides.length;
    const INTERVAL_MS = 5000;

    const goTo = (i) => {
        index = (i + total) % total;
        track.style.transform = `translateX(${index * -100}%)`;
    };

    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    let timer = setInterval(next, INTERVAL_MS);
    const resetAutoplay = () => {
        clearInterval(timer);
        timer = setInterval(next, INTERVAL_MS);
    };

    nextBtn?.addEventListener('click', () => { next(); resetAutoplay(); });
    prevBtn?.addEventListener('click', () => { prev(); resetAutoplay(); });

    hero.addEventListener('mouseenter', () => clearInterval(timer));
    hero.addEventListener('mouseleave', resetAutoplay);

    goTo(0);
})();





// === ACORDEÓN VIDA ESCOLAR - TEXTO DEBAJO DEL CÍRCULO ===
(function() {
    const chipItems = document.querySelectorAll('.chip-item');
    
    if (chipItems.length === 0) return;
    
    chipItems.forEach(chip => {
        chip.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const contenido = document.getElementById(targetId);
            
            if (!contenido) return;
            
            const isActive = this.classList.contains('activo');
            
            // Cerrar todos
            chipItems.forEach(item => item.classList.remove('activo'));
            document.querySelectorAll('.chip-btn').forEach(btn => btn.classList.remove('activo'));
            document.querySelectorAll('.contenido-item').forEach(cont => cont.classList.remove('activo'));
            
            // Abrir el clickeado (si no estaba activo)
            if (!isActive) {
                this.classList.add('activo');
                this.querySelector('.chip-btn').classList.add('activo');
                contenido.classList.add('activo');
                
                // Scroll suave al contenido
                setTimeout(() => {
                    contenido.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest',
                        inline: 'nearest'
                    });
                }, 300);
            }
        });
    });
    
    console.log('✅ Acordeón con texto debajo del círculo configurado');
})();



// ==== Modales para Talleres Escuela Libre ====
(function () {
    function wireModal(openBtnId, modalId) {
        const openBtn = document.getElementById(openBtnId);
        const modal = document.getElementById(modalId);
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
    }

    // Conectar modales de talleres
    wireModal('btnTaller1', 'taller1Modal');
    wireModal('btnTaller2', 'taller2Modal');
    wireModal('btnTaller3', 'taller3Modal');
})();




document.addEventListener('DOMContentLoaded', function() {
    const chipItems = document.querySelectorAll('.chip-item');
    const cartaContenedor = document.querySelector('.carta-contenedor');
    
    // Definir todos los contenidos directamente en el JS
    const contenidos = {
        'educacion-cosmica': {
            titulo: 'Educación cósmica',
            imagen: '/img/escuela/vida-educacion-cosmica.jpg',
            contenido: `<p>La Dra. Montessori generosamente nos ofrece entre muchas otras áreas, la educación cósmica. Es el eje central del quehacer de Taller, permite a los niños explorar el universo y su interconexión. A través de 5 grandes lecciones, experiencias sensoriales, se fomenta la curiosidad y la responsabilidad hacia el mundo, conciencia del mundo que habitamos, integrando disciplinas como biología, geografía e historia. Este enfoque les ayuda a comprender su lugar en el cosmos y a convertirse en ciudadanos responsables y comprometidos.</p>`
        },
        'escuela-padres': {
            titulo: 'Escuela para padres',
            imagen: '/img/escuela/vida-escuela-padres.jpg',
            contenido: `<p>La Escuela para Padres y Madres  es un espacio donde las familias se reúnen para compartir y aprender sobre temas que apoyan el desarrollo humano del niño/a. En cada sesión, nuestras guías aportan información relevante sobre el desarrollo de los niños, brindando herramientas prácticas y estrategias alineadas con la filosofía Montessori.</p>
                <p>Hemos desarrollado esta una nueva forma de hacer reuniones familiares, aprendiendo de otros/as padres y madres, abordando temas como comunicación efectiva, disciplina positiva y la importancia del juego.</p>`
        },
        'campamento': {
            titulo: 'Campamento',
            imagen: '/img/escuela/vida-campamento.jpg',
            contenido: `<p>El Campamento es para niños de 1° a 6° básico, instancia que permite participar de acampadas en entornos naturales, donde los niños aprenden a resolver conflictos, trabajar en equipo y desarrollar habilidades prácticas. A través de actividades al aire libre, cultivamos un sentido de responsabilidad hacia el medio ambiente y promovemos la observación y el respeto por la naturaleza.</p>
                <p>Mientras que el grupo mayor, participa y trabaja para la gira, la experiencia incluye un viaje interregional que permite a los jóvenes explorar nuevas culturas y paisajes. Enfrentan desafíos que fomentan la autonomía, la resolución de conflictos y el trabajo colaborativo, fortaleciendo así su capacidad para tomar decisiones informadas.</p>
                <p>Ambas actividades están fundamentadas en los principios montessorianos, enriqueciendo el aprendizaje y el desarrollo personal de nuestros estudiantes, preparándolos para convertirse en ciudadanos responsables y conscientes.</p>`
        },
        'salidas': {
            titulo: 'Salidas pedagógicas',
            imagen: '/img/escuela/vida-salidas.jpg',
            contenido: `<p>Las salidas pedagógicas son una parte fundamental del quehacer diario en nuestra escuela Montessori. Estas experiencias son autogestionadas por los niños, quienes eligen destinos y actividades basadas en sus intereses y en la construcción de sus aprendizajes.</p>
                <p>Realizamos salidas con frecuencia, integrando esta práctica en todos los niveles educativos. En los niveles mayores, promovemos el uso del transporte público, fomentando la independencia y la responsabilidad en los estudiantes. Estas experiencias enriquecen el aprendizaje, conectando a los niños con el mundo que les rodea y fortaleciendo su curiosidad y habilidades sociales.</p>`
        },
        'galas': {
            titulo: 'Galas artísticas',
            imagen: '/img/escuela/vida-galas.jpg',
            contenido: `<p>Las galas artísticas  son momentos especiales donde nuestros estudiantes pueden mostrar sus talentos y creatividad. Durante el semestre, los niños y jóvenes desarrollan diversas expresiones artísticas, incluyendo danza, teatro y música, como parte de su aprendizaje integral.</p>
                <p>Estos eventos representan el esfuerzo y la dedicación de nuestros estudiantes, y la comunidad escolar se une con el mayor profesionalismo para apoyar y celebrar sus logros. Las galas no solo son una plataforma para que los alumnos se expresen, sino también una oportunidad para fortalecer los lazos comunitarios y fomentar la apreciación por el arte en todas sus formas.</p>
                <p>Estamos orgullosos de ofrecer un espacio donde cada niño y joven puede brillar y compartir su pasión con el mundo.</p>`
        }
    };
    
    chipItems.forEach(chip => {
        chip.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Remover activo de todos los chips
            chipItems.forEach(c => {
                c.querySelector('.chip-btn').classList.remove('activo');
            });
            
            // Agregar activo al chip clickeado
            this.querySelector('.chip-btn').classList.add('activo');
            
            // Mostrar contenido en la carta
            mostrarCarta(target);
        });
    });
    
    function mostrarCarta(target) {
        const contenido = contenidos[target];
        
        cartaContenedor.innerHTML = `
            <div class="carta-item activo">
                <div class="carta-circulo">
                    <img src="${contenido.imagen}" alt="${contenido.titulo}" />
                </div>
                <h3 class="carta-titulo">${contenido.titulo}</h3>
                <div class="carta-contenido">
                    ${contenido.contenido}
                </div>
            </div>
        `;
    }
    
    // Activar el primer chip por defecto
    if (chipItems.length > 0) {
        chipItems[0].querySelector('.chip-btn').classList.add('activo');
        mostrarCarta(chipItems[0].getAttribute('data-target'));
    }
});






// NAVBAR RESPONSIVE HAMBURGUESA
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.tabs');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en enlaces (útil para one-page)
        const tabs = mainNav.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }
});




document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href*="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Evita el comportamiento por defecto del enlace
            const targetId = this.getAttribute('href').substring(1); // Obtiene el ID del objetivo
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Realiza el desplazamiento suave
                targetElement.scrollIntoView({ behavior: 'smooth' });
                
                // Reemplaza la URL en el historial sin el hash
                window.history.replaceState(null, null, window.location.pathname + window.location.search);
            }
        });
    });
});