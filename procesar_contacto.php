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
    
    // HTML para mostrar respuesta
    ?>
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Respuesta del Formulario</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <div class="response-container">
            <?php
            if (empty($errores)) {
                echo "<h2>¡Formulario enviado correctamente!</h2>";
                echo "<p>Gracias por contactar con nosotros, {$nombre}.</p>";
                echo "<p>Datos recibidos:</p>";
                echo "<ul>";
                echo "<li>Email: {$email}</li>";
                echo "<li>Teléfono: {$telefono}</li>";
                echo "<li>Tipo de consulta: {$tipoConsulta}</li>";
                echo "<li>Preferencia de contacto: {$contacto}</li>";
                echo "</ul>";
            } else {
                echo "<h2>Error en el formulario</h2>";
                echo "<ul>";
                foreach ($errores as $error) {
                    echo "<li>{$error}</li>";
                }
                echo "</ul>";
            }
            ?>
            <a href="contact.html" class="back-button">Volver al formulario</a>
        </div>
    </body>
    </html>
    <?php
} else {
    header("Location: contact.html");
    exit();
}
?>