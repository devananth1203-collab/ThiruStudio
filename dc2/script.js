// =========================================
// THIRU STUDIO — Light Luxury Interactive v3.0
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initMobileMenu();
    initScrollSpy();
    initLightbox();
    initContactForm();
    setCurrentYear();
    loadImages();
});

// 1. Scroll Animations (Standard Fade Up)
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve if you only want it to animate once
                // observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const animatedElements = document.querySelectorAll('.service-card, .pricing-card, .work-item, .gallery-item, .section-header, .about-content, .contact-wrapper');

    animatedElements.forEach((el, index) => {
        el.classList.add('fade-up');
        // Add stagger delay for grid items
        if (el.parentElement.classList.contains('grid')) {
            const delayClass = `stagger-delay-${(index % 3) + 1}`;
            el.classList.add(delayClass);
        }
        observer.observe(el);
    });
}

// 2. Scroll Spy (Highlight Nav & Dots based on viewing position)
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.site-nav a');
    const dots = document.querySelectorAll('.dot');
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', () => {
        let current = '';

        // Sticky Header Effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Determine active section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        // Update Links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Update Dots
        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('href').includes(current)) {
                dot.classList.add('active');
            }
        });
    });
}

// 3. Mobile Menu
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('siteNav');
    const links = nav.querySelectorAll('a');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        toggle.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            toggle.innerHTML = '☰';
        });
    });
}

// 4. Lightbox
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    if (!lightbox) return;

    const galleryItems = Array.from(document.querySelectorAll('[data-src]'));
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        const item = galleryItems[currentIndex];
        const src = item.getAttribute('data-src');
        const caption = item.getAttribute('data-caption') || '';

        lightboxImg.src = src;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => { lightboxImg.src = ''; }, 300);
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        openLightbox(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        openLightbox(currentIndex);
    }

    galleryItems.forEach((item, index) => {
        const clickable = item.closest('.work-item') || item.closest('.gallery-item');
        if (clickable) {
            clickable.addEventListener('click', () => openLightbox(index));
        }
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

// 5. Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        const whatsappMsg = `*New Inquiry from Website*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;
        const whatsappUrl = `https://wa.me/919842743187?text=${whatsappMsg}`;

        const btn = form.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Opening WhatsApp...';
        btn.style.background = '#daa520';

        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            btn.textContent = 'Message Sent';
            form.reset();
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);
        }, 800);
    });
}

// 6. Helpers
function setCurrentYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function loadImages() {
    const images = document.querySelectorAll('[data-src]');
    images.forEach(img => {
        const src = img.getAttribute('data-src');
        if (src) {
            img.style.backgroundImage = `url('${src}')`;
        }
    });
}
