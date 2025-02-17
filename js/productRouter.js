class ProductRouter {
    constructor() {
        this.productosData = null;
        this.init();
    }

    async init() {
        try {
            // Cargar datos de productos
            const response = await fetch('/data/productos.json');
            this.productosData = await response.json();

            // Manejar navegación
            this.handleNavigation();

            // Escuchar cambios en la URL
            window.addEventListener('popstate', () => this.handleNavigation());
        } catch (error) {
            console.error('Error inicializando el router:', error);
        }
    }

    handleNavigation() {
        const path = window.location.pathname;
        const productId = path.match(/\/productos\/(.+)\.html$/)?.[1];

        if (productId) {
            this.mostrarProducto(productId);
        }
    }

    async mostrarProducto(productId) {
        const producto = this.productosData.productos.find(p => p.id === productId);
        
        if (producto) {
            // Actualizar el contenido de la página con los datos del producto
            document.title = `${producto.nombre_producto} - Fullhouse Vintage`;
            
            // Actualizar metadatos
            this.actualizarMetadatos(producto);

            // Actualizar contenido principal
            this.actualizarContenido(producto);

            // Inicializar funcionalidades específicas del producto
            this.initProductFunctionality(producto);
        } else {
            // Redirigir a 404 o página de error
            window.location.href = '/404.html';
        }
    }

    actualizarMetadatos(producto) {
        document.querySelector('meta[name="description"]').content = producto.descripcion;
        // Actualizar otros metadatos según necesites
    }

    actualizarContenido(producto) {
        // Actualizar la imagen principal
        document.querySelector('.main-image img').src = producto.imagen_principal;

        // Actualizar miniaturas
        const thumbnailsContainer = document.querySelector('.thumbnail-gallery');
        thumbnailsContainer.innerHTML = producto.imagenes_adicionales
            .map(img => `<img src="${img}" alt="Vista adicional" class="thumbnail">`)
            .join('');

        // Actualizar información del producto
        document.querySelector('.product-title').textContent = producto.nombre_producto;
        document.querySelector('.product-price').textContent = `${producto.precio}€`;
        // ... actualizar resto de elementos
    }

    initProductFunctionality(producto) {
        // Inicializar galería de imágenes
        this.initImageGallery();

        // Inicializar controles de cantidad
        this.initQuantityControls(producto.stock);

        // Inicializar botones de acción
        this.initActionButtons(producto);
    }

    initImageGallery() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.querySelector('.main-image img');

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                mainImage.src = thumb.src;
            });
        });
    }

    initQuantityControls(stock) {
        const input = document.querySelector('#quantity');
        const minusBtn = document.querySelector('.minus');
        const plusBtn = document.querySelector('.plus');

        minusBtn.addEventListener('click', () => {
            const currentValue = parseInt(input.value);
            if (currentValue > 1) input.value = currentValue - 1;
        });

        plusBtn.addEventListener('click', () => {
            const currentValue = parseInt(input.value);
            if (currentValue < stock) input.value = currentValue + 1;
        });
    }

    initActionButtons(producto) {
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        const addToWishlistBtn = document.querySelector('.add-to-wishlist-btn');

        addToCartBtn.addEventListener('click', () => {
            const quantity = document.querySelector('#quantity').value;
            this.addToCart(producto, quantity);
        });

        addToWishlistBtn.addEventListener('click', () => {
            this.addToWishlist(producto);
        });
    }

    addToCart(producto, quantity) {
        // Implementar lógica del carrito
        console.log(`Añadido al carrito: ${quantity} x ${producto.nombre_producto}`);
    }

    addToWishlist(producto) {
        // Implementar lógica de favoritos
        console.log(`Añadido a favoritos: ${producto.nombre_producto}`);
    }
}

// Inicializar el router cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    const router = new ProductRouter();
});
