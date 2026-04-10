// Logo Animation Module
class LogoAnimation {
  constructor(containerId = 'logo-animation-container') {
    this.container = document.getElementById(containerId);
    this.logo = document.getElementById('animated-logo');
    this.paths = document.querySelectorAll('.logo-path');
    this.animationDuration = 0.8; // Duration per path
    this.staggerDelay = 0.05; // Delay between each path
    this.totalPaths = this.paths.length;
  }

  /**
   * Initialize stroke animation (sets up stroke-dasharray and stroke-dashoffset)
   */
  initializeStrokes() {
    this.paths.forEach((path) => {
      const length = path.getTotalLength();
      // Set stroke properties
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });
  }

  /**
   * Animate logo with step-by-step drawing effect
   * Uses GSAP if available, falls back to CSS animations
   */
  animate() {
    this.initializeStrokes();

    if (typeof gsap !== 'undefined') {
      this.animateWithGSAP();
    } else {
      this.animateWithCSS();
    }
  }

  /**
   * Animation using GSAP (preferred method)
   */
  animateWithGSAP() {
    const timeline = gsap.timeline();

    this.paths.forEach((path, index) => {
      const length = path.getTotalLength();
      
      timeline.to(
        path,
        {
          strokeDashoffset: 0,
          duration: this.animationDuration,
          ease: 'power2.out',
        },
        index * this.staggerDelay // Stagger effect
      );
    });

    return timeline;
  }

  /**
   * Fallback animation using CSS (no GSAP required)
   */
  animateWithCSS() {
    this.paths.forEach((path, index) => {
      const delay = index * this.staggerDelay;
      path.style.animation = `stroke-draw ${this.animationDuration}s ease-in-out forwards`;
      path.style.animationDelay = `${delay}s`;
    });
  }

  /**
   * Stop animation
   */
  stop() {
    this.paths.forEach((path) => {
      path.style.animation = 'none';
    });
  }

  /**
   * Reset animation
   */
  reset() {
    this.initializeStrokes();
    this.stop();
  }

  /**
   * Restart animation from beginning
   */
  restart() {
    this.reset();
    this.animate();
  }

  /**
   * Get animation progress (0-1)
   */
  getProgress() {
    const totalDuration = (this.totalPaths - 1) * this.staggerDelay + this.animationDuration;
    // This would require tracking with a timeline
    return 0;
  }
}

// Export for use as module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LogoAnimation;
}

// Add CSS keyframe for fallback animation
(function() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes stroke-draw {
      to {
        stroke-dashoffset: 0;
      }
    }
  `;
  document.head.appendChild(style);
})();
