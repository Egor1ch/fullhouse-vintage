<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitizar las entradas
    $nombre = filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $telefono = filter_input(INPUT_POST, 'telefono', FILTER_SANITIZE_STRING);
    $tipoConsulta = filter_input(INPUT_POST, 'tipo-consulta', FILTER_SANITIZE_STRING);
    $contacto = filter_input(INPUT_POST, 'contacto', FILTER_SANITIZE_STRING);
    $mensaje = filter_input(INPUT_POST, 'mensaje', FILTER_SANITIZE_STRING);
    
    // Validar los datos
    $errores = [];
    
    if (empty($nombre) || preg_match('/[$@#]/', $nombre) || preg_match('/^[0-9]/', $nombre)) {
        $errores[] = "El nombre no es válido";
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errores[] = "El email no es válido";
    }
    
    if (empty($mensaje) || preg_match('/[$@#]/', $mensaje)) {
        $errores[] = "El mensaje no es válido";
    }
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Respuesta del Formulario - Fullhouse Vintage</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="shortcut icon" href="IMGs/logo-white.ico" />
</head>
<body>
    <!-- Header -->
    <header>
        <div class="logo-container">
            <div class="logo">
                <img src="IMGs/logo-white.png" alt="Fullhouse Vintage Logo">
            </div>
            <div class="logo-text">
                <h3>FULL HOUSE VINTAGE</h3>
            </div>
        </div>

        <nav>
            <ul class="menu">
                <li><a href="index.html">INICIO</a></li>
                <li><a href="catalogo.html">CATÁLOGO</a></li>
                <li><a href="nosotros.html">NOSOTROS</a></li>
                <li><a href="contact.html">CONTACTO</a></li>
            </ul>
        </nav>

        <div class="header-icons">
            <form class="search-container" id="searchForm">
                <input type="text" class="search-input" id="searchInput" placeholder="Buscar productos...">
                <button type="submit" class="search-icon">
                    <img src="IMGs/search.png" alt="Buscar" class="header-icon">
                </button>
            </form>
            <div class="icon-cart">
                <img src="IMGs/shopping-cart.png" alt="Carrito" class="header-icon">
                <span>0</span>
            </div>
            <a href="perfil.html" class="icon-link">
                <img src="IMGs/user.png" alt="Perfil" class="header-icon">
            </a>
        </div>
    </header>

    <!-- Contenido principal -->
    <section class="contact-section">
        <div class="contact-container">
            <div class="response-container">
                <?php if (empty($errores)): ?>
                    <h2>¡Formulario enviado correctamente!</h2>
                    <p>Gracias por contactar con nosotros, <?php echo htmlspecialchars($nombre); ?>.</p>
                    <div class="response-details">
                        <h3>Datos recibidos:</h3>
                        <ul>
                            <li><strong>Email:</strong> <?php echo htmlspecialchars($email); ?></li>
                            <li><strong>Teléfono:</strong> <?php echo htmlspecialchars($telefono); ?></li>
                            <li><strong>Tipo de consulta:</strong> <?php echo htmlspecialchars($tipoConsulta); ?></li>
                            <li><strong>Preferencia de contacto:</strong> <?php echo htmlspecialchars($contacto); ?></li>
                        </ul>
                    </div>
                <?php else: ?>
                    <h2>Error en el formulario</h2>
                    <div class="error-list">
                        <ul>
                            <?php foreach ($errores as $error): ?>
                                <li><?php echo htmlspecialchars($error); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                <?php endif; ?>
                <div class="button-container">
                    <a href="index.html" class="back-button">Volver al Inicio</a>
                </div>
            </div>
            <div class="logo-response">
                <img src="IMGs/logo-black.png" alt="Full House Vintage Logo">
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h4>Sobre Nosotros</h4>
                <p>Full House Vintage, tu destino para moda vintage auténtica y sostenible desde 2010.</p>
                <div class="social-links">
                    <a href="#"><img src="IMGs/fb.png" alt="Facebook" class="social-icon"></a>
                    <a href="#"><img src="IMGs/inst.png" alt="Instagram" class="social-icon"></a>
                    <a href="#"><img src="IMGs/X.png" alt="Twitter" class="social-icon"></a>
                </div>
            </div>

            <div class="footer-section">
                <h4>Enlaces Rápidos</h4>
                <ul class="footer-links">
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="catalogo.html">Catálogo</a></li>
                    <li><a href="nosotros.html">Nosotros</a></li>
                    <li><a href="contact.html">Contacto</a></li>
                </ul>
            </div>

            <div class="footer-section">
                <h4>Ayuda</h4>
                <ul class="footer-links">
                    <li><a href="nosotros.html">FAQ</a></li>
                    <li><a href="envios.html">Envíos</a></li>
                    <li><a href="devoluciones.html">Devoluciones</a></li>
                    <li><a href="privacidad.html">Política de Privacidad</a></li>
                </ul>
            </div>

            <div class="footer-section">
                <h4>Contacto</h4>
                <ul class="footer-links">
                    <li>📍 Calle Principal, 123</li>
                    <li>📞 +34 123 456 789</li>
                    <li>✉️ info@fullhousevintage.com</li>
                </ul>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; 2024 Full House Vintage. Todos los derechos reservados.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
<?php
} else {
    header("Location: contact.html");
    exit();
}
?>