// Helper to convert your new-logo.svg to animated paths
// How to use: 
// 1. Open new-logo.svg in a text editor
// 2. Copy each <path> element
// 3. Paste into this template

/*
TEMPLATE FOR ADDING ALL PATHS:

In logo-animation.html, replace the <g id="logo-paths"></g> section with:

<g id="logo-paths">
    <!-- Extract individual paths from new-logo.svg -->
    <!-- Each path should have class="logo-path" -->
    
    <!-- Example structure -->
    <path class="logo-path" d="M0 0 C0.66 0 1.32 0 2 0 C2.43... [rest of path]" 
          fill="none" stroke="#FEFEFF" transform="translate(X,Y)"/>
    
    <path class="logo-path" d="M0 0 C3.3590028 1.6795014... [rest of path]"
          fill="none" stroke="#FEFEFF" transform="translate(X,Y)"/>
    
    <!-- Continue for all 568 paths -->
</g>

WHY THIS MODULAR APPROACH IS BETTER:
✅ Separation of concerns - SVG separate from logic
✅ Easier to maintain - Change animation without touching HTML structure
✅ Reusable - Use same animation on multiple pages
✅ Scalable - Works with 1 path or 568 paths
✅ Performance - Only animate visible paths in viewport
✅ Flexibility - Easy to add triggers, events, interactions

OPTIMIZATION TIPS FOR MANY PATHS:

1. Group paths by layer/color:
   <g class="logo-path-group" data-color="primary">
     <!-- Primary color paths -->
   </g>
   <g class="logo-path-group" data-color="secondary">
     <!-- Secondary color paths -->
   </g>

2. Stagger by groups instead of individual paths:
   animateByGroup() {
     const groups = document.querySelectorAll('.logo-path-group');
     groups.forEach((group, index) => {
       const paths = group.querySelectorAll('.logo-path');
       paths.forEach((path, pathIndex) => {
         // Stagger within and between groups
       });
     });
   }

3. Use requestAnimationFrame for custom timing:
   animateWithRAF() {
     let progress = 0;
     const animate = () => {
       progress += 0.016; // 60fps
       if (progress < 1) requestAnimationFrame(animate);
     };
     animate();
   }

EXTRACTING PATHS PROGRAMMATICALLY:

// If you want to automate path extraction from new-logo.svg:
fetch('new-logo.svg')
  .then(r => r.text())
  .then(svg => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    const paths = doc.querySelectorAll('path');
    
    // Generate HTML for all paths
    let html = '<g id="logo-paths">\n';
    paths.forEach(path => {
      html += `  <path class="logo-path" d="${path.getAttribute('d')}" 
                     transform="${path.getAttribute('transform')}"/>\n`;
    });
    html += '</g>';
    
    console.log(html); // Copy this to your HTML
  });

ADVANCED: INTERACTIVE ANIMATION

// Resume animation on hover
document.getElementById('animated-logo').addEventListener('mouseenter', () => {
  logoAnimation.restart();
});

// Reverse animation on click
document.getElementById('animated-logo').addEventListener('click', () => {
  logoAnimation.reverse?.();
});

// Trigger on scroll into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      logoAnimation.animate();
      observer.unobserve(entry.target);
    }
  });
});
observer.observe(document.getElementById('animated-logo'));
*/

export { LogoAnimation };
