gsap.registerPlugin(ScrollTrigger);

// ==================== LENIS SMOOTH SCROLL ====================
const lenis = new Lenis({ lerp: 0.08 });
lenis.stop();
window.scrollTo(0, 0);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// ==================== HAMBURGER MENU TOGGLE ====================
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        hamburgerBtn.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburgerBtn.classList.remove('active');
        });
    });
}

// ==================== 3D PARTICLE ENGINE (OPTIMIZED) ====================
const canvas = document.getElementById('webgl-canvas');
const ctx = canvas.getContext('2d', { alpha: false });
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

const camera = { x: 0, y: 0, z: -2000, fov: 350 };
const mouse = { x: 0, y: 0 };
window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX - width / 2) * 0.5;
    mouse.y = (e.clientY - height / 2) * 0.5;
});

class Node3D {
    constructor() {
        this.x = (Math.random() - 0.5) * 2000;
        this.y = (Math.random() - 0.5) * 2000;
        this.z = Math.random() * 4000;
        this.tx = this.x; this.ty = this.y; this.tz = this.z;
        this.radius = Math.random() * 2 + 1;
        this.color = Math.random() > 0.8 ? '#ffffff' : '#00F0FF';
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.005 + 0.002;
        this.screenX = 0; this.screenY = 0; this.screenR = 0;
    }

    update() {
        this.x += (this.tx - this.x) * 0.02;
        this.y += (this.ty - this.y) * 0.02;
        this.z += (this.tz - this.z) * 0.02;
        this.angle += this.speed;
        const ox = this.x + Math.cos(this.angle) * 20;
        const oy = this.y + Math.sin(this.angle) * 20;

        const dz = this.z - camera.z;

        if (dz < 10) {
            this.z += 6000 + Math.random() * 4000;
            this.tz = this.z;
            this.x = (Math.random() - 0.5) * 3000;
            this.y = (Math.random() - 0.5) * 3000;
            return false;
        }

        const scale = camera.fov / dz;
        this.screenX = (ox - camera.x) * scale + width / 2;
        this.screenY = (oy - camera.y) * scale + height / 2;
        this.screenR = this.radius * scale;

        return this.screenX > -50 && this.screenX < width + 50 && this.screenY > -50 && this.screenY < height + 50;
    }

    draw() {
        const depthAlpha = Math.max(0, 1 - ((this.z - camera.z) / 5000));
        ctx.beginPath();
        ctx.arc(this.screenX, this.screenY, this.screenR, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = depthAlpha;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

const isMobile = window.innerWidth <= 768;
const numNodes = isMobile ? 120 : 350;
const nodes = Array.from({ length: numNodes }, () => new Node3D());

let animationFrame;
function animate() {
    ctx.fillStyle = '#020305';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(2, 3, 5, 0.4)';
    ctx.fillRect(0, 0, width, height);

    camera.x += (mouse.x - camera.x) * 0.05;
    camera.y += (mouse.y - camera.y) * 0.05;

    const visibleNodes = [];
    nodes.forEach(node => {
        if (node.update()) {
            node.draw();
            visibleNodes.push(node);
        }
    });

    const maxConnections = 6;
    ctx.lineWidth = 0.5;
    for (let i = 0; i < visibleNodes.length; i++) {
        for (let j = i + 1; j < i + maxConnections && j < visibleNodes.length; j++) {
            const n1 = visibleNodes[i];
            const n2 = visibleNodes[j];
            if (Math.abs(n1.screenX - n2.screenX) < 150 && Math.abs(n1.screenY - n2.screenY) < 150) {
                const dist3D = Math.sqrt(Math.pow(n1.x - n2.x, 2) + Math.pow(n1.y - n2.y, 2) + Math.pow(n1.z - n2.z, 2));
                if (dist3D < 300) {
                    const depthAlpha = Math.max(0, 1 - ((n1.z - camera.z) / 4000));
                    const lineAlpha = (1 - dist3D / 300) * depthAlpha * 0.5;
                    ctx.beginPath();
                    ctx.moveTo(n1.screenX, n1.screenY);
                    ctx.lineTo(n2.screenX, n2.screenY);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
                    ctx.stroke();
                }
            }
        }
    }
    animationFrame = requestAnimationFrame(animate);
}
animate();

document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(animationFrame);
    else animate();
});

// ==================== LOADER & SCROLL TRIGGERS ====================
function formSphere() {
    nodes.forEach(n => {
        const phi = Math.acos(-1 + (2 * Math.random()));
        const theta = Math.sqrt(numNodes * Math.PI) * phi;
        const r = 800;
        n.tx = r * Math.cos(theta) * Math.sin(phi);
        n.ty = r * Math.sin(theta) * Math.sin(phi);
        n.tz = camera.z + 1000 + (r * Math.cos(phi));
    });
}

function formDataTunnel() {
    nodes.forEach(n => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 600 + Math.random() * 200;
        n.tx = Math.cos(angle) * radius;
        n.ty = Math.sin(angle) * radius;
        n.tz = camera.z + Math.random() * 15000;
    });
}

function formCore() {
    nodes.forEach(n => {
        n.tx = (Math.random() - 0.5) * 200;
        n.ty = (Math.random() - 0.5) * 200;
        n.tz = camera.z + 500;
    });
}

window.onload = () => {
    const loaderEl = document.getElementById('loader');

    // =====================================================================
    // 1. CROSS-PAGE SMOOTH SCROLLING (Instantly wipes # from the URL)
    // =====================================================================
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            // Actively remove "index.html" and the "#hash" from the URL bar
            let cleanUrl = window.location.pathname.replace(/\/index\.html$/, '/');

            // If it leaves us with just a blank string, default to root "/"
            if (cleanUrl === '') cleanUrl = '/';

            history.replaceState(null, null, cleanUrl);

            // Wait a tiny fraction of a second for Lenis to initialize, then scroll smoothly
            setTimeout(() => {
                lenis.scrollTo(targetElement, {
                    offset: -80, // Adjusts for the navbar height
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }, 100);
        }
    }

    // =====================================================================
    // 2. SAME-PAGE SMOOTH SCROLLING (Prevents # from ever appearing)
    // =====================================================================
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href) return;

            // If it's a standard hash link like "#services"
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    lenis.scrollTo(targetElement, { offset: -80, duration: 1.2 });
                }
            }
        });
    });

    // =====================================================================
    // 3. SUBPAGE LOGIC (If no loader exists on this page)
    // =====================================================================
    if (!loaderEl) {
        document.body.classList.remove('loading');
        gsap.set(".navbar", { y: 0, opacity: 1 }); // Instantly show navbar
        // ensure chatbot is visible even on subpages without a loader
        gsap.set("#chatbot-container", { opacity: 1, pointerEvents: "auto" });
        lenis.start();
        initScrollAnimations();
        return; // Stop running the rest of the script
    }

    // =====================================================================
    // 4. GLOBAL LOADER LOGIC (Uses localStorage to remember across all tabs)
    // =====================================================================
    const loaderTimestamp = localStorage.getItem('adoni_loaded_time');
    const now = new Date().getTime();

    // Check if they have seen the loader in the last 2 hours (7,200,000 milliseconds)
    // This stops it from playing when opening new tabs or clicking back
    const hideLoader = loaderTimestamp && (now - parseInt(loaderTimestamp) < 7200000);

    if (hideLoader) {
        // Skip animation
        loaderEl.style.display = 'none';
        document.body.classList.remove('loading');
        gsap.set(".navbar", { y: 0, opacity: 1 });
        gsap.set("#hero .content-box", { opacity: 1, scale: 1, filter: "blur(0px)" });
        gsap.set("#chatbot-container", { opacity: 1, pointerEvents: "auto" });
        lenis.start();
        initScrollAnimations();
    } else {
        // Play the full intro animation
        // Play the full intro animation
        const tlLoader = gsap.timeline({
            onComplete: () => {
                // Save the current exact time to localStorage
                localStorage.setItem('adoni_loaded_time', now.toString());
                loaderEl.style.display = 'none';
                document.body.classList.remove('loading');
                lenis.start();
                initScrollAnimations();
            }
        });

        tlLoader.to(".loader-text", { y: 0, duration: 0.8, ease: "power3.out" })
            // 1. Smoothly scale the new logo up and fade it in
            .to("#loaderLogoImg", { opacity: 1, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" }, "-=0.4")
            // 2. Add a powerful pulse/glow to the image
            .to("#loaderLogoImg", { filter: "drop-shadow(0 0 40px #00F0FF)", duration: 0.8, yoyo: true, repeat: 1 }, "-=0.8")
            // 3. Fade out the text
            .to(".loader-text", { opacity: 0, duration: 0.4 }, "+=1.5")
            // 4. Zoom the new logo incredibly close to the camera as a transition
            .to("#loaderLogoImg", { scale: 20, opacity: 0, duration: 1.2, ease: "power4.in" }, "zoom")
            .to(camera, { z: 0, duration: 1.2, ease: "power3.inOut" }, "zoom")
            .to("#loader", { opacity: 0, duration: 0.8, ease: "none" }, "-=0.5")
            .call(formSphere, [], "-=0.8")
            .to(".navbar", { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.3")
            .to("#hero .content-box", { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" }, "-=0.8")
            .to("#chatbot-container", { opacity: 1, pointerEvents: "auto", duration: 1 }, "-=1.0");
    }
};
function initScrollAnimations() {
    const diveTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5
        }
    });

    diveTimeline.to(camera, { z: 2500, ease: "power2.in" }, 0)
        .add(formDataTunnel, 0.4)
        .to(camera, { z: 12000, ease: "none" }, 0.5)
        .add(formCore, 0.85)
        .to(camera, { z: 12200, ease: "power3.out" }, 0.85);

    const hzTrack = document.querySelector('.hz-track');
    const hzPin = document.querySelector('.hz-pin-container');

    // ONLY run this if the horizontal track actually exists on the page
    if (hzTrack && hzPin) {
        gsap.to(hzTrack, {
            x: () => -(hzTrack.scrollWidth - window.innerWidth + 100),
            ease: "none",
            scrollTrigger: {
                trigger: hzPin,
                start: "center center",
                end: () => `+=${hzTrack.scrollWidth}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true
            }
        });
    }

    gsap.utils.toArray('.gs-fade-scroll').forEach(el => {
        gsap.from(el, { opacity: 0, filter: "blur(10px)", scale: 0.9, duration: 1, scrollTrigger: { trigger: el, start: "top 75%" } });
    });

    gsap.utils.toArray('.gs-up').forEach(el => {
        gsap.from(el, { opacity: 0, y: 100, rotationX: 10, duration: 1, scrollTrigger: { trigger: el, start: "top 85%" } });
    });
    // ==================== DEPLOYMENT TIMELINE ANIMATION ====================
    const timelineContainer = document.querySelector('.timeline-container');
    if (timelineContainer) {
        const trackProgress = document.querySelector('.timeline-progress');
        const timelineItems = gsap.utils.toArray('.timeline-item');

        // 1. Draw the line downwards as you scroll
        gsap.to(trackProgress, {
            height: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: timelineContainer,
                start: "top center", // Starts drawing when top of container hits center of screen
                end: "bottom center", // Finishes drawing when bottom hits center
                scrub: 1
            }
        });

        // 2. Light up each step when the line reaches it
        timelineItems.forEach((item) => {
            ScrollTrigger.create({
                trigger: item,
                start: "top center+=50", // Triggers just as the glowing line touches the dot
                onEnter: () => item.classList.add('active'),
                onLeaveBack: () => item.classList.remove('active') // Dims if they scroll back up
            });
        });
    }

    // ==================== LIVE STATS COUNTER ====================
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        gsap.utils.toArray('.stat-number').forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const isDecimal = stat.getAttribute('data-target').includes('.');

            // Create a dummy object to hold the value we want to animate
            let counter = { val: 0 };

            gsap.to(counter, {
                val: target,
                duration: 2.5,
                ease: "power3.out", // Starts fast, slows down beautifully at the end
                scrollTrigger: {
                    trigger: statsGrid,
                    start: "top 85%", // Triggers when the top of the grid is 85% down the viewport
                    toggleActions: "play none none none" // Only plays once
                },
                onUpdate: function () {
                    // If it's a decimal, fix to 1 point. Otherwise, round to whole number.
                    stat.innerText = isDecimal ? counter.val.toFixed(1) : Math.round(counter.val);
                }
            });
        });
    }
}

// ==================== ADVANCED GUIDED CHATBOT LOGIC ====================
const chatToggle = document.getElementById('chatbot-toggle');
const chatWindow = document.getElementById('chatbot-window');
const chatClose = document.getElementById('chatbot-close');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

let leadData = { service: '', budget: '', name: '', email: '', message: '' };
let isChatOpen = false;
let inputExpects = null; // Tracks what text input we are waiting for ('name', 'email', 'message')

if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.add('active');
        chatToggle.style.display = 'none';

        if (!isChatOpen) {
            isChatOpen = true;
            chatInput.disabled = true; // Disable typing until they pick an option

            setTimeout(() => {
                botReply("Hi! I'm the Adoni AI assistant. How can I help you scale your business today?");
                showMainMenu();
            }, 500);
        }
    });
}

if (chatClose) {
    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
        chatToggle.style.display = 'flex';
    });
}

// ==================== UI HELPERS ====================
function botReply(text) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg msg-bot';
    msg.textContent = text;
    chatMessages.appendChild(msg);
    scrollToBottom();
}

function botReplyHTML(htmlString) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg msg-bot';
    msg.innerHTML = htmlString;
    chatMessages.appendChild(msg);
    scrollToBottom();
}

function userReply(text) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg msg-user';
    msg.textContent = text;
    chatMessages.appendChild(msg);
    scrollToBottom();
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Dynamically generates buttons and handles their specific actions
function showOptions(optionsArray) {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'chat-options';

    optionsArray.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'chat-option-btn';
        btn.innerHTML = opt.text;

        btn.onclick = () => {
            optionsContainer.remove(); // Remove buttons after clicking
            userReply(btn.textContent); // Show what the user clicked
            opt.action(); // Run the specific function tied to this button
        };
        optionsContainer.appendChild(btn);
    });

    chatMessages.appendChild(optionsContainer);
    scrollToBottom();
}

// ==================== CONVERSATION FLOWS ====================

function showMainMenu() {
    inputExpects = null;
    chatInput.disabled = true;
    showOptions([
        { text: "🚀 Start a Project", action: startLeadFlow },
        { text: "🔍 Help me choose a Service", action: exploreServicesFlow },
        { text: "🌐 Connect on Socials", action: showSocialsFlow },
        { text: "💡 Give Website Feedback", action: feedbackFlow }
    ]);
}

// --- FLOW: Social Media ---
function showSocialsFlow() {
    setTimeout(() => {
        botReply("We'd love to connect! Here is where you can find our team and our code:");

        const socialsHTML = `
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 5px;">
                <a href="https://www.linkedin.com/in/taher-bohra9/" target="_blank" style="color: var(--accent); text-decoration: none; display: flex; align-items: center; gap: 8px;">
                    <i class="bi bi-linkedin"></i> Connect on LinkedIn
                </a>
                <a href="https://www.instagram.com/adoni.ai/" target="_blank" style="color: var(--accent); text-decoration: none; display: flex; align-items: center; gap: 8px;">
                    <i class="bi bi-instagram"></i> Follow on Instagram
                </a>
                <a href="https://github.com/taher-bohra786" target="_blank" style="color: var(--accent); text-decoration: none; display: flex; align-items: center; gap: 8px;">
                    <i class="bi bi-github"></i> View our GitHub
                </a>
            </div>
        `;
        setTimeout(() => {
            botReplyHTML(socialsHTML);

            setTimeout(() => {
                botReply("Anything else I can help you explore?");
                showOptions([
                    { text: "Back to Main Menu", action: showMainMenu },
                    { text: "Start a Project", action: startLeadFlow }
                ]);
            }, 1500);
        }, 600);
    }, 500);
}

// --- FLOW: Feedback ---
function feedbackFlow() {
    setTimeout(() => {
        botReply("We love feedback. How are you liking the Adoni AI digital experience so far?");
        showOptions([
            { text: "It's amazing! 🤩", action: () => handleFeedbackResponse("Amazing! We pride ourselves on engineering premium experiences. We can build something this engaging for your brand, too.") },
            { text: "It's pretty good 👍", action: () => handleFeedbackResponse("Glad you like it! We are always optimizing. Let us know if you want to see what we can do for your business.") },
            { text: "Needs improvement 🔧", action: () => handleFeedbackResponse("We appreciate the honesty. We are constantly deploying updates to optimize performance.") }
        ]);
    }, 500);
}

function handleFeedbackResponse(responseMsg) {
    setTimeout(() => {
        botReply(responseMsg);
        setTimeout(() => {
            showOptions([
                { text: "Let's build something together", action: startLeadFlow },
                { text: "Main Menu", action: showMainMenu }
            ]);
        }, 1000);
    }, 600);
}

// --- FLOW: Explore Services ---
function exploreServicesFlow() {
    setTimeout(() => {
        botReply("Every business is different. What is the biggest operational bottleneck you are facing right now?");
        showOptions([
            { text: "Too much manual data entry", action: () => pitchService("AI Automation Workflow", "Our AI automation bots can eliminate manual entry, read documents, and save your team 20+ hours a week.") },
            { text: "My current website doesn't convert", action: () => pitchService("Custom Web Architecture", "A slow site kills revenue. We build ultra-fast, high-converting platforms using React & Node.js.") },
            { text: "Managing B2B/Wholesale orders is chaos", action: () => pitchService("Custom B2B Portal", "We can digitize your entire wholesale process with custom tiered pricing and bulk-order dashboards.") }
        ]);
    }, 500);
}

function pitchService(serviceName, pitchText) {
    setTimeout(() => {
        botReply(`${pitchText} Based on that, I highly recommend our **${serviceName}** package.`);
        setTimeout(() => {
            botReply("Would you like to get a cost estimate and roadmap for this?");
            showOptions([
                { text: "Yes, let's talk about this!", action: () => { leadData.service = serviceName; askBudget(); } },
                { text: "Show me other options", action: exploreServicesFlow },
                { text: "Main Menu", action: showMainMenu }
            ]);
        }, 1200);
    }, 600);
}

// --- FLOW: Lead Generation ---
function startLeadFlow() {
    setTimeout(() => {
        botReply("Awesome. What type of technical system are you looking to build?");
        showOptions([
            { text: "Custom SaaS Platform", action: () => { leadData.service = "SaaS"; askBudget(); } },
            { text: "AI / Automation Logic", action: () => { leadData.service = "AI Automation"; askBudget(); } },
            { text: "B2B / E-commerce", action: () => { leadData.service = "B2B Portal"; askBudget(); } },
            { text: "Other / Unsure", action: () => { leadData.service = "General/Other"; askBudget(); } }
        ]);
    }, 500);
}

function askBudget() {
    setTimeout(() => {
        botReply(`Great. To architect the best solution for your ${leadData.service}, what is your estimated budget?`);
        showOptions([
            { text: "Under ₹5 Lakhs", action: () => { leadData.budget = "Under 5L"; askName(); } },
            { text: "₹5L – ₹15 Lakhs", action: () => { leadData.budget = "5L - 15L"; askName(); } },
            { text: "₹15 Lakhs+", action: () => { leadData.budget = "15L+"; askName(); } }
        ]);
    }, 600);
}

function askName() {
    setTimeout(() => {
        botReply("Thanks! What's your name?");
        inputExpects = 'name'; // Tell the text input to listen for a name
        chatInput.disabled = false;
        chatInput.focus();
    }, 600);
}

// ==================== TEXT INPUT HANDLING ====================
function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Secret reset command
    if (text.toLowerCase() === 'restart' || text.toLowerCase() === 'menu') {
        userReply(text);
        chatInput.value = '';
        showMainMenu();
        return;
    }

    userReply(text);
    chatInput.value = '';

    // Handle the expected input based on the current state
    if (inputExpects === 'name') {
        leadData.name = text;
        inputExpects = 'email';
        setTimeout(() => botReply(`Nice to meet you, ${leadData.name}. What is the best email address to reach you at?`), 600);

    } else if (inputExpects === 'email') {
        if (text.includes('@') && text.includes('.')) {
            leadData.email = text;
            inputExpects = 'message';
            setTimeout(() => botReply("Perfect. Lastly, could you briefly describe your project goals or bottlenecks?"), 600);
        } else {
            setTimeout(() => botReply("That doesn't look like a valid email. Could you try typing it again?"), 600);
        }

    } else if (inputExpects === 'message') {
        leadData.message = text;
        inputExpects = null; // Done
        chatInput.disabled = true; // Lock input
        setTimeout(() => {
            botReply("Transmitting your data to our secure servers...");
            submitLeadToWeb3Forms();
        }, 600);

    } else {
        // Fallback if they type randomly
        setTimeout(() => {
            botReply("I am currently in guided mode. Please use the buttons above, or type 'menu' to start over.");
        }, 600);
    }
}

if (chatSend) chatSend.addEventListener('click', handleSend);
if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !chatInput.disabled) handleSend();
    });
}

async function submitLeadToWeb3Forms() {
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                access_key: 'e7271cae-5e38-4c1a-a6f4-a24302e555af',
                subject: `New Bot Lead: ${leadData.service}`,
                from_name: leadData.name,
                email: leadData.email,
                service_interest: leadData.service,
                budget: leadData.budget,
                message: leadData.message
            })
        });

        const result = await response.json();
        if (result.success) {
            setTimeout(() => {
                botReply("Success! Your transmission has been received. The engineering team will be in touch shortly.");
                setTimeout(() => {
                    botReply("You can safely close this window, or return to the main menu.");
                    showOptions([{ text: "Back to Main Menu", action: showMainMenu }]);
                }, 1000);
            }, 800);
        } else {
            botReply("We encountered an error transmitting the data. Please try using the contact form in the footer.");
        }
    } catch (error) {
        botReply("System offline. Please use the contact form at the bottom of the page.");
    }
}

// ==================== STRUCTURED DATA (SEO & AEO) ====================
// 1. Organization Schema (Traditional SEO)
const orgSchemaScript = document.createElement('script');
orgSchemaScript.type = 'application/ld+json';
orgSchemaScript.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Adoni AI",
    "url": "https://adoniai.in",
    "logo": "https://adoniai.in/logo.png",
    "description": "Custom AI automation, SaaS platforms, and enterprise software development agency based in Pune.",
    "sameAs": [
        "https://www.instagram.com/adoni.ai/",
        "https://www.linkedin.com/in/taher-bohra9/"
    ]
});
document.head.appendChild(orgSchemaScript);

// 2. FAQ Schema (Answer Engine Optimization - AEO)
const faqSchemaScript = document.createElement('script');
faqSchemaScript.type = 'application/ld+json';
faqSchemaScript.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Do you build from scratch or use templates?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We engineer custom solutions from the ground up. Whether it's a SaaS platform or an AI automation workflow, we write clean, scalable code tailored strictly to your business logic. We do not rely on bloated, pre-built templates."
            }
        },
        {
            "@type": "Question",
            "name": "How long does a typical deployment take?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "It depends on the scope. A custom B2B portal or web architecture project typically takes 3 to 6 weeks. Complex Enterprise SaaS or AI integration models can take 2 to 3 months. We provide a strict roadmap during our discovery call."
            }
        },
        {
            "@type": "Question",
            "name": "Can you integrate AI into my existing software?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. We specialize in building secure API bridges to connect powerful LLMs and machine learning models to your current databases, CRMs, or legacy systems without disrupting your existing operations."
            }
        },
        {
            "@type": "Question",
            "name": "Do you provide ongoing maintenance and Cloud Ops?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Post-deployment, we offer dedicated Service Level Agreements (SLAs) to manage your AWS infrastructure, handle CI/CD pipelines, ensure 99.9% uptime, and push continuous security updates."
            }
        }
    ]
});
document.head.appendChild(faqSchemaScript);
// ==================== FAQ ACCORDION LOGIC (BULLETPROOF) ====================
document.addEventListener('click', function (e) {
    // 1. Check if the user clicked on or inside a question box (like the plus icon)
    const clickedQuestion = e.target.closest('.faq-question');
    if (!clickedQuestion) return; // If they clicked somewhere else, ignore it

    // 2. Find the parent FAQ item
    const parentItem = clickedQuestion.closest('.faq-item');
    if (!parentItem) return;

    // 3. Check if the one we clicked is currently open
    const isAlreadyOpen = parentItem.classList.contains('active');

    // 4. Close ALL FAQ items forcefully
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // 5. If the one we clicked wasn't open, open it now!
    if (!isAlreadyOpen) {
        parentItem.classList.add('active');
    }
});
// ==================== MAGNETIC BUTTON EFFECT ====================
const magneticBtns = document.querySelectorAll('.nav-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Move button toward cursor
        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    btn.addEventListener('mouseleave', () => {
        // Snap back to center
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
        });
    });
});
// ==================== ADVANCED CURSOR MORPHING (DESKTOP ONLY) ====================
const follower = document.getElementById('cursor-follower');

if (window.matchMedia("(pointer: fine)").matches) {
    // Centers the GSAP transform origin exactly on the mouse coordinates
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    window.addEventListener('mousemove', (e) => {
        gsap.to(follower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.4, // Smooth trailing effect
            ease: "power2.out"
        });
    });

    // 1. General Hover State (Standard Links, Nav Buttons, FAQ)
    // Selects interactables BUT excludes portfolio links and the chatbot
    const standardInteractables = document.querySelectorAll('a:not(.project-link-btn), button:not(#chatbot-toggle), .faq-question');

    standardInteractables.forEach(el => {
        el.addEventListener('mouseenter', () => gsap.to(follower, { scale: 2.5, duration: 0.3 }));
        el.addEventListener('mouseleave', () => gsap.to(follower, { scale: 1, duration: 0.3 }));
    });

    // 2. Portfolio "VIEW" Morph
    const projectLinks = document.querySelectorAll('.project-link-btn');

    projectLinks.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('view-mode');
            follower.innerText = 'VIEW';
            gsap.to(follower, { scale: 1, duration: 0.3 }); // Resets scale so CSS width/height takes over
        });
        el.addEventListener('mouseleave', () => {
            follower.classList.remove('view-mode');
            follower.innerText = '';
        });
    });

    // 3. Chatbot "CHAT" Morph
    const chatToggleBtn = document.getElementById('chatbot-toggle');
    if (chatToggleBtn) {
        chatToggleBtn.addEventListener('mouseenter', () => {
            follower.classList.add('chat-mode');
            follower.innerHTML = '<i class="bi bi-chat-dots-fill" style="color:#000; font-size:24px;"></i>';
            gsap.to(follower, { scale: 1, duration: 0.3 });
        });
        chatToggleBtn.addEventListener('mouseleave', () => {
            follower.classList.remove('chat-mode');
            follower.innerHTML = ''; // Clears the icon
        });
    }

} else {
    // Hide follower entirely on mobile/touch devices
    if (follower) follower.style.display = 'none';
}
// ==================== AJAX FOOTER FORM SUBMISSION ====================
const contactForm = document.getElementById('contact-form');
const formResult = document.getElementById('form-result');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        formResult.style.display = "block";
        formResult.innerHTML = "Processing transmission...";

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: json
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    formResult.innerHTML = "Success! Your request has been transmitted.";
                    contactForm.reset();
                } else {
                    formResult.innerHTML = json.message;
                }
            })
            .catch(error => {
                formResult.innerHTML = "System offline. Please try again later.";
            })
            .then(function () {
                setTimeout(() => { formResult.style.display = "none"; }, 5000);
            });
    });
}
// ==================== BACK TO TOP (LENIS INTEGRATION) ====================
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        // Uses Lenis to smoothly scroll to absolute top (0)
        lenis.scrollTo(0, {
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Beautiful exponential easing
        });
    });
}
// ==================== DYNAMIC HERO TEXT ====================
const words = ["Businesses.", "Enterprises.", "Workflows.", "Revenue."];
let currentWordIndex = 0;
const dynamicWord = document.getElementById('dynamic-word');

if (dynamicWord) {
    setInterval(() => {
        // Slide up and fade out
        gsap.to(dynamicWord, {
            y: -20,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                // Change the word
                currentWordIndex = (currentWordIndex + 1) % words.length;
                dynamicWord.innerText = words[currentWordIndex];

                // Slide in from bottom and fade in
                gsap.fromTo(dynamicWord,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
                );
            }
        });
    }, 3000); // Changes every 3 seconds
}
