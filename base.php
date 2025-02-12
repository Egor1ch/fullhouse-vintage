<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $nombre = $_POST['nombre'] ?? '';
    $email = $_POST['email'] ?? '';
    $asunto = $_POST['asunto'] ?? '';
    $mensaje = $_POST['mensaje'] ?? '';
    $preferencias = $_POST['preferencias'] ?? [];
    $horario = $_POST['horario'] ?? '';

    // Validar los datos
    if (empty($nombre) || empty($email) || empty($mensaje)) {
        die("Por favor, complete todos los campos obligatorios");
    }

    // Configurar el correo
    $to = "tu@email.com"; // Cambiar por el email del administrador
    $subject = "Nuevo mensaje de contacto: $asunto";
    
    $message = "Nombre: $nombre\n";
    $message .= "Email: $email\n";
    $message .= "Asunto: $asunto\n";
    $message .= "Preferencias de contacto: " . implode(", ", $preferencias) . "\n";
    $message .= "Horario preferido: $horario\n";
    $message .= "Mensaje:\n$mensaje";

    $headers = "From: $email";

    // Enviar el correo
    if(mail($to, $subject, $message, $headers)) {
        echo "<script>
                alert('Mensaje enviado correctamente');
                window.location.href = 'contact.html';
              </script>";
    } else {
        echo "<script>
                alert('Error al enviar el mensaje');
                window.location.href = 'contact.html';
              </script>";
    }
}
?>