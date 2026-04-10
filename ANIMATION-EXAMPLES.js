/**
 * Enhanced Logo Animation - Examples
 * Copy any of these snippets into your main.js or script.js to add features
 */

// ============================================
// EXAMPLE 1: Auto-play animation on page load (current setup)
// ============================================
// Already implemented in index.html

// ============================================
// EXAMPLE 2: Replay animation button
// ============================================
function setupAnimationControls() {
  // Add a replay button
  const button = document.createElement('button');
  button.textContent = 'Replay Animation';
  button.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    background: #4F79EF;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    z-index: 1000;
    font-weight: 500;
  `;
  button.onclick = () => {
    if (window.logoAnimation) {
      window.logoAnimation.restart();
    }
  };
  // Uncomment to add:
  // document.body.appendChild(button);
}

// ============================================
// EXAMPLE 3: Sync animation with loader countdown
// ============================================
function syncLoaderWithAnimation() {
  const loader = document.getElementById('loader');
  const logoAnim = window.logoAnimation;
  
  // Calculate loader duration based on animation
  const totalDuration = (logoAnim.totalPaths - 1) * logoAnim.staggerDelay + logoAnim.animationDuration;
  const additionalTime = 0.5; // Extra time after animation
  const loaderDuration = totalDuration + additionalTime;
  
  // Hide loader after animation completes
  setTimeout(() => {
    loader.style.transition = 'opacity 0.5s ease-out';
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
      document.body.classList.remove('loading');
    }, 500);
  }, loaderDuration * 1000);
}

// ============================================
// EXAMPLE 4: Animation on scroll into view
// ============================================
function setupScrollTriggerAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        if (window.logoAnimation) {
          window.logoAnimation.restart();
          entry.target.dataset.animated = 'true';
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  // Observe any element with class "logo-animation-trigger"
  document.querySelectorAll('.logo-animation-trigger').forEach(el => {
    observer.observe(el);
  });
}

// ============================================
// EXAMPLE 5: Keyboard shortcut to restart
// ============================================
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Press 'L' to restart logo animation
    if (e.key === 'l' || e.key === 'L') {
      if (window.logoAnimation) {
        window.logoAnimation.restart();
        console.log('🎨 Logo animation restarted');
      }
    }
    // Press 'R' to reset
    if (e.key === 'r' || e.key === 'R') {
      if (window.logoAnimation) {
        window.logoAnimation.reset();
        console.log('🔄 Logo animation reset');
      }
    }
  });
}

// ============================================
// EXAMPLE 6: Performance monitoring
// ============================================
function monitorAnimationPerformance() {
  if (window.logoAnimation) {
    const startTime = performance.now();
    window.logoAnimation.animate();
    
    // Log after completion
    setTimeout(() => {
      const endTime = performance.now();
      const fps = Math.round(1000 / (endTime - startTime));
      console.log(`⚡ Animation completed in ${(endTime - startTime).toFixed(2)}ms`);
      console.log(`📊 Average FPS: ${fps}`);
    }, 2000);
  }
}

// ============================================
// EXAMPLE 7: Progress indicator
// ============================================
function createAnimationProgress() {
  const progressBar = document.createElement('div');
  progressBar.id = 'animation-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #4F79EF, #6F9BFF);
    width: 0%;
    transition: width 0.1s linear;
    z-index: 9999;
  `;
  document.body.appendChild(progressBar);
  
  // Update progress during animation
  if (window.logoAnimation) {
    const totalDuration = (window.logoAnimation.totalPaths - 1) * window.logoAnimation.staggerDelay 
                         + window.logoAnimation.animationDuration;
    const interval = setInterval(() => {
      if (parseFloat(progressBar.style.width) >= 100) {
        clearInterval(interval);
        progressBar.style.width = '100%';
      } else {
        progressBar.style.width = (parseFloat(progressBar.style.width) + 5) + '%';
      }
    }, (totalDuration * 1000) / 20);
  }
}

// ============================================
// EXAMPLE 8: Loader timeline sync (GSAP)
// ============================================
function syncWithGSAP() {
  if (typeof gsap !== 'undefined' && window.logoAnimation) {
    const loaderTimeline = gsap.timeline();
    
    // Animate loader text while logo draws
    loaderTimeline.to('.loader-text', {
      duration: 0.5,
      opacity: 1,
      delay: 0.5
    });
    
    // Fade loader after animation
    loaderTimeline.to('#loader', {
      duration: 1,
      opacity: 0,
      delay: 1
    });
  }
}

// ============================================
// EXAMPLE 9: Add glow effect during animation
// ============================================
function addGlowEffect() {
  const logo = document.getElementById('animated-logo');
  if (logo && window.logoAnimation) {
    const animationStart = window.logoAnimation.animate.bind(window.logoAnimation);
    
    window.logoAnimation.animate = function() {
      // Add glow
      logo.style.filter = 'drop-shadow(0 0 30px rgba(79, 121, 239, 1))';
      
      // Call original animation
      animationStart();
      
      // Remove glow after completion
      const totalDuration = (this.totalPaths - 1) * this.staggerDelay + this.animationDuration;
      setTimeout(() => {
        logo.style.filter = 'drop-shadow(0 0 20px rgba(79, 121, 239, 0.5))';
      }, totalDuration * 1000);
    };
  }
}

// ============================================
// EXAMPLE 10: Mobile-specific optimization
// ============================================
function optimizeForMobile() {
  const isMobile = window.innerWidth < 768;
  
  if (isMobile && window.logoAnimation) {
    // Reduce stagger on mobile for faster perceived loading
    window.logoAnimation.staggerDelay = 0.02;
    window.logoAnimation.animationDuration = 0.6;
  }
}

// ============================================
// INITIALIZE ALL (copy to main.js)
// ============================================
// Uncomment what you want to use:

// setupAnimationControls();
// setupScrollTriggerAnimation();
// setupKeyboardShortcuts();
// monitorAnimationPerformance();
// createAnimationProgress();
// syncWithGSAP();
// addGlowEffect();
// optimizeForMobile();
// syncLoaderWithAnimation();

// ============================================
// Quick test in browser console:
// ============================================
// window.logoAnimation.animate();      // Play
// window.logoAnimation.reset();        // Reset
// window.logoAnimation.restart();      // Restart
// window.logoAnimation.stop();         // Stop

console.log('🎨 Logo Animation Examples loaded. Uncomment in ANIMATION-ADVANCED.js to use.');
