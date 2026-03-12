// ==================== CASE STUDY SPECIFIC JS ====================

// 1. Auto Image Slider (Changes every 1.5 seconds)
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

if(slides.length > 0) {
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 1500); 
}

// 2. Mobile Navbar Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');

if(mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
}
