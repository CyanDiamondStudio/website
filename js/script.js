// Translations
const translations = {
    en: {
        home: "Home",
        members: "Members",
        projects: "Projects",
        previews: "Previews",
        welcome: "Welcome to Cyan Diamond Studio",
        heroText: "We are a creative studio focused on developing innovative apps and games. Our team combines passion for technology with artistic vision to create unique digital experiences.",
        learnMore: "Learn More",
        aboutUs: "About Us",
        aboutText: "At Cyan Diamond Studio, we believe in pushing the boundaries of what's possible in app and game development. Our diverse team brings together experts in design, programming, and user experience to deliver products that not only function flawlessly but also delight users. Whether it's crafting immersive mobile games or building powerful productivity apps, we're committed to excellence in every project we undertake.",
        ourSkills: "Our Skills",
        appDev: "App Development",
        gameDesign: "Game Design",
        uiUx: "UI/UX Design",
        modeling: "3D Modeling",
        testimonials: "What Our Clients Say",
        contactUs: "Contact Us",
        contactText: "Get in touch with us for collaborations, inquiries, or just to say hello!",
        email: "Email:",
        yourName: "Your Name",
        yourEmail: "Your Email",
        yourMessage: "Your Message",
        sendMessage: "Send Message",
        footer: "© 2026 Cyan Diamond Studio. All rights reserved.",
        ourMembers: "Our Members",
        ourProjects: "Our Projects",
        appsGames: "Apps and Games Previews",
        manageMembers: "Manage Members",
        memberName: "Member Name",
        abilities: "Abilities",
        addMember: "Add Member",
        manageProjects: "Manage Projects",
        projectName: "Project Name",
        projectLink: "Project Link",
        addProject: "Add Project",
        managePreviews: "Manage Previews",
        appGameName: "App/Game Name",
        description: "Description",
        mediaUrl: "Media URL (image/video)",
        addPreview: "Add Preview",
        delete: "Delete"
    },
    fa: {
        home: "خانه",
        members: "اعضا",
        projects: "پروژه‌ها",
        previews: "پیش‌نمایش‌ها",
        welcome: "به استودیو الماس آبی خوش آمدید",
        heroText: "ما یک استودیو خلاق هستیم که بر توسعه برنامه‌های نوآورانه و بازی‌ها تمرکز داریم. تیم ما اشتیاق به فناوری را با بینش هنری ترکیب می‌کند تا تجربیات دیجیتال منحصر به فرد ایجاد کند.",
        learnMore: "بیشتر بدانید",
        aboutUs: "درباره ما",
        aboutText: "در استودیو الماس آبی، معتقدیم که مرزهای ممکن در توسعه برنامه و بازی را پیش ببریم. تیم متنوع ما متخصصان طراحی، برنامه‌نویسی و تجربه کاربری را گرد هم آورده تا محصولاتی ارائه دهد که نه تنها بی‌نقص عمل می‌کنند بلکه کاربران را نیز شاد می‌کنند. چه در حال ساخت بازی‌های موبایل فراگیر یا ساخت برنامه‌های بهره‌وری قدرتمند باشیم، به برتری در هر پروژه متعهد هستیم.",
        ourSkills: "مهارت‌های ما",
        appDev: "توسعه برنامه",
        gameDesign: "طراحی بازی",
        uiUx: "طراحی UI/UX",
        modeling: "مدل‌سازی ۳D",
        testimonials: "آنچه مشتریان ما می‌گویند",
        contactUs: "تماس با ما",
        contactText: "برای همکاری‌ها، پرسش‌ها یا فقط سلام گفتن با ما تماس بگیرید!",
        email: "ایمیل:",
        yourName: "نام شما",
        yourEmail: "ایمیل شما",
        yourMessage: "پیام شما",
        sendMessage: "ارسال پیام",
        footer: "© ۲۰۲۶ استودیو الماس آبی. تمامی حقوق محفوظ است.",
        ourMembers: "اعضای ما",
        ourProjects: "پروژه‌های ما",
        appsGames: "پیش‌نمایش برنامه‌ها و بازی‌ها",
        manageMembers: "مدیریت اعضا",
        memberName: "نام عضو",
        abilities: "توانایی‌ها",
        addMember: "افزودن عضو",
        manageProjects: "مدیریت پروژه‌ها",
        projectName: "نام پروژه",
        projectLink: "لینک پروژه",
        addProject: "افزودن پروژه",
        managePreviews: "مدیریت پیش‌نمایش‌ها",
        appGameName: "نام برنامه/بازی",
        description: "توضیحات",
        mediaUrl: "URL رسانه (تصویر/ویدیو)",
        addPreview: "افزودن پیش‌نمایش",
        delete: "حذف",

    }
};

// Theme management
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}

// Language management
function toggleLanguage() {
    const currentLang = localStorage.getItem('language') || 'en';
    const newLang = currentLang === 'en' ? 'fa' : 'en';
    setLanguage(newLang);
}

function setLanguage(lang) {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    updateLangIcon();
    translatePage();

    // Reload site settings to apply language-specific content
    loadSiteSettings();

    // Update typing text if on home page - set instantly to avoid garbled text
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        typingText.textContent = translations[lang].welcome;
    }
}

function updateLangIcon() {
    const langToggle = document.getElementById('lang-toggle');
    const currentLang = localStorage.getItem('language') || 'en';
    langToggle.textContent = currentLang === 'en' ? 'EN' : 'FA';
}

function translatePage() {
    const lang = localStorage.getItem('language') || 'en';
    const trans = translations[lang];

    // Update navigation
    document.querySelectorAll('nav a').forEach(a => {
        const key = a.getAttribute('data-key');
        if (key && trans[key]) a.textContent = trans[key];
    });

    // Update headings and text
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (trans[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = trans[key];
            } else {
                el.textContent = trans[key];
            }
        }
    });

    // Special cases
    const typingText = document.getElementById('typing-text');
    if (typingText) typingText.setAttribute('data-key', 'welcome');

    // Update testimonials if needed (static for now)
}

// Menu toggle for mobile
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('open');
}

// Typing effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Scroll animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Stagger grid items
                const gridItems = entry.target.querySelectorAll('.grid > *');
                gridItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section:not(.hero)').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// Animate progress bars and numbers
function animateProgressBars() {
    const skills = document.querySelectorAll('.skill');
    skills.forEach((skill, index) => {
        setTimeout(() => {
            const progressBar = skill.querySelector('.progress');
            const span = skill.querySelector('span');
            const targetWidth = progressBar.getAttribute('data-width');
            const targetNumber = parseInt(targetWidth);

            // Animate progress bar
            progressBar.style.width = targetWidth + '%';

            // Animate number
            let currentNumber = 0;
            const increment = targetNumber / 100;
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= targetNumber) {
                    currentNumber = targetNumber;
                    clearInterval(timer);
                }
                span.textContent = Math.floor(currentNumber) + '%';
            }, 20);
        }, index * 200);
    });
}

// Testimonial slider
let currentTestimonial = 0;
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextTestimonial();
            resetAutoSlide();
        });
        prevBtn.addEventListener('click', () => {
            prevTestimonial();
            resetAutoSlide();
        });
    }

    // Auto slide
    let autoSlideInterval = setInterval(nextTestimonial, 5000);

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextTestimonial, 5000);
    }
}

// Contact form
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearError);
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {
                // In a real app, you'd send this to a server
                showSuccessMessage('Thank you for your message! We\'ll get back to you soon.');
                form.reset();
            }
        });
    }

    function validateField(e) {
        const field = e.target;
        const errorElement = field.parentElement.querySelector('.error');
        if (errorElement) errorElement.remove();

        if (!field.checkValidity()) {
            const error = document.createElement('div');
            error.className = 'error';
            error.textContent = getErrorMessage(field);
            field.parentElement.appendChild(error);
            field.classList.add('field-error');
            field.classList.remove('field-success');
        } else {
            field.classList.add('field-success');
            field.classList.remove('field-error');
        }
    }

    function clearError(e) {
        const field = e.target;
        const errorElement = field.parentElement.querySelector('.error');
        if (errorElement) errorElement.remove();
        field.classList.remove('field-error', 'field-success');
    }

    function validateForm() {
        let isValid = true;
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                validateField({ target: input });
            }
        });
        return isValid;
    }

    function getErrorMessage(field) {
        if (field.validity.valueMissing) return 'This field is required';
        if (field.validity.typeMismatch) return 'Please enter a valid ' + field.type;
        return 'Invalid input';
    }

    function showSuccessMessage(message) {
        const success = document.createElement('div');
        success.className = 'success-message';
        success.textContent = message;
        form.appendChild(success);
        setTimeout(() => success.remove(), 5000);
    }
}

// Load data from localStorage
function loadMembers() {
    const defaultMembers = [
        { name: "Amir", position: "AI Programmer", abilities: "AI programming and development", url: "https://github.com/Amir01m" },
        { name: "Shayan", position: "Game Developer", abilities: "Game development and vibe coder", url: "https://github.com/ShayanHajibagher" },
        { name: "Iman", position: "Programmer", abilities: "Learning programming", url: "https://github.com/iman-maleki" }
    ];
    const members = JSON.parse(localStorage.getItem('members')) || defaultMembers;
    const container = document.getElementById('members-list');
    if (container) {
        container.innerHTML = members.map(member =>
            `<div class="member"><h3>${member.name}</h3><p><strong>Position:</strong> ${member.position}</p><p><strong>Abilities:</strong> ${member.abilities}</p><p><a href="${member.url}" target="_blank" class="member-link">Visit Profile</a></p></div>`
        ).join('');
    }
}

function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const container = document.getElementById('projects-list');
    if (container) {
        container.innerHTML = projects.map(project =>
            `<div class="project"><h3><a href="${project.link}" target="_blank">${project.name}</a></h3>${project.description ? `<p>${project.description}</p>` : ''}</div>`
        ).join('');
    }
}

function loadPreviews() {
    const previews = JSON.parse(localStorage.getItem('previews')) || [];
    const container = document.getElementById('previews-list');
    if (container) {
        container.innerHTML = previews.map(preview =>
            `<div class="preview"><h3>${preview.name}</h3><p>${preview.description}</p>${preview.media ? `<img src="${preview.media}" alt="${preview.name}" loading="lazy">` : ''}</div>`
        ).join('');
    }
}

function loadSiteSettings() {
    const settings = JSON.parse(localStorage.getItem('siteSettings')) || {};

    // Update hero content
    const typingText = document.getElementById('typing-text');
    if (typingText && settings.heroTitle) {
        typingText.setAttribute('data-key', 'welcome');
        translations.en.welcome = settings.heroTitle;
        translations.fa.welcome = settings.heroTitle; // Use same title for both languages for now
        typingText.textContent = settings.heroTitle;
    }

    const heroTextElement = document.querySelector('[data-key="heroText"]');
    if (heroTextElement && settings.heroText) {
        translations.en.heroText = settings.heroText;
        translations.fa.heroText = settings.heroText; // Use same text for both languages for now
        heroTextElement.textContent = settings.heroText;
    }

    // Update about text
    const aboutTextElement = document.querySelector('#about p:first-of-type');
    if (aboutTextElement && settings.aboutText) {
        translations.en.aboutText = settings.aboutText;
        translations.fa.aboutText = settings.aboutText; // Use same text for both languages for now
        aboutTextElement.textContent = settings.aboutText;
    }

    // Update contact email
    const emailLink = document.querySelector('#contact a[href^="mailto:"]');
    if (emailLink && settings.email) {
        emailLink.href = `mailto:${settings.email}`;
        emailLink.textContent = settings.email;
    }

    // Update skills
    const skillElements = document.querySelectorAll('.skill');
    skillElements.forEach((skill, index) => {
        const progressBar = skill.querySelector('.progress');
        const span = skill.querySelector('span');
        let percentage = 0;

        switch(index) {
            case 0: // App Development
                percentage = settings.appDev || 40;
                break;
            case 1: // Game Design
                percentage = settings.gameDesign || 30;
                break;
            case 2: // UI/UX Design
                percentage = settings.uiUx || 20;
                break;
            case 3: // 3D Modeling
                percentage = settings.modeling || 20;
                break;
        }

        if (progressBar) {
            progressBar.setAttribute('data-width', percentage);
            progressBar.style.width = percentage + '%';
        }
        if (span) {
            span.textContent = percentage + '%';
        }
    });
}

// Load content on page load
document.addEventListener('DOMContentLoaded', function() {
    // Theme initialization
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon();

    // Language initialization
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);

    // Event listeners
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }

    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Initialize animations and interactions
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const lang = localStorage.getItem('language') || 'en';
        const welcomeText = translations[lang].welcome;
        typeWriter(typingText, welcomeText);
    }

    initScrollAnimations();
    animateProgressBars();
    initTestimonialSlider();
    initContactForm();

    // Load dynamic content
    loadMembers();
    loadProjects();
    loadPreviews();
    loadSiteSettings();

    // Hide preloader after load
    window.addEventListener('load', () => {
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }
        }, 1000);
    });

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Mascot
    const mascot = document.getElementById('mascot');
    const speechBubble = document.getElementById('speech-bubble');
    if (mascot) {
        let currentTooltip = '';

        // Add tooltips to elements
        document.querySelectorAll('[data-tooltip]').forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                const tooltip = el.getAttribute('data-tooltip');
                if (tooltip) {
                    speechBubble.textContent = tooltip;
                    speechBubble.classList.add('show');
                    currentTooltip = tooltip;
                }
            });

            el.addEventListener('mouseleave', () => {
                speechBubble.classList.remove('show');
                currentTooltip = '';
            });
        });

        // Page-specific tips
        const pageTips = {
            'index.html': [
                "Welcome to our studio homepage!",
                "Scroll down to learn about us.",
                "Check our skills and testimonials.",
                "Don't forget to contact us!"
            ],
            'members.html': [
                "Meet our talented team members.",
                "Each member has unique abilities.",
                "We value creativity and expertise."
            ],
            'projects.html': [
                "Explore our latest projects.",
                "Click on links to view them.",
                "We're proud of our work!"
            ],
            'previews.html': [
                "See previews of our apps and games.",
                "Stay tuned for releases.",
                "Your feedback is important to us."
            ],

        };

        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const tips = pageTips[currentPage] || ["Welcome to Cyan Diamond Studio!"];

        let tipIndex = 0;
        setInterval(() => {
            if (!currentTooltip) {
                speechBubble.textContent = tips[tipIndex];
                speechBubble.classList.add('show');
                setTimeout(() => {
                    if (!currentTooltip) speechBubble.classList.remove('show');
                }, 4000);
                tipIndex = (tipIndex + 1) % tips.length;
            }
        }, 8000);
    }
});