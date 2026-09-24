/**
 * ApexFix Appliance Repair - Interactive UI Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const bookingModal = document.getElementById('bookingModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openContactBtn = document.getElementById('openContactBtn');
  const scheduleServiceBtn = document.getElementById('scheduleServiceBtn');
  const navContactLink = document.getElementById('navContactLink');
  const heroGetStartedBtn = document.getElementById('heroGetStartedBtn');
  const emergencyLink = document.getElementById('emergencyLink');
  const bookingForm = document.getElementById('bookingForm');
  const applianceTypeSelect = document.getElementById('applianceType');
  const urgencySelect = document.getElementById('urgency');
  const repairDateInput = document.getElementById('repairDate');
  const toastMessage = document.getElementById('toastMessage');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const servicesDropdown = document.getElementById('servicesDropdown');
  const servicesDropdownBtn = document.getElementById('servicesDropdownBtn');
  const bookTriggers = document.querySelectorAll('.book-trigger');

  // --- Dark Mode / Theme System ---
  function applyTheme(isDark) {
    const iconMoon = themeToggleBtn ? themeToggleBtn.querySelector('.icon-moon') : null;
    const iconSun = themeToggleBtn ? themeToggleBtn.querySelector('.icon-sun') : null;
    
    if (isDark) {
      document.body.classList.add('dark-theme');
      if (iconMoon) iconMoon.style.display = 'none';
      if (iconSun) iconSun.style.display = 'block';
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Switch to light mode');
    } else {
      document.body.classList.remove('dark-theme');
      if (iconMoon) iconMoon.style.display = 'block';
      if (iconSun) iconSun.style.display = 'none';
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Switch to dark mode');
    }
  }

  // Load saved theme preference
  const savedTheme = localStorage.getItem('apexfix-theme');
  if (savedTheme === 'dark') {
    applyTheme(true);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isCurrentlyDark = document.body.classList.contains('dark-theme');
      const newDark = !isCurrentlyDark;
      applyTheme(newDark);
      localStorage.setItem('apexfix-theme', newDark ? 'dark' : 'light');
      showToast(newDark ? 'Dark theme enabled' : 'Light theme enabled');
    });
  }

  // Mobile / Touch Services Dropdown Toggle
  if (servicesDropdownBtn && servicesDropdown) {
    servicesDropdownBtn.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        servicesDropdown.classList.toggle('open');
      }
    });
  }

  // Set default date to today
  if (repairDateInput) {
    const today = new Date().toISOString().split('T')[0];
    repairDateInput.value = today;
    repairDateInput.min = today;
  }

  // Open Modal function
  function openModal(preselectedService = null, isEmergency = false) {
    if (preselectedService && applianceTypeSelect) {
      for (let option of applianceTypeSelect.options) {
        if (option.value.toLowerCase().includes(preselectedService.toLowerCase()) || 
            preselectedService.toLowerCase().includes(option.value.toLowerCase())) {
          applianceTypeSelect.value = option.value;
          break;
        }
      }
    }

    if (isEmergency && urgencySelect) {
      urgencySelect.value = 'Emergency Same-Day (Under 2 hrs)';
    }

    bookingModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // Close Modal function
  function closeModal() {
    bookingModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Event Listeners for Open Modal
  if (scheduleServiceBtn) {
    scheduleServiceBtn.addEventListener('click', () => openModal());
  }

  if (navContactLink) {
    navContactLink.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  if (openContactBtn) {
    openContactBtn.addEventListener('click', () => openModal());
  }

  const heroBookBtn = document.getElementById('heroBookBtn') || document.getElementById('heroGetStartedBtn');
  if (heroBookBtn) {
    heroBookBtn.addEventListener('click', () => openModal());
  }

  if (emergencyLink) {
    emergencyLink.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(null, true);
    });
  }

  bookTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = trigger.getAttribute('data-service');
      openModal(serviceName);
    });
  });

  // Close Modal triggers
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal.classList.contains('open')) {
      closeModal();
    }
  });

  // Form Submit & Toast
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const appliance = applianceTypeSelect.value;
      const name = document.getElementById('fullName').value;
      
      closeModal();
      showToast(`Thank you ${name}! Repair dispatch for "${appliance}" confirmed.`);
      bookingForm.reset();
      
      if (repairDateInput) {
        repairDateInput.value = new Date().toISOString().split('T')[0];
      }
    });
  }

  // Toast Functionality
  function showToast(message) {
    if (!toastMessage) return;
    
    if (message) {
      const desc = toastMessage.querySelector('.toast-desc');
      if (desc) desc.textContent = message;
    }

    toastMessage.classList.add('show');
    setTimeout(() => {
      toastMessage.classList.remove('show');
    }, 4500);
  }

  // Mobile Navigation Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close mobile menu on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Interactive Lens Indicator Click
  const lensIndicator = document.querySelector('.lens-indicator');
  if (lensIndicator) {
    lensIndicator.addEventListener('click', () => {
      showToast('Certified Master Technician Network: Active & Available 24/7.');
    });
  }

  // --- Stories Carousel Controller ---
  const storiesTrack = document.getElementById('storiesTrack');
  const storiesDeckWrapper = document.getElementById('storiesDeckWrapper');
  const storiesPrevBtn = document.getElementById('storiesPrevBtn');
  const storiesNextBtn = document.getElementById('storiesNextBtn');
  const storiesPagination = document.getElementById('storiesPagination');
  const paginationBars = storiesPagination ? storiesPagination.querySelectorAll('.pagination-bar') : [];

  let currentStoryPage = 0;
  const maxStoryPages = 2;

  function updateStoryCarousel(pageIndex) {
    currentStoryPage = Math.max(0, Math.min(pageIndex, maxStoryPages - 1));

    if (storiesTrack) {
      if (window.innerWidth > 992) {
        storiesTrack.style.transform = `translateX(-${currentStoryPage * 50}%)`;
      } else {
        storiesTrack.style.transform = 'none';
      }
    }

    paginationBars.forEach((bar, idx) => {
      bar.classList.toggle('active', idx === currentStoryPage);
    });

    // Mobile / Tablet smooth scroll support
    if (storiesDeckWrapper && window.innerWidth <= 992) {
      const targetCard = storiesTrack ? storiesTrack.querySelector(`.story-card[data-index="${currentStoryPage * 4}"]`) : null;
      if (targetCard) {
        storiesDeckWrapper.scrollTo({
          left: targetCard.offsetLeft - 16,
          behavior: 'smooth'
        });
      }
    }
  }

  if (storiesPrevBtn) {
    storiesPrevBtn.addEventListener('click', () => {
      if (currentStoryPage > 0) {
        updateStoryCarousel(currentStoryPage - 1);
      } else {
        updateStoryCarousel(maxStoryPages - 1);
      }
    });
  }

  if (storiesNextBtn) {
    storiesNextBtn.addEventListener('click', () => {
      if (currentStoryPage < maxStoryPages - 1) {
        updateStoryCarousel(currentStoryPage + 1);
      } else {
        updateStoryCarousel(0);
      }
    });
  }

  paginationBars.forEach((bar) => {
    bar.addEventListener('click', () => {
      const page = parseInt(bar.getAttribute('data-page'), 10);
      if (!isNaN(page)) {
        updateStoryCarousel(page);
      }
    });
  });

  // Mobile scroll detection for updating pagination active state
  if (storiesDeckWrapper) {
    let scrollTimeout;
    storiesDeckWrapper.addEventListener('scroll', () => {
      if (window.innerWidth > 992) return;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollLeft = storiesDeckWrapper.scrollLeft;
        const maxScroll = storiesDeckWrapper.scrollWidth - storiesDeckWrapper.clientWidth;
        if (maxScroll > 0) {
          const ratio = scrollLeft / maxScroll;
          const targetPage = ratio > 0.4 ? 1 : 0;
          if (targetPage !== currentStoryPage) {
            currentStoryPage = targetPage;
            paginationBars.forEach((bar, idx) => {
              bar.classList.toggle('active', idx === currentStoryPage);
            });
          }
        }
      }, 100);
    }, { passive: true });
  }

  // --- Areas We Proudly Serve Across Dubai Interactive Filter & Booking ---
  const areaSearchInput = document.getElementById('areaSearchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const areasCountText = document.getElementById('areasCountText');
  const areasDistrictsGrid = document.getElementById('areasDistrictsGrid');
  const areasEmptyState = document.getElementById('areasEmptyState');
  const areaCards = document.querySelectorAll('.area-card');
  const dubaiMapHub = document.querySelector('.dubai-map-hub');

  if (areaSearchInput && areaCards.length > 0) {
    const totalDistricts = areaCards.length;

    areaSearchInput.addEventListener('input', () => {
      const query = areaSearchInput.value.trim().toLowerCase();
      let matchCount = 0;

      if (searchClearBtn) {
        searchClearBtn.style.display = query.length > 0 ? 'inline-flex' : 'none';
      }

      areaCards.forEach(card => {
        const districtName = (card.getAttribute('data-district') || '').toLowerCase();
        if (query === '' || districtName.includes(query)) {
          card.classList.remove('card-hidden');
          matchCount++;
        } else {
          card.classList.add('card-hidden');
        }
      });

      // Update counter text
      if (areasCountText) {
        if (query === '' || matchCount === totalDistricts) {
          areasCountText.textContent = `${totalDistricts} Key Districts`;
        } else if (matchCount === 1) {
          areasCountText.textContent = '1 District Found';
        } else {
          areasCountText.textContent = `${matchCount} Districts Found`;
        }
      }

      // Toggle empty state
      if (areasEmptyState && areasDistrictsGrid) {
        if (matchCount === 0) {
          areasEmptyState.style.display = 'block';
          areasDistrictsGrid.style.display = 'none';
        } else {
          areasEmptyState.style.display = 'none';
          areasDistrictsGrid.style.display = 'grid';
        }
      }
    });

    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', () => {
        areaSearchInput.value = '';
        areaSearchInput.dispatchEvent(new Event('input'));
        areaSearchInput.focus();
      });
    }

    // Card click triggers booking modal with district feedback
    areaCards.forEach(card => {
      card.addEventListener('click', () => {
        const districtName = card.getAttribute('data-district');
        showToast(`📍 Direct dispatch available in ${districtName}!`);
        openModal();
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  // Interactive Dubai Dispatch Hub Pinpoint
  if (dubaiMapHub) {
    dubaiMapHub.addEventListener('click', () => {
      showToast('🚀 Dubai Dispatch Hub: 14+ Mobile Vans actively servicing all districts.');
    });
  }

  // --- Brand Category Filtering ---
  const brandFilterPills = document.querySelectorAll('.brand-filter-pill');
  const brandCards = document.querySelectorAll('.brand-curved-card');
  const brandsCategoryHint = document.getElementById('brandsCategoryHint');

  const categoryHints = {
    'all': 'Showing all <strong>20 certified brands</strong> with same-day technician dispatch across Dubai.',
    'kitchen': 'Showing <strong>10 certified kitchen & cooking brands</strong> for Ovens, Cooktops, Ranges & Dishwashers.',
    'laundry': 'Showing <strong>9 master laundry brands</strong> for Washing Machines, Dryers & Laundry Centers.',
    'cooling': 'Showing <strong>9 refrigeration specialist brands</strong> for French-Door, Side-by-Side & Deep Freezers.',
    'ac': 'Showing <strong>7 authorized AC brands</strong> for Split AC, Central HVAC, Chillers & VRV Systems.'
  };

  if (brandFilterPills.length > 0 && brandCards.length > 0) {
    brandFilterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const filter = pill.getAttribute('data-filter');

        // Update active class & ARIA
        brandFilterPills.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');

        // Update hint text
        if (brandsCategoryHint && categoryHints[filter]) {
          brandsCategoryHint.style.opacity = '0';
          setTimeout(() => {
            brandsCategoryHint.innerHTML = categoryHints[filter];
            brandsCategoryHint.style.opacity = '1';
          }, 150);
        }

        // Filter cards smoothly
        brandCards.forEach(card => {
          const categories = card.getAttribute('data-categories') || '';
          const matches = (filter === 'all') || categories.split(' ').includes(filter);

          if (matches) {
            card.classList.remove('card-hidden');
            card.style.display = 'flex';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px) scale(0.96)';
            card.classList.add('card-hidden');
          }
        });
      });
    });
  }

  // --- FAQ Accordion Logic ---
  const faqCards = document.querySelectorAll('.faq-card');
  const faqExpandAllBtn = document.getElementById('faqExpandAllBtn');

  if (faqCards.length > 0) {
    faqCards.forEach(card => {
      const header = card.querySelector('.faq-card-header');
      if (!header) return;

      header.addEventListener('click', () => {
        const isCurrentActive = card.classList.contains('active');

        // Close other open cards for elegant single-open accordion behavior
        faqCards.forEach(c => {
          if (c !== card && c.classList.contains('active')) {
            c.classList.remove('active');
            const h = c.querySelector('.faq-card-header');
            if (h) h.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle clicked card
        if (isCurrentActive) {
          card.classList.remove('active');
          header.setAttribute('aria-expanded', 'false');
        } else {
          card.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // "View All FAQ" button expands or contracts all cards
  if (faqExpandAllBtn && faqCards.length > 0) {
    faqExpandAllBtn.addEventListener('click', () => {
      const allActive = Array.from(faqCards).every(c => c.classList.contains('active'));
      faqCards.forEach(card => {
        const header = card.querySelector('.faq-card-header');
        if (allActive) {
          card.classList.remove('active');
          if (header) header.setAttribute('aria-expanded', 'false');
        } else {
          card.classList.add('active');
          if (header) header.setAttribute('aria-expanded', 'true');
        }
      });

      const btnSpan = faqExpandAllBtn.querySelector('span');
      if (btnSpan) {
        btnSpan.textContent = allActive ? 'View All FAQ' : 'Collapse All FAQ';
      }
    });
  }

  // --- Sticky Navbar Scroll Elevation & Active Link Spy ---
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link:not(.nav-dropdown-toggle)');
  const sections = document.querySelectorAll('#home, #about, #services, #brands, #service-areas, #faq, #contact');

  function updateNavbarOnScroll() {
    const scrollY = window.scrollY;

    // Elevate navbar when scrolled past top
    if (navbar) {
      if (scrollY > 15) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }
    }

    // Dynamic section active pill spy using getBoundingClientRect
    let currentId = '';
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 160 && rect.bottom >= 140) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active-pill');
        } else {
          link.classList.remove('active-pill');
        }
      });
    }
  }

  window.addEventListener('scroll', updateNavbarOnScroll, { passive: true });
  window.addEventListener('resize', updateNavbarOnScroll, { passive: true });
  updateNavbarOnScroll();
});


