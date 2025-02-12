function validateForm() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    // Validar que no esté vacío
    if (!nombre || !email || !mensaje) {
        alert('Por favor, complete todos los campos obligatorios');
        return false;
    }

    // Validar que no comience con número
    if (/^\d/.test(nombre)) {
        alert('El nombre no puede comenzar con un número');
        return false;
    }

    // Validar caracteres especiales en el nombre
    if (/[$@#]/.test(nombre)) {
        alert('El nombre no puede contener caracteres especiales como $, @, #');
        return false;
    }

    return true;
}