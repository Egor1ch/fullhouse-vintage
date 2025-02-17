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

// Inicializar el cliente de Supabase
const supabaseUrl = 'https://eddrkybatnndihmxlrhi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkZHJreWJhdG5uZGlobXhscmhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MTI1MjMsImV4cCI6MjA1NTM4ODUyM30.7IXG-Ii6qkDfS5kZCopQ2P3Esq8tGVqpAMNNBwUbA6Y';

// Crear el cliente de Supabase usando la versión UMD
const supabase = window.supabaseClient;

// Verificar que el cliente se ha creado correctamente
console.log('Cliente Supabase inicializado:', supabase);

// Función de prueba mejorada
async function testSupabaseConnection() {
    console.log('Iniciando prueba de conexión...');
    if (!supabase) {
        console.error('Error: Supabase no está inicializado');
        return false;
    }

    try {
        const { data, error } = await supabase
            .from('productos')
            .select('count');
        
        if (error) throw error;
        
        console.log('Conexión exitosa:', data);
        return true;
    } catch (error) {
        console.error('Error de conexión:', error);
        return false;
    }
}

// Función para probar en consola
window.testSupabase = async () => {
    const result = await testSupabaseConnection();
    console.log('Resultado de la prueba:', result);
};

// Elementos del DOM
const productosContainer = document.getElementById('productos')
const loader = document.getElementById('loader')

// Función mejorada para probar la conexión
async function testSupabaseConnection() {
    console.log('Iniciando prueba de conexión con Supabase...');
    
    // Verificar que supabase está definido
    if (!supabase) {
        console.error('Error: Cliente Supabase no inicializado');
        updateConnectionStatus('error', 'Cliente no inicializado');
        return false;
    }

    try {
        console.log('Intentando consulta a Supabase...');
        const { data, error } = await supabase
            .from('productos')
            .select('count');

        console.log('Respuesta recibida:', { data, error });

        if (error) {
            throw error;
        }

        updateConnectionStatus('success', '✅ Conectado a Supabase');
        return true;
    } catch (error) {
        console.error('Error detallado:', error);
        updateConnectionStatus('error', '❌ Error: ' + error.message);
        return false;
    }
}

// Función auxiliar para actualizar el estado de conexión
function updateConnectionStatus(type, message) {
    const statusElement = document.getElementById('connectionStatus');
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.style.color = type === 'success' ? 'green' : 'red';
        statusElement.style.display = 'block';
        console.log('Estado de conexión actualizado:', message);
    } else {
        console.error('Elemento connectionStatus no encontrado');
    }
}

// Función para cargar los productos
async function cargarProductos() {
    try {
        const loader = document.getElementById('loader');
        const featuredGrid = document.getElementById('featured-grid');
        
        if (!featuredGrid) return; // Si no existe el contenedor, salir
        
        loader.style.display = 'block';
        
        const { data: productos, error } = await supabase
            .from('productos')
            .select('*')
            .limit(4); // Limitamos a 4 productos destacados

        if (error) throw error;

        // Limpiar el contenedor
        featuredGrid.innerHTML = '';

        // Mostrar los productos
        productos.forEach(producto => {
            const productoCard = `
                <article class="featured-item">
                    <img src="${producto.imagen || 'IMGs/placeholder.jpg'}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p class="price">${producto.precio} €</p>
                    <a href="producto.html?id=${producto.id}" class="view-product">Ver producto</a>
                    <button class="add-to-cart" data-id="${producto.id}">Añadir al carrito</button>
                </article>
            `;
            featuredGrid.insertAdjacentHTML('beforeend', productoCard);
        });
    } catch (error) {
        console.error('Error:', error.message);
        const featuredGrid = document.getElementById('featured-grid');
        if (featuredGrid) {
            featuredGrid.innerHTML = `
                <div class="error">
                    Error al cargar los productos. Por favor, intenta más tarde.
                </div>
            `;
        }
    } finally {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.display = 'none';
        }
    }
}

// Función para ver detalles de un producto
async function verDetalles(id) {
    try {
        const { data: producto, error } = await supabase
            .from('productos')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error

        alert(`
            Producto: ${producto.nombre}
            Precio: $${producto.precio}
            Descripción: ${producto.descripcion}
        `)
    } catch (error) {
        console.error('Error:', error.message)
        alert('Error al cargar los detalles del producto')
    }
}

// Modificar el evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM cargado, iniciando prueba de conexión...');
    await testSupabaseConnection();
    initializeProfile();
    cargarProductos();
});