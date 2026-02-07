document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      siteNav.classList.toggle('active');
    });

    // Close menu when clicking on a link
    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.site-nav') && !e.target.closest('.nav-toggle')) {
        siteNav.classList.remove('active');
      }
    });
  }

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Contact Form Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const name = formData.get('name') || 'Friend';
      const email = formData.get('email') || '';
      const subject = formData.get('subject') || '';
      const message = formData.get('message') || '';
      
      // Create WhatsApp message with form details
      const whatsappMessage = `Hello! I would like to inquire about your services.

*Name:* ${name}
*Email:* ${email}
*Subject:* ${subject}
*Message:* ${message}`;
      
      // Encode message for WhatsApp URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappLink = `https://wa.me/919842743187?text=${encodedMessage}`;
      
      // Show notification
      showNotification(`Thank you, ${name}! Opening WhatsApp to send your details...`, 'success');
      
      // Open WhatsApp in new tab after a short delay
      setTimeout(() => {
        window.open(whatsappLink, '_blank');
      }, 500);
      
      // Reset form
      contactForm.reset();
    });
  }

  // Load images with data-src attribute
  loadImages();
  window.addEventListener('load', loadImages);

  // Add scroll animations
  observeElements();
});

// Load images from data-src attributes
function loadImages() {
  document.querySelectorAll('[data-src]').forEach(element => {
    const src = element.getAttribute('data-src');
    if (src && !element.style.backgroundImage) {
      element.style.backgroundImage = `url('${src}')`;
    }
  });
}

// Intersection Observer for lazy animations
function observeElements() {
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, options);

  // Apply to service cards, work items, gallery items
  document.querySelectorAll('.service-card, .work-item, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
}

// Notification/Toast System
function showNotification(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `notification notification-${type}`;
  toast.textContent = message;
  
  const styles = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: type === 'success' ? '#10b981' : '#3b82f6',
    color: '#fff',
    padding: '16px 24px',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    zIndex: '1000',
    maxWidth: '400px',
    animation: 'slideInRight 0.3s ease',
    fontWeight: '600'
  };

  Object.assign(toast.style, styles);
  document.body.appendChild(toast);

  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Add animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    .site-nav {
      margin-left: 0 !important;
    }
  }
`;
document.head.appendChild(styleSheet);


