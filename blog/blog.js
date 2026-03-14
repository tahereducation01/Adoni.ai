// ==================== BLOG DATABASE & LOGIC ====================

const blogDatabase = [
    {
        id: "cost-of-software",
        category: "Business Logic",
        date: "Mar 12, 2026",
        title: "How Much Does Custom Enterprise Software Cost in India?",
        excerpt: "Stop relying on vague estimates. We break down the exact cost architecture of building custom SaaS platforms, AI integrations, and high-performance web apps in 2026.",
        content: `
            <p>One of the most frequent questions we get at Adoni AI is: <em>"How much will this cost?"</em></p>
            <p>The digital landscape in India is crowded with agencies offering "custom websites" for ₹10,000. But for enterprise clients, B2B wholesalers, and scaling businesses in cities like Pune, buying a cheap, pre-built template is the most expensive mistake you can make. When systems break under heavy traffic, or manual data entry bottlenecks your staff, the hidden costs skyrocket.</p>
            
            <h3>1. The Template Trap vs. Custom Architecture</h3>
            <p>A template is a rented house; custom software is a fortress you own. When we engineer a platform using the <strong>React and Node.js ecosystems</strong>, we aren't just making it look pretty. We are mapping your exact business logic to the database.</p>
            <ul>
                <li><strong>Template Cost:</strong> Low upfront, massive technical debt later. Poor SEO performance.</li>
                <li><strong>Custom SaaS Cost:</strong> Ranges heavily based on API integrations, custom dashboards, and secure user auth systems. However, it pays for itself by reducing operational bloat.</li>
            </ul>

            <h3>2. The Cost of AI & Automation</h3>
            <p>Integrating Generative AI into your workflow isn't just about API costs. It requires strict prompt engineering and security protocols to ensure the AI doesn't hallucinate or leak company data.</p>
            <p>A basic automation workflow is highly accessible. However, building an autonomous agent that reads your CRM, drafts client emails, and updates inventory in real-time is an enterprise-grade deployment that requires significant architectural planning.</p>

            <h3>3. Cloud Infrastructure (AWS)</h3>
            <p>Code is only half the equation. Where does it live? We deploy our systems on secure infrastructure because if your B2B portal goes down during peak hours, you lose revenue. Enterprise software pricing always factors in setting up secure CI/CD pipelines, load balancers, and DevOps support.</p>
            
            <p><strong>The Bottom Line:</strong> You aren't paying for lines of code. You are paying to eliminate manual labor, streamline operations, and build a digital asset that scales infinitely.</p>
        `
    },
    {
        id: "aeo-vs-seo",
        category: "AI Architecture",
        date: "Mar 05, 2026",
        title: "AEO vs SEO: Why AI Agencies Don't Just 'Build Websites'",
        excerpt: "Traditional Google search is changing. Learn how Answer Engine Optimization (AEO) ensures your business is recommended by AI models like ChatGPT and Gemini.",
        content: `
            <p>For the last two decades, Search Engine Optimization (SEO) was the only game in town. You stuffed keywords into a blog, bought some backlinks, and hoped Google put you on page one. That era is ending.</p>
            <p>Enter <strong>Answer Engine Optimization (AEO)</strong>.</p>
            
            <h3>How Users Search in 2026</h3>
            <p>People no longer want a list of 10 blue links. They open ChatGPT, Gemini, or Perplexity and ask a direct question: <em>"Who is the best custom SaaS developer in Pune for logistics?"</em></p>
            <p>AI models don't read the web like Google's old crawlers. They look for absolute consensus, structured data, and high-authority definitions. If your website is just a digital brochure without direct answers, the AI will ignore you entirely.</p>

            <h3>How Adoni AI Architects for AEO</h3>
            <p>When we deploy digital infrastructure for our clients, we build AEO into the foundation. Here is how we do it:</p>
            <ul>
                <li><strong>Deep Schema Markup:</strong> We inject JSON-LD structured data directly into the application's head, telling the AI exactly what your business does, who runs it, and what specific problems it solves.</li>
                <li><strong>Conversational Architecture:</strong> We design FAQ sections and knowledge bases that mimic the exact syntax a user types into an LLM. We answer questions directly and concisely.</li>
                <li><strong>Performance Metrics:</strong> AI models penalize slow load times. By utilizing optimized front-ends, our clients' platforms load in milliseconds, signaling high technical authority to crawling algorithms.</li>
            </ul>

            <p>Building a website is easy. Architecting a system that autonomous AI engines trust enough to recommend to your future clients requires deep engineering.</p>
        `
    },
    {
        id: "cafe-saas-architecture",
        category: "Case Study",
        date: "Feb 24, 2026",
        title: "Replacing Paper: The Technical Architecture of a Cafe SaaS",
        excerpt: "A deep dive into how we build real-time Kanban routing systems and digital QR menus to eliminate 100% of physical menu printing costs.",
        content: `
            <p>The hospitality industry runs on speed. Yet, we noticed many local cafes were still relying on chaotic paper tickets, manual order entry, and expensive physical menus that required reprinting every time a price changed.</p>
            <p>We engineered a SaaS solution specifically designed to digitize cafe operations from the table to the kitchen.</p>

            <h3>The Digital Menu & QR Routing</h3>
            <p>Instead of handing out paper, customers scan a table-specific QR code. The technical challenge here isn't just displaying a menu—it's establishing a secure, stateful session so the system knows exactly which table is ordering.</p>
            <ul>
                <li><strong>Dynamic Stock Control:</strong> If the kitchen runs out of a specific ingredient, the admin dashboard allows managers to toggle an item "Out of Stock" with one click. It instantly disappears from the customer's view. No more apologizing for unavailable items.</li>
                <li><strong>Frictionless Ordering:</strong> The UI is heavily optimized for mobile thumbs. High-res imagery, clear modifiers (e.g., "Extra shot of espresso"), and a seamless cart experience.</li>
            </ul>

            <h3>The Kitchen Kanban Board</h3>
            <p>When an order is placed, it doesn't print on a noisy receipt machine. It routes directly to a digital Kanban board in the kitchen.</p>
            <p>Cooks can drag and drop orders from "New" to "Preparing" to "Ready." This centralized data stream eliminates miscommunication between waitstaff and the kitchen, reducing order error rates significantly.</p>

            <p>By shifting from analog to an integrated digital ecosystem, cafes aren't just saving money on paper; they are increasing table turnover rates and vastly improving the customer experience.</p>
        `
    },
    {
        id: "b2b-portal-scaling",
        category: "Cloud Ops",
        date: "Feb 10, 2026",
        title: "Why Custom B2B Portals Scale Better Than Shopify",
        excerpt: "An analysis of performance metrics, wholesale logic, and why standard e-commerce templates fail when trying to scale B2B wholesale operations.",
        content: `
            <p>When a retail business wants to sell shirts online, platforms like Shopify or WooCommerce are excellent choices. But when a wholesale hardware distributor needs a portal for their B2B clients, standard e-commerce platforms quickly become a bottleneck.</p>
            
            <h3>The Problem with Retail Templates for B2B</h3>
            <p>Wholesale businesses operate on complex logic. You don't just have one price for an item. You have tiered pricing based on volume, specific discounts tied to individual client accounts, and complex credit or net-30 payment terms.</p>
            <p>Trying to force this logic into a template built for selling retail sneakers requires dozens of expensive plugins. These plugins conflict, slow down the site, and create massive security vulnerabilities.</p>

            <h3>The Adoni AI Approach: Purpose-Built Architecture</h3>
            <p>When we build B2B portals, we strip away the bloat and build exactly what the business needs:</p>
            <ul>
                <li><strong>Role-Based Access Control (RBAC):</strong> A secure login system where Client A sees different pricing and product catalogs than Client B.</li>
                <li><strong>Bulk Order Interfaces:</strong> Wholesalers don't want to click "Add to Cart" 50 times. We build spreadsheet-style interfaces where clients can input SKUs and quantities rapidly.</li>
                <li><strong>ERP Integration:</strong> A custom portal can connect directly to your existing inventory management or accounting software via API, ensuring stock levels are always perfectly synced.</li>
            </ul>

            <p>A custom B2B portal isn't just a storefront; it's a digital extension of your sales team that operates 24/7 without making math errors.</p>
        `
    }
];

// ==================== RENDERING & TRANSITION LOGIC ====================

const gridContainer = document.getElementById('blog-grid');
const readerContainer = document.getElementById('blog-reader');
const backBtn = document.getElementById('back-to-grid');
const progressContainer = document.getElementById('reading-progress-container');
const progressBar = document.getElementById('reading-progress-bar');
let isReading = false;

// 1. Render the Grid on Load
function renderGrid() {
    blogDatabase.forEach((post, index) => {
        const card = document.createElement('a');
        card.href = "#";
        card.className = "blog-card gs-up";
        card.style.transitionDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div>
                <div class="blog-meta">
                    <span class="blog-category">${post.category}</span>
                    <span>${post.date}</span>
                </div>
                <h2 class="blog-title">${post.title}</h2>
                <p class="blog-excerpt">${post.excerpt}</p>
            </div>
            <span class="read-more">Read Transmission <i class="bi bi-arrow-right"></i></span>
        `;

        // Intercept the click to open the SPA reader
        card.addEventListener('click', (e) => {
            e.preventDefault();
            openArticle(post.id);
        });

        gridContainer.appendChild(card);
    });
}

// 2. Open Article (Fade out grid, slide in reader)
function openArticle(id) {
    const post = blogDatabase.find(p => p.id === id);
    if (!post) return;

    // Populate Reader Data
    document.getElementById('reader-category').innerText = post.category;
    document.getElementById('reader-date').innerText = post.date;
    document.getElementById('reader-title').innerText = post.title;
    document.getElementById('reader-content').innerHTML = post.content;

    // Animate transition using GSAP
    gsap.to(gridContainer, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        onComplete: () => {
            gridContainer.style.display = 'none';
            readerContainer.style.display = 'block';
            isReading = true;
            progressContainer.style.display = 'block';
            
            // Scroll to the top of the article area smoothly
            window.scrollTo({ top: document.querySelector('.blog-hero').offsetTop - 100, behavior: 'smooth' });

            gsap.fromTo(readerContainer, 
                { opacity: 0, y: 50 }, 
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
            );
        }
    });
}

// 3. Close Article (Fade out reader, slide in grid)
backBtn.addEventListener('click', () => {
    isReading = false;
    progressContainer.style.display = 'none';
    progressBar.style.width = '0%';

    gsap.to(readerContainer, {
        opacity: 0,
        y: 50,
        duration: 0.4,
        onComplete: () => {
            readerContainer.style.display = 'none';
            gridContainer.style.display = 'grid'; 
            
            gsap.fromTo(gridContainer, 
                { opacity: 0, y: -20 }, 
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
            );
        }
    });
});

// 4. Reading Progress Bar Logic
window.addEventListener('scroll', () => {
    if (!isReading) return;

    // Calculate how far down the page the user has scrolled
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Prevent divide by zero error if page is too short
    if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    }
});

// Initialize
renderGrid();
