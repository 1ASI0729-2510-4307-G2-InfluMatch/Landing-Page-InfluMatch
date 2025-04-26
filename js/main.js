const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu) {
    mobileMenu.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (!track || !prevBtn || !nextBtn) return;

    const cards = track.querySelectorAll('.testimonial-card');
    const cardCount = cards.length;
    const cardWidth = 100; // Porcentaje
    let currentIndex = 0;
    let isTransitioning = false;

    function initCarousel() {
        track.style.width = `${cardCount * 100}%`;

        cards.forEach(card => {
            if (window.innerWidth >= 768) {
                card.style.width = `${cardWidth / 2}%`; // 2 tarjetas visibles en pantallas grandes
            } else {
                card.style.width = `${cardWidth}%`; // 1 tarjeta visible en pantallas pequeñas
            }
        });

        updateCarouselPosition();
    }

    function updateCarouselPosition() {
        if (window.innerWidth >= 768) {
            track.style.transform = `translateX(-${currentIndex * (cardWidth / 2)}%)`;
        } else {
            track.style.transform = `translateX(-${currentIndex * cardWidth}%)`;
        }
    }

    // Manejar el botón siguiente
    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;

        isTransitioning = true;
        currentIndex++;

        // Si llegamos al final, preparamos para el loop
        if (currentIndex >= cardCount - (window.innerWidth >= 768 ? 2 : 1)) {
            updateCarouselPosition();

            // Después de la transición, reseteamos al inicio sin animación
            setTimeout(() => {
                track.style.transition = 'none';
                currentIndex = 0;
                updateCarouselPosition();

                // Reactivamos la transición después de resetear
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s ease-in-out';
                    isTransitioning = false;
                }, 50);
            }, 500);
        } else {
            updateCarouselPosition();
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;

        isTransitioning = true;

        if (currentIndex <= 0) {
            track.style.transition = 'none';
            currentIndex = cardCount - (window.innerWidth >= 768 ? 2 : 1);
            updateCarouselPosition();

            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
                currentIndex--;
                updateCarouselPosition();
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            }, 50);
        } else {
            currentIndex--;
            updateCarouselPosition();
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    });

    initCarousel();

    let autoSlide = setInterval(() => {
        nextBtn.click();
    }, 5000);

    track.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    track.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            nextBtn.click();
        }, 5000);
    });

    window.addEventListener('resize', () => {
        initCarousel();
    });

    track.addEventListener('transitionend', () => {
        isTransitioning = false;
    });
});

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const consent = document.getElementById('consent').checked;

        if (!name || !email || !message || !consent) {
            alert('Por favor, completa todos los campos y acepta los términos.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, introduce un correo electrónico válido.');
            return;
        }

        alert('¡Gracias por contactarnos! Te responderemos lo antes posible.');
        contactForm.reset();
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.flow-image, .plan, .testimonial');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = element.classList.contains('plan') && element.classList.contains('featured')
                ? 'scale(1.05) translateY(0)'
                : 'translateY(0)';
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.flow-image, .plan, .testimonial');

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);