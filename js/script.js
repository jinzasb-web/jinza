// =========================================
// JINZA TRADING SDN. BHD. - Site Scripts
// =========================================

// Navbar scroll shadow
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
}

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const open = navMenu.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.querySelector('i').className = open ? 'fas fa-times' : 'fas fa-bars';
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.querySelector('i').className = 'fas fa-bars';
        });
    });
}

// Smooth scroll for same-page anchor links (with fixed-nav offset)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 70;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// Active nav link highlighting
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
function updateActiveLink() {
    const scrollPos = window.pageYOffset + 120;
    let currentId = '';
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop) {
            currentId = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
}
window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// Reveal-on-scroll animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Back to top button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 350);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// =========================================
// WeChat QR Code Modal
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const wechatBtn = document.getElementById('wechatBtn');
    const wechatModal = document.getElementById('wechatModal');
    const wechatClose = document.querySelector('.wechat-close');

    if (wechatBtn && wechatModal) {
        wechatBtn.addEventListener('click', (e) => {
            e.preventDefault();
            wechatModal.classList.add('show');
            wechatModal.setAttribute('aria-hidden', 'false');
        });
    }

    if (wechatClose && wechatModal) {
        wechatClose.addEventListener('click', () => {
            wechatModal.classList.remove('show');
            wechatModal.setAttribute('aria-hidden', 'true');
        });
    }

    if (wechatModal) {
        // Close on outside click
        wechatModal.addEventListener('click', (e) => {
            if (e.target === wechatModal) {
                wechatModal.classList.remove('show');
                wechatModal.setAttribute('aria-hidden', 'true');
            }
        });
        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && wechatModal.classList.contains('show')) {
                wechatModal.classList.remove('show');
                wechatModal.setAttribute('aria-hidden', 'true');
            }
        });
    }
});
