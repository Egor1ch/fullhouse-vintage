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