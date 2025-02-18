// Variables para el carrito y productos
let cart = [];
let products = [];

// Asegurarnos de que esto esté al principio del archivo
document.addEventListener('DOMContentLoaded', function() {
    // Manejador del carrito
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            document.body.classList.toggle('showCart');
        });
    }

    // Manejador del botón cerrar
    const closeButton = document.querySelector('.cartTab .close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            document.body.classList.remove('showCart');
        });
    }

    // Cerrar el carrito al hacer clic fuera
    document.addEventListener('click', (e) => {
        // Si el clic fue en un botón de eliminar, no cerrar el carrito
        if (e.target.classList.contains('remove-btn')) {
            return;
        }
        
        // Si el clic no fue en el carrito ni en su icono, cerrarlo
        if (!e.target.closest('.cartTab') && !e.target.closest('.icon-cart')) {
            document.body.classList.remove('showCart');
        }
    });
});

// Manejo de la splash screen
document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.querySelector('.splash-screen');
    
    // Hacer que la splash screen desaparezca después de 2 segundos
    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        // Remover completamente después de la animación
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Variables para el slider
let counter = 1;
const totalSlides = 4;
const slides = document.querySelectorAll('input[name="radio-btn"]');

// Función para el slider automático
function autoSlide() {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    
    // Transición suave al volver al principio
    if (counter > totalSlides) {
        counter = 1;
        // Pequeña pausa antes de reiniciar
        setTimeout(() => {
            document.getElementById('radio1').checked = true;
            // Aplicar transición suave
            document.querySelector('.slides').style.transition = 'none';
            setTimeout(() => {
                document.querySelector('.slides').style.transition = '2s';
            }, 50);
        }, 2000);
    }
}

// Aumentamos el intervalo para dar tiempo a la transición
setInterval(autoSlide, 5000);

// Código para el manejo de cookies
document.addEventListener('DOMContentLoaded', function() {
    const cookieNotice = document.getElementById('cookieNotice');
    const acceptButton = document.getElementById('acceptCookies');

    // Comprueba si las cookies ya fueron aceptadas
    if (localStorage.getItem('acceptCookies')) {
        cookieNotice.style.display = 'none';
    }

    // Añade el evento click al botón
    acceptButton.addEventListener('click', function() {
        cookieNotice.style.display = 'none';
        localStorage.setItem('cookiesAccepted', 'true');
    });

    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Iniciar el carrusel automático
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000); // Cambiar cada 5 segundos
    }

    // Detener el carrusel automático al interactuar
    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Event listeners
    prevButton.addEventListener('click', () => {
        stopSlideShow();
        prevSlide();
        startSlideShow();
    });

    nextButton.addEventListener('click', () => {
        stopSlideShow();
        nextSlide();
        startSlideShow();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlideShow();
            currentSlide = index;
            showSlide(currentSlide);
            startSlideShow();
        });
    });

    // Mostrar primer slide y comenzar
    showSlide(currentSlide);
    startSlideShow();
    
    // Funcionalidad para las pestañas del perfil
    const tabButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones y contenidos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Añadir clase active al botón clickeado
            button.classList.add('active');

            // Mostrar el contenido correspondiente
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Funcionalidad para el formulario de perfil
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Cambios guardados correctamente');
        });
    }

    // Funcionalidad para los botones de dirección
    const addressActions = document.querySelectorAll('.address-actions button');
    addressActions.forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.classList.contains('edit-btn') ? 'editar' : 'eliminar';
            const addressCard = e.target.closest('.address-card');
            
            if (action === 'editar') {
                // Lógica para editar
                console.log('Editando dirección...');
            } else {
                // Lógica para eliminar
                if (confirm('¿Estás seguro de que deseas eliminar esta dirección?')) {
                    addressCard.remove();
                }
            }
        });
    });

    // Funcionalidad para añadir nueva dirección
    const addAddressBtn = document.querySelector('.add-address-btn');
    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', () => {
            alert('Formulario para añadir nueva dirección');
            // Aquí iría la lógica para mostrar un modal o formulario
        });
    }

    // Funcionalidad para los favoritos
    const removeFavoriteButtons = document.querySelectorAll('.remove-favorite-btn');
    removeFavoriteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const favoriteItem = e.target.closest('.favorite-item');
            if (confirm('¿Eliminar este artículo de favoritos?')) {
                favoriteItem.remove();
            }
        });
    });
});

// Hacer que el logo se mueva al hacer scroll
window.addEventListener('scroll', () => {
    const logo = document.querySelector('.logo');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        logo.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    } else {
        logo.style.transform = 'translateY(0)';
    }
});

// Control del botón pause/play del carrusel
document.getElementById('pauseButton').addEventListener('click', function() {
    document.querySelector('.slider article').classList.toggle('paused');
    this.textContent = this.textContent === 'Pause' ? 'Play' : 'Pause';
});

// Funciones para el perfil de usuario
function initializeProfile() {
    // Gestión del carrito
    let cartTotal = 0;
    const TAX_RATE = 0.21; // 21% IVA

    function updateCartTotal() {
        let subtotal = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.querySelector('.price').textContent.replace('€', ''));
            const quantity = parseInt(item.querySelector('input[type="number"]').value);
            subtotal += price * quantity;
        });

        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax;

        const cartSummary = document.querySelector('.cart-summary');
        if (cartSummary) {
            cartSummary.querySelector('p:nth-child(1) span').textContent = `${subtotal.toFixed(2)} €`;
            cartSummary.querySelector('.total span').textContent = `${total.toFixed(2)} €`;
        }
    }

    // Gestión de favoritos
    function initializeFavorites() {
        const favoriteButtons = document.querySelectorAll('.product-actions .remove-favorite');
        const addToCartButtons = document.querySelectorAll('.product-actions .add-to-cart');

        favoriteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const productCard = this.closest('.product-card');
                
                if (confirm('¿Estás seguro de que deseas eliminar este artículo de favoritos?')) {
                    productCard.style.opacity = '0';
                    setTimeout(() => {
                        productCard.remove();
                        updateEmptyState('.favorites-grid');
                    }, 300);
                }
            });
        });

        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.price').textContent;
                
                alert(`Producto "${productName}" añadido al carrito por ${productPrice}`);
                // Aquí implementarías la lógica real para añadir al carrito
            });
        });
    }

    // Gestión de direcciones
    function initializeAddressManagement() {
        const addressForm = document.getElementById('addressForm');
        const modal = document.getElementById('addressModal');

        if (addressForm) {
            addressForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const street = document.getElementById('street').value;
                const city = document.getElementById('city').value;
                const postalCode = document.getElementById('postalCode').value;

                const newAddress = createAddressCard(street, city, postalCode);
                document.querySelector('.addresses-list').insertBefore(newAddress, document.querySelector('.add-address-btn'));
                
                modal.style.display = 'none';
                addressForm.reset();
            });
        }

        // Función para editar dirección
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const addressCard = this.closest('.address-card');
                const addressLines = addressCard.querySelectorAll('p');
                
                // Rellenar el formulario con los datos actuales
                document.getElementById('street').value = addressLines[0].textContent;
                document.getElementById('city').value = addressLines[1].textContent;
                document.getElementById('postalCode').value = addressLines[1].textContent.split(' ')[0];
                
                modal.style.display = 'block';
                addressForm.dataset.editMode = 'true';
                addressForm.dataset.editCard = addressCard;
            });
        });
    }

    // Función auxiliar para crear una nueva tarjeta de dirección
    function createAddressCard(street, city, postalCode) {
        const card = document.createElement('div');
        card.className = 'address-card';
        card.innerHTML = `
            <h3>Nueva Dirección</h3>
            <p>${street}</p>
            <p>${postalCode} ${city}</p>
            <p>España</p>
            <div class="address-actions">
                <button class="action-btn edit-btn">Editar</button>
                <button class="action-btn delete-btn">Eliminar</button>
            </div>
        `;

        // Añadir listeners a los nuevos botones
        card.querySelector('.edit-btn').addEventListener('click', function() {
            // Lógica de edición aquí
        });

        card.querySelector('.delete-btn').addEventListener('click', function() {
            if (confirm('¿Estás seguro de que quieres eliminar esta dirección?')) {
                card.remove();
                updateEmptyState('.addresses-list');
            }
        });

        return card;
    }

    // Función para actualizar estado vacío
    function updateEmptyState(containerSelector) {
        const container = document.querySelector(containerSelector);
        const items = container.querySelectorAll('.product-card, .address-card');
        
        if (items.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.className = 'empty-state';
            emptyMessage.textContent = 'No hay elementos para mostrar';
            container.appendChild(emptyMessage);
        }
    }

    // Inicializar todas las funcionalidades
    updateCartTotal();
    initializeFavorites();
    initializeAddressManagement();

    // Event listener para actualizar total del carrito
    document.querySelectorAll('.quantity-btn, .remove-item').forEach(element => {
        element.addEventListener('click', updateCartTotal);
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeProfile();
});

// Funcionalidad del carrito
document.addEventListener('DOMContentLoaded', function() {
    const cartToggle = document.getElementById('cartToggle');
    const cartDropdown = document.getElementById('cartDropdown');
    const closeCart = document.querySelector('.close-cart');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.querySelector('.cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartDisplay() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">${item.price.toFixed(2)} €</p>
                    <p>Cantidad: ${item.quantity}</p>
                </div>
                <button class="remove-item" data-id="${item.id}">&times;</button>
            `;
            cartItems.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        document.getElementById('cartTotal').textContent = `${total.toFixed(2)} €`;
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    cartToggle.addEventListener('click', function(e) {
        e.preventDefault();
        cartDropdown.classList.toggle('active');
    });

    closeCart.addEventListener('click', function() {
        cartDropdown.classList.remove('active');
    });

    document.addEventListener('click', function(e) {
        if (!cartDropdown.contains(e.target) && e.target !== cartToggle) {
            cartDropdown.classList.remove('active');
        }
    });

    cartItems.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const id = e.target.dataset.id;
            cart = cart.filter(item => item.id !== id);
            updateCartDisplay();
        }
    });

    // Actualizar la visualización inicial
    updateCartDisplay();
});

// Funcionalidad para mostrar/ocultar el carrito
document.querySelector('.icon-cart').addEventListener('click', () => {
    document.body.classList.toggle('showCart');
});

document.querySelector('.close').addEventListener('click', () => {
    document.body.classList.toggle('showCart');
});

// Modificar la función addToCart
function addToCart(product_id) {
    // Encontrar el producto en la lista de productos
    const product = window.products.find(p => p.id === product_id);
    if (!product) return;

    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    
    if(positionThisProductInCart < 0) { // Solo añadir si no existe
        cart.push({
            product_id: product_id,
            quantity: 1,
            name: product.name,
            price: product.price,
            image: product.image
        });
        // Actualizar la visualización del carrito
        addCartToHTML();
        addCartToMemory();
    }
}

function addCartToMemory() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Modificar la función addCartToHTML
function addCartToHTML() {
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    
    if(cart.length > 0){
        cart.forEach(cartItem => {
            totalQuantity += 1; // Cambiado de cartItem.quantity a 1
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = cartItem.product_id;
            newItem.innerHTML = `
                <div class="image">
                    <img src="${cartItem.image}" alt="${cartItem.name}">
                </div>
                <div class="name">${cartItem.name}</div>
                <div class="totalPrice">${cartItem.price.toFixed(2)}€</div>
                <button class="remove-btn" onclick="removeFromCart('${cartItem.product_id}')">&times;</button>
            `;
            listCartHTML.appendChild(newItem);
        });
    }
    document.querySelector('.icon-cart span').innerText = totalQuantity;
}

// Event listeners para + y - en el carrito
document.querySelector('.listCart').addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantityCart(product_id, type);
    }
});

function changeQuantityCart(product_id, type) {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity++;
                break;
            default:
                let newQuantity = cart[positionItemInCart].quantity - 1;
                if (newQuantity <= 0){
                    cart.splice(positionItemInCart, 1);
                } else {
                    cart[positionItemInCart].quantity = newQuantity;
                }
        }
    }
    addCartToHTML();
    addCartToMemory();
}

// Modificar la función removeFromCart para mantener el carrito abierto
function removeFromCart(product_id) {
    cart = cart.filter(item => item.product_id != product_id);
    addCartToHTML();
    addCartToMemory();
    // Asegurar que el carrito permanezca abierto
    document.body.classList.add('showCart');
    
    // Prevenir que eventos de click cierren el carrito
    setTimeout(() => {
        document.body.classList.add('showCart');
    }, 0);
}

// Modificar el event listener para el botón de pago
document.addEventListener('DOMContentLoaded', function() {
    // Añadir evento al botón de pago
    const checkOutBtn = document.querySelector('.checkOut');
    if (checkOutBtn) {
        checkOutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                window.location.href = 'pago.html';
            } else {
                alert('El carrito está vacío');
            }
        });
    }
});

// Función para cargar los productos desde el JSON
async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        const data = await response.json();
        window.products = data.products; // Guardar productos globalmente
        displayProducts(data.products); // Mostrar todos los productos
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Función para mostrar productos en la grid
function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<div class="no-results">No se encontraron productos</div>';
        return;
    }

    productsToShow.forEach(product => {
        const productHTML = `
            <article class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <div class="product-details">
                        <h3>${product.name}</h3>
                        <p class="product-description">${product.description || ''}</p>
                    </div>
                    <div class="product-bottom">
                        <p class="price">${product.price.toFixed(2)}€</p>
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                            Añadir al Carrito
                        </button>
                    </div>
                </div>
            </article>
        `;
        productsGrid.innerHTML += productHTML;
    });
}

// Función de búsqueda mejorada
function searchProducts(query) {
    if (!window.products) return;
    
    query = query.toLowerCase().trim();
    
    if (!query) {
        displayProducts(window.products);
        return;
    }

    const filteredProducts = window.products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query)) ||
        (product.category && product.category.toLowerCase().includes(query)) ||
        (product.decade && product.decade.toLowerCase().includes(query))
    );

    displayProducts(filteredProducts);
}

// Event listeners para la búsqueda
document.addEventListener('DOMContentLoaded', function() {
    // Cargar productos al iniciar
    loadProducts();
    
    // Configurar búsqueda
    const searchInput = document.querySelector('.search-input');
    let searchTimeout;

    if (searchInput) {
        // Evento input para búsqueda en tiempo real
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchProducts(this.value);
            }, 300);
        });

        // Prevenir envío de formulario
        const form = searchInput.closest('form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                searchProducts(searchInput.value);
            });
        }
    }
});

// Función de búsqueda
function searchProducts(query) {
    if (!window.products) return;
    
    query = query.toLowerCase().trim();
    const productsGrid = document.getElementById('productsGrid');
    
    if (!query) {
        loadProducts(); // Si la búsqueda está vacía, mostrar todos los productos
        return;
    }

    const filteredProducts = window.products.filter(product => {
        return (
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.decade.toLowerCase().includes(query)
        );
    });

    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<div class="no-results">No se encontraron productos que coincidan con tu búsqueda</div>';
        return;
    }

    filteredProducts.forEach(product => {
        const productHTML = `
            <article class="product-card">
                <div class="product-image">
                    <a href="producto.html?id=${product.id}" class="product-link">
                        <img src="${product.image}" alt="${product.name}">
                    </a>
                </div>
                <div class="product-info">
                    <div class="product-details">
                        <h3><a href="producto.html?id=${product.id}">${product.name}</a></h3>
                        <p class="product-description">${product.description}</p>
                    </div>
                    <div class="product-bottom">
                        <p class="price">${product.price.toFixed(2)}€</p>
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Añadir al Carrito</button>
                    </div>
                </div>
            </article>
        `;
        productsGrid.innerHTML += productHTML;
    });
}

// Event listener para la barra de búsqueda
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    let searchTimeout;

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchProducts(this.value);
            }, 300); // Esperar 300ms después de que el usuario deje de escribir
        });

        // Prevenir que el formulario se envíe al presionar Enter
        searchInput.closest('form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            searchProducts(searchInput.value);
        });
    }
});

// Función para manejar la búsqueda desde cualquier página
function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim();
    
    if (!query) return;
    
    // Si estamos en la página de catálogo, realizar la búsqueda directamente
    if (window.location.pathname.includes('catalogo.html')) {
        performSearch();
    } else {
        // Si estamos en otra página, redirigir al catálogo con el parámetro de búsqueda
        window.location.href = `catalogo.html?search=${encodeURIComponent(query)}`;
    }
}

// Event listeners para la búsqueda en todas las páginas
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-container');
    const searchInput = document.querySelector('.search-input');
    
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
    
    // Si estamos en la página de catálogo, comprobar si hay una búsqueda en la URL
    if (window.location.pathname.includes('catalogo.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        
        if (searchQuery) {
            // Establecer el valor en el input
            if (searchInput) {
                searchInput.value = searchQuery;
            }
            // Cargar productos y realizar la búsqueda
            loadProducts().then(() => {
                performSearch();
            });
        } else {
            // Si no hay búsqueda, cargar todos los productos
            loadProducts();
        }
    }
});