document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const verticalNav = document.getElementById('verticalNav');
    const closeMenu = document.querySelector('.close-menu');
    const navItems = document.querySelectorAll('.vertical-nav .nav-links a');
    const loginIconBtn = document.querySelector('.login-icon-btn');
    const cuentoSections = document.querySelectorAll('.cuento-section');
    
    // --- 1. Control del Menú Lateral (Mobile/Tablet) ---
    menuToggle.addEventListener('click', () => {
        verticalNav.classList.add('open');
    });

    closeMenu.addEventListener('click', () => {
        verticalNav.classList.remove('open');
    });

    // --- 2. Navegación a las Secciones de la Página (Enlaces de Cuentos) ---
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                verticalNav.classList.remove('open');
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                navItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });


    // --- 3. Funcionalidad del Botón de Login Superior ---
    loginIconBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Funcionalidad de Iniciar Sesión o comentarios, próximamente.');
    });

    // --- 4. Resaltar enlace activo al hacer scroll (Mejora UX) ---
    const sections = document.querySelectorAll('.main-content section');
    
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; 
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current) && current !== '') {
                item.classList.add('active');
            }
        });
    });


    // --- 5. Lógica del Carrusel de Personajes ---
    
    cuentoSections.forEach(section => {
        const carouselContainer = section.querySelector('.character-carousel-container');
        if (!carouselContainer) return; // Salta si la sección no tiene carrusel

        const cards = carouselContainer.querySelectorAll('.character-card');
        const prevButton = carouselContainer.querySelector('.carousel-nav.prev');
        const nextButton = carouselContainer.querySelector('.carousel-nav.next');
        let currentIndex = 0;

        // Inicializar el carrusel
        function showCard(index) {
            cards.forEach((card, i) => {
                card.classList.remove('active');
                if (i === index) {
                    card.classList.add('active');
                }
            });
            // Ocultar botones si solo hay un personaje
            if (cards.length <= 1) {
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';
            }
        }

        function nextCard() {
            currentIndex = (currentIndex + 1) % cards.length;
            showCard(currentIndex);
        }

        function prevCard() {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            showCard(currentIndex);
        }

        if (prevButton) prevButton.addEventListener('click', prevCard);
        if (nextButton) nextButton.addEventListener('click', nextCard);

        showCard(currentIndex);
    });
});