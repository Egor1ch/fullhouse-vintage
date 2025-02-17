class ProductoGenerator {
    constructor() {
        this.templatePath = 'producto.html';
        this.outputPath = 'productos/';
        this.dataPath = 'data/productos.json';
    }

    async init() {
        try {
            // Cargar la plantilla
            const templateResponse = await fetch(this.templatePath);
            this.template = await templateResponse.text();

            // Cargar los datos de productos
            const dataResponse = await fetch(this.dataPath);
            this.productos = await dataResponse.json();

            // Generar páginas
            await this.generarPaginas();
        } catch (error) {
            console.error('Error inicializando el generador:', error);
        }
    }

    async generarPaginas() {
        for (const producto of this.productos.productos) {
            await this.generarPaginaProducto(producto);
        }
    }

    async generarPaginaProducto(producto) {
        let contenido = this.template;

        // Reemplazar todos los placeholders con datos reales
        for (const [key, value] of Object.entries(producto)) {
            if (typeof value === 'string' || typeof value === 'number') {
                contenido = contenido.replace(new RegExp(`{{${key}}}`, 'g'), value);
            }
        }

        // Manejar arrays y objetos especiales
        contenido = this.procesarImagenesAdicionales(contenido, producto.imagenes_adicionales);
        contenido = this.procesarMedidas(contenido, producto.medidas);

        // Guardar el archivo
        await this.guardarArchivo(producto.id, contenido);
    }

    procesarImagenesAdicionales(contenido, imagenes) {
        let imagenesHTML = '';
        imagenes.forEach((imagen, index) => {
            imagenesHTML += `<img src="${imagen}" alt="Vista ${index + 1}" class="thumbnail">`;
        });
        return contenido.replace('{{#each imagenes_adicionales}}{{/each}}', imagenesHTML);
    }

    procesarMedidas(contenido, medidas) {
        let medidasHTML = '';
        medidas.forEach(medida => {
            medidasHTML += `
                <tr>
                    <td>${medida.nombre}</td>
                    <td>${medida.valor} cm</td>
                </tr>`;
        });
        return contenido.replace('{{#each medidas}}{{/each}}', medidasHTML);
    }

    async guardarArchivo(id, contenido) {
        try {
            const response = await fetch('/save-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    content: contenido
                })
            });

            if (!response.ok) {
                throw new Error('Error guardando el archivo');
            }

            console.log(`Página generada: ${id}.html`);
        } catch (error) {
            console.error('Error guardando la página:', error);
        }
    }
}

// Inicializar el generador cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    const generator = new ProductoGenerator();
    generator.init();
});
