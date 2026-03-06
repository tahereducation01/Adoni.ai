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
    const tlLoader = gsap.timeline({
        onComplete: () => {
            document.getElementById('loader').style.display = 'none';
            document.body.classList.remove('loading');
            lenis.start();
            initScrollAnimations();
        }
    });

    tlLoader.to(".loader-text", { y: 0, duration: 0.8, ease: "power3.out" })
        .to(".ring-1", { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, "-=0.4")
        .to(".ring-2", { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, "-=1.0")
        .to(".ring-3", { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, "-=1.0")
        .to(".poly-core", { strokeDashoffset: 0, duration: 1.2, ease: "power3.inOut" }, "-=0.8")
        .to(".loader-circuit", { strokeDashoffset: 0, duration: 0.8, ease: "power2.out", stagger: 0.1 }, "-=0.6")
        .to(".loader-core", { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)" }, "-=0.2")
        .to(".poly-core", { fill: "rgba(2,3,5,0.9)", duration: 0.4 }, "-=0.2")
        .to(".loader-text", { opacity: 0, duration: 0.4 }, "+=2.0")
        .to("#loaderLogo", { scale: 15, opacity: 0, duration: 1.2, ease: "power4.in" }, "zoom")
        .to(camera, { z: 0, duration: 1.2, ease: "power3.inOut" }, "zoom")
        .to("#loader", { opacity: 0, duration: 0.8, ease: "none" }, "-=0.5")
        .call(formSphere, [], "-=0.8")
        .to(".navbar", { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.3")
        .to("#hero .content-box", { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" }, "-=0.8");
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
                onUpdate: function() {
                    // If it's a decimal, fix to 1 point. Otherwise, round to whole number.
                    stat.innerText = isDecimal ? counter.val.toFixed(1) : Math.round(counter.val);
                }
            });
        });
    }
}

// ==================== GUIDED CHATBOT LOGIC ====================
const chatToggle = document.getElementById('chatbot-toggle');
const chatWindow = document.getElementById('chatbot-window');
const chatClose = document.getElementById('chatbot-close');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

let chatStep = 0; // 0: service, 1: budget, 2: name, 3: email, 4: message
let leadData = { service: '', budget: '', name: '', email: '', message: '' };
let isChatOpen = false;

chatToggle.addEventListener('click', () => {
    chatWindow.classList.add('active');
    if (!isChatOpen) {
        isChatOpen = true;
        chatInput.disabled = true;
        setTimeout(() => {
            botReply("Hi! I'm the Adoni AI assistant. How can we help scale your business today?");
            showOptions([
                { text: "Build a Custom Web App / SaaS", value: "Custom Web App" },
                { text: "Integrate AI & Automation", value: "AI Automation" },
                { text: "E-commerce or B2B Portal", value: "B2B Portal" },
                { text: "Just looking around", value: "General Inquiry" }
            ]);
        }, 500);
    }
});

chatClose.addEventListener('click', () => chatWindow.classList.remove('active'));

function showOptions(optionsArray) {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'chat-options';

    optionsArray.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'chat-option-btn';
        btn.textContent = opt.text;
        
        btn.onclick = () => {
            optionsContainer.remove();
            userReply(opt.text);
            
            // Branching logic based on the current step
            if (chatStep === 0) {
                handleServiceSelection(opt.value);
            } else if (chatStep === 1) {
                handleBudgetSelection(opt.value);
            }
        };
        optionsContainer.appendChild(btn);
    });

    chatMessages.appendChild(optionsContainer);
    scrollToBottom();
}

function handleServiceSelection(value) {
    leadData.service = value;
    if (value === "General Inquiry") {
        setTimeout(() => {
            botReply("No problem! Feel free to explore. If you want to get in touch, what's your name?");
            chatInput.disabled = false;
            chatInput.focus();
            chatStep = 2; // Jump straight to Name
        }, 600);
    } else {
        setTimeout(() => {
            chatStep = 1; // Move to Budget
            botReply(`Great choice! To better understand your needs, what is your estimated budget range?`);
            showOptions([
                { text: "Under ₹1,000", value: "budget-low" },
                { text: "₹1,000 – ₹5,000", value: "budget-mid" },
                { text: "₹5,000+", value: "budget-high" }
            ]);
        }, 600);
    }
}

function handleBudgetSelection(value) {
    leadData.budget = value;
    chatStep = 2; // Move to Name
    setTimeout(() => {
        botReply("Thanks! Now, what's your name?");
        chatInput.disabled = false;
        chatInput.focus();
    }, 600);
}

function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;

    userReply(text);
    chatInput.value = '';

    setTimeout(() => {
        if (chatStep === 2) {
            leadData.name = text;
            botReply(`Nice to meet you, ${leadData.name}. What is the best email address for team to reach you at?`);
            chatStep++;
        } else if (chatStep === 3) {
            if (text.includes('@') && text.includes('.')) {
                leadData.email = text;
                botReply("Perfect. Lastly, could you briefly describe your project or the problem you are trying to solve?");
                chatStep++;
            } else {
                botReply("That doesn't look like a valid email. Could you try typing it again?");
            }
        } else if (chatStep === 4) {
            leadData.message = text;
            botReply("Transmitting your data to our secure servers...");
            chatStep++;
            submitLeadToWeb3Forms();
        }
    }, 600);
}

chatSend.addEventListener('click', handleSend);
chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter' && !chatInput.disabled) handleSend(); });

function botReply(text) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg msg-bot';
    msg.textContent = text;
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
            botReply("Success! Your transmission has been received. The team will be in touch shortly. You can close this window.");
            chatInput.disabled = true;
        } else {
            botReply("We encountered an error transmitting the data. Please try using the contact form below.");
        }
    } catch (error) {
        botReply("System offline. Please use the contact form at the bottom of the page.");
    }
}

// ==================== STRUCTURED DATA (SEO) ====================
const schemaScript = document.createElement('script');
schemaScript.type = 'application/ld+json';
schemaScript.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Adoni AI",
    "url": "https://adoniai.in",
    "logo": "https://adoniai.in/logo.png",
    "sameAs": [
        "https://www.instagram.com/adoni.ai/",
        "https://www.linkedin.com/in/taher-bohra9/"
    ]
});
document.head.appendChild(schemaScript);
// ==================== FAQ ACCORDION LOGIC ====================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other open items (optional, remove if you want multiple open at once)
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
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
// ==================== CURSOR FOLLOWER ====================
const follower = document.getElementById('cursor-follower');

window.addEventListener('mousemove', (e) => {
    gsap.to(follower, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.6,
        ease: "power2.out"
    });
});

// Scale up when hovering over interactive elements
document.querySelectorAll('a, button, .faq-question').forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(follower, { scale: 3, duration: 0.3 }));
    el.addEventListener('mouseleave', () => gsap.to(follower, { scale: 1, duration: 0.3 }));
});