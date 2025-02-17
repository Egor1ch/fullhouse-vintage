class StaticProductGenerator {
    constructor() {
        this.productos = [];
        this.template = '';
    }

    async generateStaticPages() {
        try {
            // Cargar datos de productos
            const productos = await this.loadProductData();
            
            // Cargar plantilla
            const template = await this.loadTemplate();

            // Generar HTML para cada producto
            productos.forEach(producto => {
                const htmlContent = this.generateProductHTML(template, producto);
                const fileName = `productos/${producto.id}.html`;
                
                // Mostrar el HTML generado en la consola
                console.log(`\n--- ${fileName} ---`);
                console.log(htmlContent);
                
                // En un entorno de desarrollo real, aquí guardarías el archivo
                this.saveToFile(fileName, htmlContent);
            });

            // Generar índice de productos
            this.generateProductIndex(productos);

        } catch (error) {
            console.error('Error generando páginas:', error);
        }
    }

    async loadProductData() {
        const response = await fetch('data/productos.json');
        const data = await response.json();
        return data.productos;
    }

    async loadTemplate() {
        const response = await fetch('templates/producto.html');
        return await response.text();
    }

    generateProductHTML(template, producto) {
        let html = template;

        // Reemplazar placeholders simples
        Object.entries(producto).forEach(([key, value]) => {
            if (typeof value === 'string' || typeof value === 'number') {
                html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
            }
        });

        // Procesar imágenes adicionales
        const imagenesHTML = producto.imagenes_adicionales
            .map(img => `<img src="${img}" alt="Vista adicional" class="thumbnail">`)
            .join('\n');
        html = html.replace('{{#each imagenes_adicionales}}{{/each}}', imagenesHTML);

        // Procesar medidas
        const medidasHTML = producto.medidas
            .map(medida => `
                <tr>
                    <td>${medida.nombre}</td>
                    <td>${medida.valor} cm</td>
                </tr>`)
            .join('\n');
        html = html.replace('{{#each medidas}}{{/each}}', medidasHTML);

        return html;
    }

    generateProductIndex(productos) {
        const indexHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo de Productos - Fullhouse Vintage</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
    <div class="products-grid">
        ${productos.map(producto => `
        <div class="product-card">
            <a href="${producto.id}.html">
                <img src="../${producto.imagen_principal}" alt="${producto.nombre_producto}">
                <h3>${producto.nombre_producto}</h3>
                <p class="price">${producto.precio}€</p>
            </a>
        </div>
        `).join('\n')}
    </div>
</body>
</html>`;

        console.log('\n--- productos/index.html ---');
        console.log(indexHTML);
        
        // En un entorno real, aquí guardarías el archivo
        this.saveToFile('productos/index.html', indexHTML);
    }

    saveToFile(fileName, content) {
        // Esta función es solo para demostración
        // En un entorno real, necesitarías crear los archivos físicamente
        console.log(`Archivo generado: ${fileName}`);
    }
}

// Uso del generador
document.addEventListener('DOMContentLoaded', () => {
    const generator = new StaticProductGenerator();
    generator.generateStaticPages();
});
