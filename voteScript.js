let currentCategoryIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Voting journey categories in order
    const votingJourney = [
        "edater-del-año",
        "mejor-en-pvp", 
        "screenshot-del-año",
        "prank-del-año",
        "miembro-del-año",
        "construccion-del-año",
        "shipeo-del-año",
        "golden-staff"
    ];

    // Categories data with descriptions and example nominees
    const categories = [
        {
            id: "edater-del-año",
            title: "Edater del Año",
            description: "Reconoce al miembro más comprometido con el rol de edater en el servidor.",
            icon: "heart",
            nominees: [
                { 
                    name: "zPaio_", 
                    description: "EL QUE ME VOTA ES PUTO" 
                },
                { 
                    name: "vCry", 
                    description: "Pedofilo." 
                },
                { 
                    name: "Swaitty", 
                    description: "Novia de whuait" 
                },
                {
                    name: "Dandragonay",
                    description: "Un leche"
                },
                {
                    name: "H333_",
                    description: "Dario"
                },
                {
                    name: "Ximena",
                    description: "Turra"
                }
            ]
        },
        {
            id: "mejor-en-pvp",
            title: "Mejor en PVP",
            description: "El Miembro que mejor domina el PVP (1.8 y 1.9)",
            icon: "quote",
            nominees: [
                { 
                    name: "DuckyMicrobe993", 
                    description: "" 
                },
                { 
                    name: "Stryker_L", 
                    description: "" 
                },
                { 
                    name: "CallMeNxxth", 
                    description: "" 
                },
                {
                    name: "zPaio_",
                    description: "el goat"
                },
                {
                    name: "vCry",
                    description: "pedofilo"
                },
                {
                    name: "iWhuait",
                    description: ""
                },
                {
                    name: "Memphis___",
                    description: "puto"
                }
            ]
        },
        {
            id: "screenshot-del-año",
            title: "Screenshot del Año",
            description: "La captura más épica, divertida o memorable del servidor.",
            icon: "image",
            nominees: [
                { 
                    name: "nose1", 
                    description: "" 
                },
                { 
                    name: "nose2", 
                    description: "" 
                },
                { 
                    name: "nose3", 
                    description: "" 
                }
            ]
        },
        {
            id: "prank-del-año",
            title: "Prank del Año",
            description: "La broma mejor ejecutada o más memorable del servidor.",
            icon: "laugh",
            nominees: [
                { 
                    name: "asd", 
                    description: "asd" 
                },
                { 
                    name: "asd", 
                    description: "asd" 
                },
                { 
                    name: "asd", 
                    description: "asd" 
                }
            ]
        },
        {
            id: "miembro-del-año",
            title: "Miembro del Año",
            description: "El miembro más activo, colaborador y destacado del servidor.",
            icon: "award",
            nominees: [
                { 
                    name: "asd", 
                    description: "asd" 
                },
                { 
                    name: "asd", 
                    description: "asd" 
                },
                { 
                    name: "asd", 
                    description: "asd" 
                }
            ]
        },
        {
            id: "construccion-del-año",
            title: "Construcción del Año",
            description: "La construcción más impresionante compartida en el servidor.",
            icon: "hammer",
            nominees: [
                { 
                    name: "asd", 
                    description: "asd" 
                },
                { 
                    name: "asd", 
                    description: "asd" 
                },
                { 
                    name: "asd", 
                    description: "asd" 
                }
            ]
        },
        {
            id: "shipeo-del-año",
            title: "Shipeo del Año",
            description: "La pareja más shipeada o la historia de amor más popular del servidor.",
            icon: "heart",
            nominees: [
                { 
                    name: "asd", 
                    description: "asd" 
                },
                { 
                    name: "asd", 
                    description: "asd" 
                },
                { 
                    name: "asd", 
                    description: "asd" 
                }
            ]
        },
        {
            id: "golden-staff",
            title: "Mejor Staff",
            description: "El Mejor administrador de todos los tiempos.",
            icon: "book-check",
            nominees: [
                {
                    name: "zPaio_",
                    description: "la cabra"
                },
                {
                    name: "ekile",
                    description: ""
                },
                {
                    name: "luniwis",
                    description: ""
                },
                {
                    name: "Stryker_L",
                    description: "la cabra"
                },
                {
                    name: "XDiego12X",
                    description: ""
                }
            ]
        }
    ];

    // Get all required elements
    const elements = {
        loginButton: document.getElementById('login-button'),
        categoryTitle: document.getElementById('category-title'),
        nomineesContainer: document.getElementById('nominees-container'),
        submitVoteButton: document.getElementById('submit-vote-button'),
        entryModal: document.getElementById('entry-modal'),
        startVotingBtn: document.getElementById('start-voting-btn'),
        nextCategoryButton: document.getElementById('next-category-button'),
        categoryIcon: document.getElementById('category-icon'),
        userDiscordAvatar: document.getElementById('user-discord-avatar'),
        userDiscordName: document.getElementById('user-discord-name'),
        userDiscordTag: document.getElementById('user-discord-tag'),
        termsCheckbox: document.getElementById('terms-checkbox'),
        categoryIntro: document.getElementById('category-intro'),
        categoryIntroTitle: document.getElementById('category-intro-title'),
        categoryIntroDescription: document.getElementById('category-intro-description'),
        fixedCategoryHeader: document.getElementById('fixed-category-header'),
        fixedCategoryTitle: document.getElementById('fixed-category-title'),
        fixedCategoryDescription: document.getElementById('fixed-category-description'),
        nomineeModal: document.getElementById('nominee-modal'),
        modalNomineeImage: document.getElementById('modal-nominee-image'),
        modalNomineeName: document.getElementById('modal-nominee-name'),
        modalNomineeDescription: document.getElementById('modal-nominee-description'),
        confirmVoteModal: document.getElementById('confirm-vote-modal'),
        closeNomineeModal: document.getElementById('close-nominee-modal')
    };

    // Check for missing elements
    for (const [key, element] of Object.entries(elements)) {
        if (!element && key !== 'closeModalBtn') {
            console.error(`Missing element: ${key}`);
        }
    }

    // Tracking votes and selected nominee
    const votes = {};
    let currentSelectedNominee = null;

    // Function to update login button
    function updateLoginButton() {
        const discordUser = JSON.parse(localStorage.getItem('discordUser') || 'null');
        
        if (discordUser) {
            elements.loginButton.innerHTML = `
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
            elements.loginButton.classList.remove('bg-bfs-gray-dark');
            elements.loginButton.classList.add('bg-bfs-black-soft');
        } else {
            elements.loginButton.innerHTML = 'Conectar Discord';
            elements.loginButton.classList.add('bg-bfs-gray-dark');
            elements.loginButton.classList.remove('bg-bfs-black-soft');
        }
    }

    // Function to populate user profile in modal
    function populateUserProfile() {
        const discordUser = JSON.parse(localStorage.getItem('discordUser') || 'null');
        
        if (discordUser && elements.userDiscordAvatar && elements.userDiscordName && elements.userDiscordTag) {
            elements.userDiscordAvatar.src = discordUser.avatar 
                ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
                : '/path/to/default-avatar.png';
            
            elements.userDiscordName.textContent = discordUser.username || 'Usuario de Discord';
            elements.userDiscordTag.textContent = `@${discordUser.username}` || '@username';
        }
    }

    // Function to show category intro animation
    function showCategoryIntro(categoryId) {
        const category = categories.find(cat => cat.id === categoryId);
        if (!category || !elements.categoryIntro) return;
    
        currentCategoryIndex = votingJourney.indexOf(categoryId);


        // Update fixed header
        updateFixedCategoryHeader(category);
    
        // Solo mostrar animación si no viene de un hash en la URL
        if (!window.location.hash) {
            elements.categoryIntroTitle.textContent = category.title.toUpperCase();
            elements.categoryIntroDescription.textContent = category.description;
            elements.categoryIntro.classList.remove('hidden');
    
            // Trigger animations
            setTimeout(() => {
                elements.categoryIntroTitle.classList.remove('opacity-0', 'translate-y-10');
                elements.categoryIntroDescription.classList.remove('opacity-0', 'translate-y-10');
            }, 100);
    
            // Hide after 3 seconds and fade in nominees
            setTimeout(() => {
                elements.categoryIntroTitle.classList.add('opacity-0', 'translate-y-10');
                elements.categoryIntroDescription.classList.add('opacity-0', 'translate-y-10');
                
                setTimeout(() => {
                    elements.categoryIntro.classList.add('hidden');
                    
                    // Fade in nominees with a slight delay and animation
                    populateNominees(categoryId);
                    const nomineesContainer = document.getElementById('nominees-container');
                    nomineesContainer.classList.add('opacity-0', 'translate-y-10');
                    
                    setTimeout(() => {
                        nomineesContainer.classList.remove('opacity-0', 'translate-y-10');
                    }, 300);
                }, 1000);
            }, 3000);
        } else {
            // Si viene directamente a una categoría, solo cargar nominados
            populateNominees(categoryId);
        }
    }

    // Update fixed category header at the top
    function updateFixedCategoryHeader(category) {
        if (elements.fixedCategoryHeader && elements.fixedCategoryTitle && elements.fixedCategoryDescription) {
            elements.fixedCategoryTitle.textContent = category.title;
            elements.fixedCategoryDescription.textContent = category.description;
            elements.fixedCategoryHeader.classList.remove('hidden');
        }
    }

    // Function to populate nominees
    function populateNominees(categoryId) {
        const category = categories.find(cat => cat.id === categoryId);
        
        if (!category || !elements.nomineesContainer) {
            console.error('Category not found:', categoryId);
            return;
        }
        currentCategoryIndex = votingJourney.indexOf(categoryId);

        // Update category details
        elements.categoryTitle.textContent = category.title;
        if (elements.categoryIcon) {
            elements.categoryIcon.setAttribute('data-lucide', category.icon);
            lucide.createIcons();
        }

        // Update fixed header
        updateFixedCategoryHeader(category);

        elements.nomineesContainer.innerHTML = '';

        const template = document.getElementById('nominee-card-template');
        if (!template) {
            console.error('Nominee card template not found');
            return;
        }

        category.nominees.forEach((nominee, index) => {
            const nomineeCard = template.content.cloneNode(true);
            
            const cardElement = nomineeCard.querySelector('.nominee-card');
            const nameEl = nomineeCard.querySelector('.nominee-name');
            const descEl = nomineeCard.querySelector('.nominee-description');
            const radioInput = nomineeCard.querySelector('.nominee-radio');
            const img = nomineeCard.querySelector('img');

            if (nameEl) nameEl.textContent = nominee.name;
            if (descEl) descEl.textContent = nominee.description;
            if (radioInput) {
                radioInput.value = index;
                radioInput.name = 'nominee';
            }
            if (img) img.src = `resources/default-photo-discord.jpg`;


            
            // Add click event to show modal
            if (cardElement) {
                cardElement.addEventListener('click', () => {
                    showNomineeModal(nominee, category);
                });
            }

            elements.nomineesContainer.appendChild(nomineeCard);
        });

        // Update URL hash
        window.location.hash = categoryId;

        // Enable/disable submit button
        const discordUser = localStorage.getItem('discordUser');
        if (elements.submitVoteButton) {
            elements.submitVoteButton.disabled = !discordUser;
        }

        // Handle next category button visibility
        if (elements.nextCategoryButton) {
            const currentIndex = votingJourney.indexOf(categoryId);
            elements.nextCategoryButton.style.display = currentIndex < votingJourney.length - 1 ? 'block' : 'none';
        }
    }

    // Show nominee modal with details
    function showNomineeModal(nominee, category) {
        if (!elements.nomineeModal) return;
        
        currentSelectedNominee = {
            ...nominee,
            categoryId: category.id,
            categoryName: category.title,
            index: category.nominees.findIndex(n => n.name === nominee.name)
        };

        if (elements.modalNomineeImage) {
            elements.modalNomineeImage.src = `/api/placeholder/600/600?text=${encodeURIComponent(nominee.name.substring(0, 2))}`;
        }
        if (elements.modalNomineeName) {
            elements.modalNomineeName.textContent = nominee.name;
        }
        if (elements.modalNomineeDescription) {
            elements.modalNomineeDescription.textContent = nominee.description;
        }
        
        elements.nomineeModal.classList.remove('hidden');
    }

    // Close nominee modal
    function closeNomineeModal() {
        if (elements.nomineeModal) {
            elements.nomineeModal.classList.add('hidden');
        }
    }

    // Function to go to next category
    function goToNextCategory() {
        // Incrementa el índice si no hemos llegado al final
        if (currentCategoryIndex < votingJourney.length - 1) {
            currentCategoryIndex++;
            const nextCategory = votingJourney[currentCategoryIndex];
            showCategoryIntro(nextCategory);
            
            // Actualiza la URL hash
            window.location.hash = nextCategory;
        }
    }

    // Get category from URL hash or default to first category
    function getCurrentCategory() {
        const hash = window.location.hash.substring(1);
        
        // Si hay hash en la URL, encuentra su índice
        if (hash && votingJourney.includes(hash)) {
            currentCategoryIndex = votingJourney.indexOf(hash);
            return hash;
        }
        
        // Si no hay hash, usa el índice actual
        return votingJourney[currentCategoryIndex];
    }

    // Function to show entry modal
    function showEntryModal() {
        if (!elements.entryModal) return;

        const hasSeenModal = sessionStorage.getItem('hasSeenVoteModal');
        
        if (!hasSeenModal && !window.location.hash) {
            elements.entryModal.classList.remove('hidden');
            sessionStorage.setItem('hasSeenVoteModal', 'true');
        } else if (window.location.hash) {
            // If coming directly to a category, skip terms modal
            const categoryId = getCurrentCategory();
            showCategoryIntro(categoryId);
        }
    }

    // Function to hide entry modal
    function hideEntryModal() {
        if (!elements.entryModal) return;
        elements.entryModal.classList.add('hidden');
        
        // Show intro for first category
        showCategoryIntro(votingJourney[0]);
    }

    // Initial setup
    updateLoginButton();
    populateUserProfile();
    showEntryModal();

    // Event listeners
    if (elements.termsCheckbox && elements.startVotingBtn) {
        elements.termsCheckbox.addEventListener('change', function() {
            if (elements.startVotingBtn) {
                elements.startVotingBtn.disabled = !this.checked;
            }
        });
        
        elements.startVotingBtn.addEventListener('click', function() {
            if (elements.termsCheckbox && elements.termsCheckbox.checked) {
                hideEntryModal();
            }
        });
    }

    if (elements.loginButton) {
        elements.loginButton.addEventListener('click', () => {
            const discordUser = localStorage.getItem('discordUser');
            
            if (discordUser) {
                // Logout
                localStorage.removeItem('discordUser');
                updateLoginButton();
                if (elements.submitVoteButton) {
                    elements.submitVoteButton.disabled = true;
                }
                populateUserProfile();
            } else {
                // Redirect to Discord auth
                window.location.href = getDiscordAuthUrl();
            }
        });
    }

    if (elements.submitVoteButton) {
        elements.submitVoteButton.addEventListener('click', () => {
            if (!currentSelectedNominee) {
                alert('Por favor, selecciona un nominado');
                return;
            }

            // Store the vote
            votes[currentSelectedNominee.categoryId] = {
                nomineeIndex: currentSelectedNominee.index,
                nomineeName: currentSelectedNominee.name
            };

            // Visual feedback
            alert(`Votaste por ${currentSelectedNominee.name} en ${currentSelectedNominee.categoryName}`);

            // Close modal and prepare for next category
            closeNomineeModal();
            if (elements.nextCategoryButton) {
                elements.nextCategoryButton.style.display = 'block';
            }
        });
    }

    if (elements.confirmVoteModal) {
        elements.confirmVoteModal.addEventListener('click', () => {
            if (elements.submitVoteButton) {
                elements.submitVoteButton.click();
            }
        });
    }

    if (elements.closeNomineeModal) {
        elements.closeNomineeModal.addEventListener('click', closeNomineeModal);
    }

    if (elements.nextCategoryButton) {
        elements.nextCategoryButton.addEventListener('click', goToNextCategory);
    }

    // Listen for hash changes to update category
    window.addEventListener('hashchange', () => {
        const newCategory = getCurrentCategory();
        showCategoryIntro(newCategory);
    });
});

// Discord authentication URL function
function getDiscordAuthUrl() {
    const baseUrl = 'https://discord.com/api/oauth2/authorize';
    const params = new URLSearchParams({
        client_id: '1353858024816644137',
        redirect_uri: 'https://paioar.github.io/BlockForSale-Awards/',
        response_type: 'code',
        scope: 'identify email'
    });

    return `${baseUrl}?${params.toString()}`;
}