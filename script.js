// Menú móvil toggle
document.addEventListener('DOMContentLoaded', function() {
    // Setup del menú móvil
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Iniciar animaciones y partículas
    handleFadeInElements();
    createParticles();
    createAboutParticles();
    setupSmoothScroll();
});

// Crear partículas para el hero section
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const numberOfParticles = 50;
    
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Posición aleatoria
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Tamaño aleatorio
        const size = Math.random() * 4 + 2;
        
        // Duración aleatoria
        const duration = Math.random() * 20 + 10;
        
        // Delay aleatorio
        const delay = Math.random() * 10;
        
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Crear partículas para la sección "about"
function createAboutParticles() {
    const particlesContainer = document.getElementById('about-particles');
    const numberOfParticles = 30;
    
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('about-particle');
        
        // Posición aleatoria
        const posX = Math.random() * 100;
        const posY = Math.random() * 100 + 100; // Empieza por debajo de la sección
        
        // Tamaño aleatorio
        const size = Math.random() * 3 + 1;
        
        // Duración aleatoria
        const duration = Math.random() * 30 + 15;
        
        // Delay aleatorio
        const delay = Math.random() * 15;
        
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Smooth scroll para los enlaces de navegación
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Cerrar menú móvil si está abierto
            document.getElementById('mobile-menu').classList.add('hidden');
        });
    });
}

// Función para las animaciones de aparición
function handleFadeInElements() {
    // Animación para el hero section (1.5s)
    const fadeElements = document.querySelectorAll('.fade-in');
    setTimeout(() => {
        fadeElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 100); // Un pequeño retraso para asegurar que DOM esté listo

    // Observador de intersección para el título de "Acerca de" (1s)
    const aboutTitleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                aboutTitleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const aboutTitle = document.querySelector('.about-title-fade');
    aboutTitleObserver.observe(aboutTitle);
}


// Añadir esto a la función handleFadeInElements() en script.js

// Observador de intersección para el título de "Categorías" (1s)
const categoriesTitleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            categoriesTitleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const categoriesTitle = document.querySelector('.categories-title-fade');
categoriesTitleObserver.observe(categoriesTitle);

// Observador de intersección para las tarjetas de categorías (1s con pequeño retraso escalonado)
const categoryCardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Agregar un pequeño retraso escalonado para cada tarjeta
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150); // 150ms   de retraso entre cada tarjeta
            
            categoryCardsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const categoryCards = document.querySelectorAll('.category-fade');
categoryCards.forEach(card => {
    categoryCardsObserver.observe(card);
});

// Carrusel minimalista mejorado
document.addEventListener('DOMContentLoaded', function() {
    // Configuración del carrusel
    const carousel = document.getElementById('categories-carousel');
    const prevBtn = document.getElementById('prev-category');
    const nextBtn = document.getElementById('next-category');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    
    // Datos de las categorías (estilo minimalista puro)
    const categories = [
        {
            title: "EDATER DEL AÑO",
            description: "Reconocimiento al usuario con mas relaciones virtuales",
            id: "edater-del-año",
            icon: "heart"
        },
        {
            title: "MEJOR EN PVP",
            description: "Mejor Miembro en PvP (1.8 - 1.9)",
            id: "mejor-en-pvp",
            icon: "trophy"
        },
        {
            title: "SCREENSHOT DEL AÑO",
            description: "La mejor captura de pantalla tomada",
            id: "screenshot-del-año",
            icon: "camera"
        },
        {
            title: "PRANK DEL AÑO",
            description: "La mejor broma realizada en el servidor.",
            id: "prank-del-año",
            icon: "smile"
        },
        {
            title: "MIEMBRO DEL AÑO",
            description: "Quien más ha aportado a la comunidad este año",
            id: "miembro-del-año",
            icon: "user"
        },
        {
            title: "CONSTRUCCIÓN DEL AÑO",
            description: "La mejor construccion hecha en CumLand",
            id: "construccion-del-año",
            icon: "layers"
        },
        {
            title: "SHIPEO DEL AÑO",
            description: "El Shipeo que mas se apoya en el año",
            id: "shipeo-del-año",
            icon: "users"
        },
        {
            title: "MEJOR STAFF (ALL TIME)",
            description: "El mejor staff de todos los tiempos",
            id: "golden-staff",
            icon: "book-check"
        }
    ];
    
    // Variables de estado del carrusel
    let currentIndex = 0;
    let cardsPerView = calculateCardsPerView();
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    
    // Crear tarjetas de categorías con nuevo estilo
    function createCategoryCards() {
        carousel.innerHTML = '';
        
        // Duplicamos las categorías para el efecto infinito
        const duplicatedCategories = [...categories, ...categories, ...categories];
        
        duplicatedCategories.forEach((category, index) => {
            const card = document.createElement('div');
            card.className = 'category-card bg-dark-red rounded-lg overflow-hidden relative';
            card.innerHTML = `
                <div class="absolute inset-0 bg-black bg-opacity-50"></div>
                <div class="relative z-10 p-4 h-full flex flex-col justify-between">
                    <div class="flex justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-white opacity-70">
                            ${getIconPath(category.icon)}
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-white text-xl font-bold mb-2 uppercase text-center">${category.title}</h3>
                        <p class="text-gray-300 text-sm mb-4 text-center">${category.description}</p>
                        <a href="vote.html" class="block text-center bg-red-600 text-white px-4 py-2 rounded-full uppercase text-sm hover:bg-red-700 transition-colors">
                            Votar
                        </a>
                    </div>
                </div>
            `;
            carousel.appendChild(card);
            
            // Agregar eventos para arrastrar en móviles
            card.addEventListener('touchstart', touchStart(index));
            card.addEventListener('touchend', touchEnd);
            card.addEventListener('touchmove', touchMove);
        });
        
        // Posicionamos el carrusel en el centro (primer conjunto de categorías)
        currentIndex = categories.length;
        updateCarousel();
    }

    function getIconPath(iconName) {
        const icons = {
            'heart': '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
            'message-circle': '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 8.5-8.5h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
            'camera': '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
            'smile': '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
            'user': '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
            'layers': '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
            'users': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
            'book-check': '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="m9 9.5 2 2 4-4"/>',
            'trophy': '<path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>'
        };
        return icons[iconName] || icons['message-circle'];
    }
    
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        categories.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => {
                goToCategory(index);
            });
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    function updateIndicators() {
        const indicators = document.querySelectorAll('.carousel-indicator');
        const realIndex = currentIndex % categories.length;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === realIndex);
        });
    }
    
    function calculateCardsPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    function updateCarousel() {
        const cardWidth = carousel.children[0].offsetWidth + 32;
        const offset = -currentIndex * cardWidth;
        
        carousel.style.transform = `translateX(${offset}px)`;
        currentTranslate = offset;
        prevTranslate = offset;
        
        updateIndicators();
    }
    
    function goToCategory(index) {
        currentIndex = categories.length + index;
        updateCarousel();
    }
    
    function nextCategory() {
        if (isDragging) return;
        
        currentIndex++;
        if (currentIndex >= categories.length * 2) {
            currentIndex = categories.length;
            carousel.style.transition = 'none';
            updateCarousel();
            void carousel.offsetWidth;
            carousel.style.transition = 'transform 0.5s ease-in-out';
        }
        updateCarousel();
    }
    
    function prevCategory() {
        if (isDragging) return;
        
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = categories.length - 1;
            carousel.style.transition = 'none';
            updateCarousel();
            void carousel.offsetWidth;
            carousel.style.transition = 'transform 0.5s ease-in-out';
        }
        updateCarousel();
    }
    
    function touchStart(index) {
        return function(event) {
            isDragging = true;
            startPos = getPositionX(event);
            currentIndex = index;
            carousel.style.transition = 'none';
            animationID = requestAnimationFrame(animation);
        };
    }
    
    function touchEnd() {
        if (!isDragging) return;
        isDragging = false;
        cancelAnimationFrame(animationID);
        
        const movedBy = currentTranslate - prevTranslate;
        if (movedBy < -100 && currentIndex < categories.length * 2 - 1) {
            currentIndex++;
        }
        
        if (movedBy > 100 && currentIndex > 0) {
            currentIndex--;
        }
        
        carousel.style.transition = 'transform 0.5s ease-in-out';
        updateCarousel();
    }
    
    function touchMove(event) {
        if (!isDragging) return;
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
    
    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
    
    function animation() {
        carousel.style.transform = `translateX(${currentTranslate}px)`;
        if (isDragging) requestAnimationFrame(animation);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextCategory);
    prevBtn.addEventListener('click', prevCategory);
    
    // Auto-desplazamiento
    let autoScrollInterval = setInterval(nextCategory, 5000);
    
    // Pausar auto-desplazamiento al interactuar
    carousel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    carousel.addEventListener('touchstart', () => clearInterval(autoScrollInterval));
    carousel.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(nextCategory, 5000);
    });
    
    // Manejar redimensionamiento de la ventana
    window.addEventListener('resize', () => {
        cardsPerView = calculateCardsPerView();
        updateCarousel();
    });
    
    // Inicializar
    createCategoryCards();
    createIndicators();
    
    // Observador de intersección para animaciones
    const categoryCardsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                categoryCardsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observar las tarjetas del carrusel
    document.querySelectorAll('.category-fade').forEach(card => {
        categoryCardsObserver.observe(card);
    });
});

// Modificar los enlaces de votación para usar la nueva función de verificación
// Función mejorada para verificar vinculación de Discord
function checkDiscordLinkage(categoryId) {
    // Usar fetch con más configuración y manejo de errores
    fetch('/api/check-discord-link', {
        method: 'GET',
        credentials: 'include', // Incluir credenciales
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        // Manejar diferentes códigos de estado
        if (response.status === 401) {
            // No autenticado, redirigir a login
            window.location.href = '/login';
            return;
        }
        
        if (!response.ok) {
            throw new Error('Error en la verificación');
        }
        
        return response.json();
    })
    .then(data => {
        if (data && data.isLinked) {
            // Si está vinculado, ir a votar
            window.location.href = `vote.html#${categoryId}`;
        } else {
            // No vinculado, redirigir a vincular
            window.location.href = '/link-discord';
        }
    })
    .catch(error => {
        console.error('Error de verificación:', error);
        alert('No se pudo verificar tu cuenta. Por favor, intenta de nuevo.');
    });
}

// Modificar los eventos de los botones de votación
document.addEventListener('DOMContentLoaded', function() {
    const voteButtons = document.querySelectorAll('a[href^="vote.html#"]');
    
    voteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Extraer el ID de la categoría del href
            const categoryId = this.getAttribute('href').split('#')[1];
            
            // Llamar a la función de verificación
            checkDiscordLinkage(categoryId);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    
    // Configuración de OAuth de Discord
    const DISCORD_CLIENT_ID = '1353858024816644137';
    const DISCORD_REDIRECT_URI = ' https://paioar.github.io/BlockForSale-Awards/'; // Ajusta el puerto según tu configuración local
    
    // Función para generar la URL de autorización de Discord
    function getDiscordAuthUrl() {
        const baseUrl = 'https://discord.com/api/oauth2/authorize';
        const params = new URLSearchParams({
            client_id: DISCORD_CLIENT_ID,
            redirect_uri: DISCORD_REDIRECT_URI,
            response_type: 'code',
            scope: 'identify email' // Permisos solicitados
        });

        return `${baseUrl}?${params.toString()}`;
    }

    // Función para actualizar el botón de login
    function updateLoginButton() {
        const discordUser = JSON.parse(localStorage.getItem('discordUser'));
        
        if (loginButton) {
            if (discordUser) {
                // Usuario está conectado - mostrar perfil
                loginButton.innerHTML = `
                    <div class="flex items-center">
                        <img 
                            src="${discordUser.avatar ? 
                                `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png` : 
                                '/path/to/default-avatar.png'}" 
                            alt="${discordUser.username}" 
                            class="w-6 h-6 rounded-full mr-2"
                        />
                        <span class="text-sm whitespace-nowrap">${discordUser.username}</span>
                    </div>
                `;
                loginButton.classList.remove('bg-bfs-gray-dark');
                loginButton.classList.add('bg-bfs-black-soft');
            } else {
                // Usuario no conectado - mostrar botón de conexión
                loginButton.innerHTML = `
                    <span class="mr-2 whitespace-nowrap text-sm">Conectar Discord</span>
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path>
                    </svg>
                `;
                loginButton.classList.add('bg-bfs-gray-dark');
                loginButton.classList.remove('bg-bfs-black-soft');
            }
        }
    }

    // Configurar evento de clic para el botón de login
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            const discordUser = JSON.parse(localStorage.getItem('discordUser'));
            
            if (discordUser) {
                // Logout
                localStorage.removeItem('discordUser');
                updateLoginButton();
            } else {
                // Redirigir a autorización de Discord
                window.location.href = getDiscordAuthUrl();
            }
        });
    }

    // Función para manejar el callback de Discord
    function processDiscordCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            // Enviar código al backend para autenticación
            fetch('/api/discord/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Authentication failed');
                }
                return response.json();
            })
            .then(userData => {
                // Guardar información del usuario
                localStorage.setItem('discordUser', JSON.stringify(userData));
                
                // Redirigir a la página principal
                window.location.href = 'index.html';
            })
            .catch(error => {
                console.error('Error de autenticación:', error);
                alert('No se pudo autenticar. Por favor, intenta de nuevo.');
            });
        }
    }

    // Configurar botones de votación
    function setupVoteButtons() {
        const voteButtons = document.querySelectorAll('a[href^="vote.html#"]');
        
        voteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const categoryId = button.getAttribute('href').split('#')[1];
                
                const discordUser = localStorage.getItem('discordUser');
                
                if (discordUser) {
                    // Si está autenticado, ir a votar
                    window.location.href = `vote.html#${categoryId}`;
                } else {
                    // Redirigir a autorización de Discord
                    window.location.href = getDiscordAuthUrl();
                }
            });
        });
    }

    // Procesar callback si estamos en la página de callback
    if (window.location.pathname.includes()) {
        processDiscordCallback();
    }

    // Actualizar botón de login
    updateLoginButton();

    // Configurar botones de votación
    setupVoteButtons();
});
// Función auxiliar para modificar los botones de votación
function setupVoteButtons() {
    const voteButtons = document.querySelectorAll('a[href^="vote.html#"]');
    
    voteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const categoryId = button.getAttribute('href').split('#')[1];
            
            // Verificar si ya está autenticado
            const discordUser = localStorage.getItem('discordUser');
            
            if (discordUser) {
                // Si ya está autenticado, ir directamente a votar
                window.location.href = `vote.html`;
            } else {
                // Redirigir a la página de autorización de Discord
                window.location.href = getDiscordAuthUrl();
            }
        });
    });
}

// Configurar botones de votación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', setupVoteButtons);

const DISCORD_CLIENT_ID = '1353858024816644137';
const DISCORD_CLIENT_SECRET = '7te_J2KAFlClOzEokhX7W-V5PJRbwwoj';
const DISCORD_REDIRECT_URI = ' https://paioar.github.io/BlockForSale-Awards/'; // Cambia esto por tu URL real de callback

// Función para generar la URL de autorización de Discord
function getDiscordAuthUrl() {
    const baseUrl = 'https://discord.com/api/oauth2/authorize';
    const params = new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        redirect_uri: DISCORD_REDIRECT_URI,
        response_type: 'code',
        scope: 'identify email'
    });

    return `${baseUrl}?${params.toString()}`;
}

// Función para manejar la autenticación de Discord
async function handleDiscordAuth(code) {
    try {
        // Paso 1: Intercambiar código por token de acceso
        const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: DISCORD_CLIENT_ID,
                client_secret: '7te_J2KAFlClOzEokhX7W-V5PJRbwwoj', // IMPORTANTE: No expongas esto en cliente
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: DISCORD_REDIRECT_URI
            })
        });

        if (!tokenResponse.ok) {
            throw new Error('No se pudo obtener el token de acceso');
        }

        const tokenData = await tokenResponse.json();

        // Paso 2: Obtener información del usuario
        const userResponse = await fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `Bearer ${tokenData.access_token}`
            }
        });

        if (!userResponse.ok) {
            throw new Error('No se pudo obtener la información del usuario');
        }

        const userData = await userResponse.json();

        // Paso 3: Guardar datos en localStorage (temporal)
        localStorage.setItem('discordUser', JSON.stringify({
            id: userData.id,
            username: userData.username,
            avatar: userData.avatar,
            email: userData.email
        }));

        // Redirigir a la página principal o de premios
        window.location.href = 'index.html';

    } catch (error) {
        console.error('Error en autenticación:', error);
        alert('No se pudo autenticar con Discord');
    }
}

// Función para verificar si el usuario está autenticado
function isDiscordUserAuthenticated() {
    return !!localStorage.getItem('discordUser');
}

// Función para cerrar sesión
function logoutDiscordUser() {
    localStorage.removeItem('discordUser');
    window.location.reload();
}

// Configurar botones de login y votación
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const voteButtons = document.querySelectorAll('.vote-button');

    // Manejar botón de login
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            if (isDiscordUserAuthenticated()) {
                // Si ya está autenticado, mostrar opciones de perfil o logout
                logoutDiscordUser();
            } else {
                // Redirigir a autorización de Discord
                window.location.href = getDiscordAuthUrl();
            }
        });
    }

    // Manejar botones de votación
    voteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const categoryId = button.dataset.category;

            if (isDiscordUserAuthenticated()) {
                // Ir a la página de votación
                window.location.href = `votar.html?categoria=${categoryId}`;
            } else {
                // Redirigir a autorización de Discord
                window.location.href = getDiscordAuthUrl();
            }
        });
    });

    // Manejar callback de Discord (si estás en la página de callback)
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        handleDiscordAuth(code);
    }
});