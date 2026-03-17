// Mobile Menu Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      menuIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    });

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });
  }
}

// Cookie Consent
function initCookieConsent() {
  const cookieConsent = document.getElementById('cookie-consent');
  const acceptBtn = document.getElementById('cookie-accept');
  const rejectBtn = document.getElementById('cookie-reject');
  const manageBtn = document.getElementById('cookie-manage');

  // Check if user has already made a choice
  const cookieChoice = localStorage.getItem('cookieConsent');
  
  if (!cookieChoice && cookieConsent) {
    cookieConsent.classList.add('active');
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieConsent.classList.remove('active');
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'rejected');
      cookieConsent.classList.remove('active');
    });
  }

  if (manageBtn) {
    manageBtn.addEventListener('click', () => {
      window.location.href = 'cookie-policy.html';
    });
  }
}

// Contact Form Handling
function initContactForm() {
  const forms = document.querySelectorAll('.contact-form form');
  
  forms.forEach(form => {
    const consentCheckbox = form.querySelector('input[name="consent"]');
    const submitBtn = form.querySelector('.form-submit');

    // Enable/disable submit button based on checkbox
    if (consentCheckbox && submitBtn) {
      consentCheckbox.addEventListener('change', () => {
        submitBtn.disabled = !consentCheckbox.checked;
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (consentCheckbox && !consentCheckbox.checked) {
        return;
      }

      // Get form data
      const formData = new FormData(form);
      
      // Hide form and show success message
      const formContainer = form.parentElement;
      const successMessage = formContainer.querySelector('.form-success') || 
                            formContainer.parentElement.querySelector('.form-success');
      
      if (successMessage) {
        form.style.display = 'none';
        successMessage.classList.remove('hidden');
        successMessage.style.display = 'block';

        // Reset after 5 seconds
        setTimeout(() => {
          form.reset();
          form.style.display = 'block';
          successMessage.style.display = 'none';
          successMessage.classList.add('hidden');
          if (submitBtn) submitBtn.disabled = true;
        }, 5000);
      }
    });
  });
}

// Accordion Functionality
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all accordion items
      document.querySelectorAll('.accordion-item').forEach(acc => {
        acc.classList.remove('active');
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Scroll to form buttons
function initScrollToForm() {
  const scrollButtons = document.querySelectorAll('[data-scroll-to]');
  
  scrollButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-scroll-to');
      const target = document.getElementById(targetId);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Package Modal Functionality
function initPackageModal() {
  const modal = document.getElementById('quote-modal');
  const packageButtons = document.querySelectorAll('.package-cta');
  const closeBtn = document.getElementById('modal-close-btn');
  const quoteForm = document.getElementById('quote-form');
  const quoteTypeSelect = document.getElementById('quote-type');
  const modalSuccess = document.getElementById('modal-success');
  const consentCheckbox = document.getElementById('quote-consent');
  const submitBtn = quoteForm ? quoteForm.querySelector('.form-submit') : null;

  if (!modal || !quoteForm) return;

  // Open modal when package button is clicked
  packageButtons.forEach(button => {
    button.addEventListener('click', () => {
      const packageType = button.getAttribute('data-package');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Pre-select the cleaning type
      if (quoteTypeSelect && packageType) {
        quoteTypeSelect.value = packageType;
      }
      
      // Reset form and hide success message
      quoteForm.style.display = 'block';
      modalSuccess.classList.remove('active');
    });
  });

  // Close modal
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    quoteForm.reset();
    if (submitBtn) submitBtn.disabled = true;
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Enable/disable submit button based on checkbox
  if (consentCheckbox && submitBtn) {
    consentCheckbox.addEventListener('change', () => {
      submitBtn.disabled = !consentCheckbox.checked;
    });
  }

  // Handle form submission
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (consentCheckbox && !consentCheckbox.checked) {
      return;
    }

    // Hide form and show success message
    quoteForm.style.display = 'none';
    modalSuccess.classList.add('active');

    // Close modal after 3 seconds
    setTimeout(() => {
      closeModal();
      modalSuccess.classList.remove('active');
    }, 3000);
  });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCookieConsent();
  initContactForm();
  initAccordion();
  initSmoothScroll();
  initScrollToForm();
  initPackageModal();
});