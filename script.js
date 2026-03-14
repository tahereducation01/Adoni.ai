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

// ==================== SIDE DRAWER & DEMO FORM LOGIC ====================
const drawer = document.getElementById('lead-drawer');
const overlay = document.getElementById('drawer-overlay');
const closeDrawerBtn = document.getElementById('close-drawer');
const drawerForm = document.getElementById('drawer-form');
const drawerResult = document.getElementById('drawer-form-result');
const drawerSubmitBtn = document.getElementById('drawer-submit-btn');

// Function to open drawer
function openDrawer(e) {
    if (e) e.preventDefault();
    if (!drawer || !overlay) return;

    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevents native background scrolling

    // NEW: Stop Lenis from scrolling the background
    if (typeof lenis !== 'undefined') {
        lenis.stop();
    }
}

// Function to close drawer
function closeDrawer() {
    if (!drawer || !overlay) return;

    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = ''; // Restores native background scrolling

    // NEW: Restart Lenis smooth scrolling
    if (typeof lenis !== 'undefined') {
        lenis.start();
    }
}

// Attach listeners to close buttons
if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
if (overlay) overlay.addEventListener('click', closeDrawer);

// Delegated click listener for any element (now or later) with the class 'trigger-drawer'
document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.trigger-drawer');
    if (!trigger) return;
    openDrawer(e);
});

// Handle Form Submission via AJAX (Web3Forms)
if (drawerForm) {
    drawerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        drawerSubmitBtn.innerHTML = "Processing...";
        drawerSubmitBtn.disabled = true;
        
        const formData = new FormData(drawerForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                drawerResult.style.display = "block";
                drawerResult.style.color = "#00FFAA"; // Success green
                drawerResult.innerHTML = "Success! Your demo is requested. We will contact you shortly.";
                drawerForm.reset();
            } else {
                drawerResult.style.display = "block";
                drawerResult.style.color = "#FF0055"; // Error red
                drawerResult.innerHTML = json.message;
            }
        })
        .catch(error => {
            drawerResult.style.display = "block";
            drawerResult.style.color = "#FF0055";
            drawerResult.innerHTML = "System offline. Please try again later.";
        })
        .finally(() => {
            drawerSubmitBtn.innerHTML = "Schedule Call";
            drawerSubmitBtn.disabled = false;
            setTimeout(() => { drawerResult.style.display = "none"; }, 6000);
        });
    });
}
