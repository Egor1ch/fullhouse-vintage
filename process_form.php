<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $tipoConsulta = $_POST['tipo-consulta'];
    $contacto = $_POST['contacto'];
    $mensaje = $_POST['mensaje'];
    
    // Aquí puedes procesar los datos (por ejemplo, enviar email o guardar en BD)
    // Por ahora solo mostraremos los datos recibidos
    echo "Datos recibidos:<br>";
    echo "Nombre: " . htmlspecialchars($nombre) . "<br>";
    echo "Email: " . htmlspecialchars($email) . "<br>";
    echo "Teléfono: " . htmlspecialchars($telefono) . "<br>";
    echo "Tipo de consulta: " . htmlspecialchars($tipoConsulta) . "<br>";
    echo "Preferencia de contacto: " . htmlspecialchars($contacto) . "<br>";
    echo "Mensaje: " . htmlspecialchars($mensaje) . "<br>";
}
?>
