function validarFormulario(event) {
    event.preventDefault();
    
    // Obtener los campos del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const tipoConsulta = document.getElementById('tipo-consulta').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    const politicaPrivacidad = document.getElementById('politicaPrivacidad').checked;

    // Expresiones regulares para validar caracteres
    const caracteresProhibidos = /[$@#]/;
    const comienzaConNumero = /^[0-9]/;

    // Validar que no haya campos vacíos
    if (!nombre || !email || !telefono || !tipoConsulta || !mensaje) {
        alert('Por favor, complete todos los campos obligatorios');
        return false;
    }

    // Validar que no haya caracteres especiales prohibidos
    if (caracteresProhibidos.test(nombre) || caracteresProhibidos.test(mensaje)) {
        alert('Los campos no pueden contener los caracteres $, @ o #');
        return false;
    }

    // Validar que el nombre no comience con un número
    if (comienzaConNumero.test(nombre)) {
        alert('El nombre no puede comenzar con un número');
        return false;
    }

    // Validar que se haya aceptado la política de privacidad
    if (!politicaPrivacidad) {
        alert('Debe aceptar la política de privacidad');
        return false;
    }

    // Si todo está bien, enviar el formulario
    document.querySelector('.contact-form').submit();
    return true;
}

// Evento para el checkbox "Aceptar todo"
document.getElementById('aceptarTodo')?.addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked; // Marcar o desmarcar todos los checkboxes
    });
});