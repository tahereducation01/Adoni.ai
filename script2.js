// ==================== 3D TILT EFFECT FOR CARDS ====================
// Only run on devices with a mouse (desktop/laptop)
if (window.matchMedia("(pointer: fine)").matches) {
    // Select the cards we want to tilt
    const tiltCards = document.querySelectorAll('.service-item, .testi-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            // Get mouse position relative to the card
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  

            // Find the center of the card
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (max 10 degrees). 
            // We invert the Y axis so it tilts *towards* the mouse
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;

            // Apply the 3D transform
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'transform 0.1s ease-out'; // Fast transition to stick to the mouse
        });

        // Snap back to flat when mouse leaves
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease-out'; // Slower, elegant snap back
        });
        
        // Remove transition delay when entering so it doesn't lag
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease-out';
        });
    });
}

// ==================== GLOWING SCROLL PROGRESS ====================
const scrollProgress = document.getElementById('scroll-progress');

if (scrollProgress) {
    gsap.to(scrollProgress, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: document.documentElement, // Changed from document.body
            start: "top top",
            end: "max",                        // The magic keyword to fix the offset
            scrub: 0.1
        }
    });
}