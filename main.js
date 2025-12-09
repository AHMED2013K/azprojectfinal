// ===== Variables globales =====
const WA_NUMBER = '21656590703';
let currentLang = 'fr';
let currentView = 'grid';
let currentPage = 0;
let currentSlide = 0;
const itemsPerPage = 6;

// ===== Données des témoignages =====
const testimonials = [
  {
    id: 1,
    nom: "Koussi",
    prenom: "Sarah",
    pays: "France",
    service: "Alternance",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    note: 5,
    texte: "Grâce à Abroad Zone, j'ai trouvé mon alternance en 3 semaines seulement ! Le suivi était impeccable et les conseils très pertinents. Je recommande vivement leur professionnalisme.",
    projet: "Alternance en Marketing Digital",
    annee: 2024,
    verified: true,
    drapeau: "🇫🇷"
  },
  {
    id: 2,
    nom: "Benali",
    prenom: "Amine",
    pays: "Allemagne",
    service: "Ausbildung",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    note: 5,
    texte: "Un accompagnement clair et professionnel du début à la fin. J'ai pu intégrer une école d'ingénieurs en Allemagne grâce à leur programme Ausbildung.",
    projet: "Ausbildung Ingénierie Informatique",
    annee: 2024,
    verified: true,
    drapeau: "🇩🇪"
  },
  {
    id: 3,
    nom: "Martin",
    prenom: "Léa",
    pays: "Maroc",
    service: "Logement",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    note: 5,
    texte: "Le service de recherche de logement m'a sauvé la vie ! En arrivant au Maroc, j'avais un appartement prêt et toute l'aide pour les démarches administratives.",
    projet: "Logement étudiant à Casablanca",
    annee: 2023,
    verified: true,
    drapeau: "🇲🇦"
  },
  {
    id: 4,
    nom: "Toumi",
    prenom: "Youssef",
    pays: "Dubaï",
    service: "Études",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    note: 5,
    texte: "Abroad Zone m'a guidé pas à pas pour mes études à Dubaï. Je recommande vivement leur professionnalisme et leur réseau de partenaires.",
    projet: "Business International",
    annee: 2024,
    verified: true,
    drapeau: "🇦🇪"
  },
  {
    id: 5,
    nom: "Leroy",
    prenom: "Marie",
    pays: "Suisse",
    service: "Études",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    note: 5,
    texte: "L'équipe d'Abroad Zone a été exceptionnelle pour mon projet d'études en Suisse. Ils m'ont trouvé une formation qui correspond parfaitement à mes objectifs.",
    projet: "Hôtellerie de Luxe",
    annee: 2023,
    verified: true,
    drapeau: "🇨🇭"
  },
  {
    id: 6,
    nom: "Rachid",
    prenom: "Karim",
    pays: "Russie",
    service: "Études",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    note: 5,
    texte: "Grâce à leur accompagnement, j'ai pu intégrer une université prestigieuse en Russie. Je suis reconnaissant pour leur soutien constant.",
    projet: "Médecine Générale",
    annee: 2024,
    verified: true,
    drapeau: "🇷🇺"
  },
  {
    id: 7,
    nom: "Zahra",
    prenom: "Fatima",
    pays: "Chypre",
    service: "Études",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    note: 5,
    texte: "Mon expérience avec Abroad Zone pour mes études à Chypre du Nord a été incroyable. Un accompagnement personnalisé du début à la fin.",
    projet: "Relations Internationales",
    annee: 2024,
    verified: true,
    drapeau: "🇨🇾"
  },
  {
    id: 8,
    nom: "Hammami",
    prenom: "Mohamed",
    pays: "Allemagne",
    service: "Ausbildung",
    avatar: "https://randomuser.me/api/portraits/men/29.jpg",
    note: 5,
    texte: "Le programme Ausbildung en Allemagne a changé ma vie. Abroad Zone m'a accompagné à chaque étape avec professionnalisme et patience.",
    projet: "Ausbildung Électrotechnique",
    annee: 2023,
    verified: true,
    drapeau: "🇩🇪"
  },
  {
    id: 9,
    nom: "Ahmed",
    prenom: "Nadia",
    pays: "France",
    service: "Alternance",
    avatar: "https://randomuser.me/api/portraits/women/52.jpg",
    note: 5,
    texte: "Je recommande vivement Abroad Zone pour leur sérieux et leur efficacité. J'ai trouvé mon alternance rapidement grâce à leur réseau.",
    projet: "Alternance Comptabilité",
    annee: 2024,
    verified: true,
    drapeau: "🇫🇷"
  },
  {
    id: 10,
    nom: "Dubois",
    prenom: "Thomas",
    pays: "Turquie",
    service: "Études",
    avatar: "https://randomuser.me/api/portraits/men/58.jpg",
    note: 4,
    texte: "Excellente expérience pour mes études en Turquie. L'équipe locale m'a parfaitement intégré et accompagné dans toutes les démarches.",
    projet: "Architecture",
    annee: 2023,
    verified: true,
    drapeau: "🇹🇷"
  },
  {
    id: 11,
    nom: "Bernard",
    prenom: "Claire",
    pays: "Chypre",
    service: "Logement",
    avatar: "https://randomuser.me/api/portraits/women/38.jpg",
    note: 5,
    texte: "Service logement impeccable à Chypre ! Un appartement moderne et bien situé avec toutes les commodités. Merci Abroad Zone !",
    projet: "Résidence étudiante Lefke",
    annee: 2024,
    verified: true,
    drapeau: "🇨🇾"
  },
  {
    id: 12,
    nom: "Petit",
    prenom: "Lucas",
    pays: "Russie",
    service: "Études",
    avatar: "https://randomuser.me/api/portraits/men/35.jpg",
    note: 4,
    texte: "Très bon accompagnement pour mes études en Russie. Les cours sont en anglais et l'équipe locale parle français, parfait !",
    projet: "Aéronautique",
    annee: 2024,
    verified: true,
    drapeau: "🇷🇺"
  }
];

// ===== Traductions =====
const translations = {
  fr: {
    formFill: 'Veuillez remplir tous les champs correctement.',
  },
  en: {
    formFill: 'Please complete all fields correctly.',
  }
};

// ===== Fonctions utilitaires =====
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

// ===== Fonctions pour les témoignages =====
function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += `<span class="star ${i <= rating ? '' : 'empty'}">★</span>`;
  }
  return stars;
}

function renderTestimonialCard(testimonial) {
  return `
    <div class="testimonial-card">
      <div class="testimonial-header">
        <img src="${testimonial.avatar}" alt="${testimonial.prenom} ${testimonial.nom}" class="testimonial-avatar">
        <div class="testimonial-info">
          <h4>${testimonial.prenom} ${testimonial.nom}</h4>
          <div class="testimonial-meta">
            <span>${testimonial.drapeau}</span>
            <span>${testimonial.pays}</span>
            <span>•</span>
            <span>${testimonial.service}</span>
            ${testimonial.verified ? '<span class="verified-badge">✓ Vérifié</span>' : ''}
          </div>
        </div>
      </div>
      
      <div class="rating">
        ${renderStars(testimonial.note)}
      </div>
      
      <div class="testimonial-content">
        <p class="testimonial-text">${testimonial.texte}</p>
      </div>
      
      <div class="testimonial-footer">
        <div class="project-info">
          <strong>Projet:</strong> ${testimonial.projet}
        </div>
        <div class="project-info">
          <strong>Année:</strong> ${testimonial.annee}
        </div>
      </div>
    </div>
  `;
}

function showGridView() {
  currentView = 'grid';
  $('#grid-view').style.display = 'grid';
  $('#carousel-view').style.display = 'none';
  $('#grid-pagination').style.display = 'flex';
  
  // Update button states
  $$('.view-btn').forEach(btn => btn.classList.remove('active'));
  if(event && event.target) event.target.classList.add('active');
  
  renderGridView();
}

function showCarouselView() {
  currentView = 'carousel';
  $('#grid-view').style.display = 'none';
  $('#carousel-view').style.display = 'block';
  $('#grid-pagination').style.display = 'none';
  
  // Update button states
  $$('.view-btn').forEach(btn => btn.classList.remove('active'));
  if(event && event.target) event.target.classList.add('active');
  
  renderCarouselView();
}

function renderGridView() {
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageTestimonials = testimonials.slice(startIndex, endIndex);
  
  const gridHTML = pageTestimonials.map(renderTestimonialCard).join('');
  $('#grid-view').innerHTML = gridHTML;
  
  renderPagination();
}

function renderCarouselView() {
  const carouselHTML = testimonials.map(renderTestimonialCard).join('');
  $('#carousel-track').innerHTML = carouselHTML;
  
  renderCarouselIndicators();
  updateCarouselPosition();
}

function renderPagination() {
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  let indicatorsHTML = '';
  
  for (let i = 0; i < totalPages; i++) {
    indicatorsHTML += `<div class="page-dot ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})"></div>`;
  }
  
  $('#page-indicators').innerHTML = indicatorsHTML;
  
  // Update button states
  $('#prev-btn').disabled = currentPage === 0;
  $('#next-btn').disabled = currentPage === totalPages - 1;
}

function renderCarouselIndicators() {
  let indicatorsHTML = '';
  
  for (let i = 0; i < testimonials.length; i++) {
    indicatorsHTML += `<div class="indicator ${i === currentSlide ? 'active' : ''}" onclick="goToSlide(${i})"></div>`;
  }
  
  $('#carousel-indicators').innerHTML = indicatorsHTML;
}

function updateCarouselPosition() {
  const track = $('#carousel-track');
  const slideWidth = 100 / testimonials.length;
  track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
}

function nextPage() {
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  if (currentPage < totalPages - 1) {
    currentPage++;
    renderGridView();
  }
}

function previousPage() {
  if (currentPage > 0) {
    currentPage--;
    renderGridView();
  }
}

function goToPage(page) {
  currentPage = page;
  renderGridView();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % testimonials.length;
  updateCarouselPosition();
  renderCarouselIndicators();
}

function previousSlide() {
  currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
  updateCarouselPosition();
  renderCarouselIndicators();
}

function goToSlide(slide) {
  currentSlide = slide;
  updateCarouselPosition();
  renderCarouselIndicators();
}

// ===== Fonctions pour le menu alternance =====
function showAlternanceMenu() {
  const alternanceSection = $('#alternance-france');
  if (alternanceSection) {
    // Forcer l'affichage de la section principale
    alternanceSection.classList.add('in');
    
    // Forcer l'affichage de TOUS les éléments animés à l'intérieur de la section
    const animatedChildren = alternanceSection.querySelectorAll('[data-anim]');
    animatedChildren.forEach(child => child.classList.add('in'));

    // Attendre un tout petit peu que le navigateur affiche les éléments avant de scroller
    setTimeout(() => {
      alternanceSection.scrollIntoView({ behavior: 'smooth' });
    }, 50); // Un délai de 50 millisecondes est suffisant
  }
}

// ===== Fonctions pour le formulaire de contact =====
function validateForm() {
  let valid = true;
  
  // Reset error messages
  $$('.error-message').forEach(err => err.style.display = 'none');
  
  // Validate name
  const name = $('#name');
  if (!name.value || !name.value.trim()) {
    $('#name-error').style.display = 'block';
    valid = false;
  }
  
  // Validate email
  const email = $('#email');
  if (!email.value || !email.value.trim()) {
    $('#email-error').style.display = 'block';
    valid = false;
  } else {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email.value)) {
      $('#email-error').textContent = currentLang === 'en' ? 'Please enter a valid email address.' : 'Veuillez entrer une adresse email valide.';
      $('#email-error').style.display = 'block';
      valid = false;
    }
  }
  
  // Validate service
  const service = $('#service');
  if (!service.value) {
    $('#service-error').style.display = 'block';
    valid = false;
  }
  
  // Validate message
  const message = $('#message');
  if (!message.value || !message.value.trim()) {
    $('#message-error').style.display = 'block';
    valid = false;
  }
  
  // Validate consent
  const consent = $('#consent');
  if (!consent.checked) {
    $('#consent-error').style.display = 'block';
    valid = false;
  }
  
  return valid;
}

// ===== Fonctions pour le changement de langue =====
function applyLanguage(lang) {
  currentLang = (lang === 'en') ? 'en' : 'fr';
  document.documentElement.lang = currentLang;
  try { localStorage.setItem('abroad_lang', currentLang); } catch(e) {}
  
  if(currentLang === 'en') { 
    $('#lang-en').classList.add('active'); 
    $('#lang-en').setAttribute('aria-selected','true'); 
    $('#lang-fr').classList.remove('active'); 
    $('#lang-fr').setAttribute('aria-selected','false'); 
  }
  else { 
    $('#lang-fr').classList.add('active'); 
    $('#lang-fr').setAttribute('aria-selected','true'); 
    $('#lang-en').classList.remove('active'); 
    $('#lang-en').setAttribute('aria-selected','false'); 
  }

  // Translate elements that have data-fr / data-en
  $$('[data-fr]').forEach(el => {
    const fr = el.getAttribute('data-fr');
    const en = el.getAttribute('data-en');
    if(currentLang === 'en' && en !== null) el.textContent = en;
    else if(currentLang === 'fr' && fr !== null) el.textContent = fr;
  });

  // Update WhatsApp links
  setWhatsAppLink(currentLang);
}

function getWhatsAppLink(lang) {
  const base = `https://wa.me/${WA_NUMBER}`;
  const messages = {
    fr: `Bonjour%20Abroad%20Zone%20%F0%9F%91%8B%20Je%20souhaite%20des%20informations%20sur%20vos%20services%20d'alternance%20et%20d'%C3%A9tudes.`,
    en: `Hello%20Abroad%20Zone%20%F0%9F%91%8B%20I%20would%20like%20information%20about%20your%20study%20and%20work-study%20programs.`
  };
  return `${base}?text=${messages[lang] || messages['fr']}`;
}

function setWhatsAppLink(lang) {
  const link = getWhatsAppLink(lang);
  const whatsappBtn = $('#whatsapp');
  const waLinkFooter = $('#wa-number-footer');
  
  if(whatsappBtn) whatsappBtn.setAttribute('href', link);
  if(waLinkFooter) waLinkFooter.setAttribute('href', link);
  if(waLinkFooter) waLinkFooter.textContent = '+' + WA_NUMBER;
}

// ===== Fonctions pour le menu mobile =====
function toggleMobileMenu() {
  const nav = $('.nav-wrap nav.primary');
  const burger = $('.burger');
  
  if(!nav) return;
  nav.classList.toggle('show');
  burger.classList.toggle('active');
  const expanded = burger.classList.contains('active');
  burger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  const menuIcon = burger.querySelector('.menu-icon');
  const closeIcon = burger.querySelector('.close-icon');
  if(menuIcon && closeIcon){
    if(expanded){ 
      menuIcon.style.display='none'; 
      closeIcon.style.display='block'; 
    } else { 
      menuIcon.style.display='block'; 
      closeIcon.style.display='none'; 
    }
  }
}

// ===== Fonctions pour la modal de confidentialité =====
function openPrivacyModal() {
  const privacyModal = $('#privacy-modal');
  if (!privacyModal) return;
  
  privacyModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  
  // Focus management
  const focusableElements = privacyModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  privacyModal.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
    
    if (e.key === 'Escape') {
      closePrivacyModal();
    }
  });
  
  firstElement.focus();
}

function closePrivacyModal() {
  const privacyModal = $('#privacy-modal');
  if (!privacyModal) return;
  
  privacyModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// =================== NOUVELLES FONCTIONS POUR L'OPTIMISATION MOBILE ===================

// Gestion du swipe pour le carrousel sur mobile
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50; // Distance minimale pour un swipe

function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}

function handleSwipe() {
  if (currentView !== 'carousel') return;
  
  if (touchEndX < touchStartX - swipeThreshold) {
    // Swipe gauche - slide suivant
    nextSlide();
  }
  
  if (touchEndX > touchStartX + swipeThreshold) {
    // Swipe droit - slide précédent
    previousSlide();
  }
}

// Amélioration de la gestion du menu mobile avec support tactile
function setupMobileMenu() {
  const nav = $('.nav-wrap nav.primary');
  const burger = $('.burger');
  
  if (!nav || !burger) return;
  
  // Fermer le menu en cliquant à l'extérieur
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 980 && 
        nav.classList.contains('show') && 
        !nav.contains(e.target) && 
        !burger.contains(e.target)) {
      toggleMobileMenu();
    }
  });
  
  // Fermer le menu avec le bouton Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('show')) {
      toggleMobileMenu();
    }
  });
}

// Amélioration des dropdowns sur mobile
function setupMobileDropdowns() {
  const dropdowns = $$('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 980) {
        e.preventDefault();
        
        // Fermer les autres dropdowns
        dropdowns.forEach(otherDropdown => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove('active');
          }
        });
        
        dropdown.classList.toggle('active');
        
        // Faire défiler jusqu'au menu si ouvert
        if (dropdown.classList.contains('active')) {
          setTimeout(() => {
            menu.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 100);
        }
      }
    });
  });
}

// Optimisation des animations pour mobile
function setupMobileAnimations() {
  // Réduire le seuil de déclenchement des animations sur mobile
  const isMobile = window.innerWidth <= 640;
  const threshold = isMobile ? 0.05 : 0.18;
  
  const animEls = $$('[data-anim]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Ajouter un délai plus court sur mobile pour une meilleure réactivité
        const delay = isMobile ? 50 : 100;
        setTimeout(() => entry.target.classList.add('in'), delay);
      }
    });
  }, { threshold });
  
  animEls.forEach(el => observer.observe(el));
}

// Amélioration de l'accessibilité sur mobile
function setupMobileAccessibility() {
  // S'assurer que tous les éléments interactifs ont une taille de clic suffisante
  const interactiveElements = $$('a, button, input, textarea, select, .card, .destination, .stat, .step');
  
  interactiveElements.forEach(el => {
    // Vérifier si l'élément a une taille suffisante pour le tactile
    const rect = el.getBoundingClientRect();
    const minSize = 44; // Taille minimale recommandée par Apple
    
    if (rect.width < minSize || rect.height < minSize) {
      el.style.minWidth = `${minSize}px`;
      el.style.minHeight = `${minSize}px`;
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
    }
  });
}

// Optimisation du carrousel pour mobile
function setupMobileCarousel() {
  const carouselTrack = $('#carousel-track');
  if (!carouselTrack) return;
  
  // Ajouter les écouteurs d'événements tactiles
  carouselTrack.addEventListener('touchstart', handleTouchStart, { passive: true });
  carouselTrack.addEventListener('touchend', handleTouchEnd, { passive: true });
  
  // Optimiser la taille des slides sur mobile
  const updateSlideSize = () => {
    const isMobile = window.innerWidth <= 640;
    const slides = $$('.carousel-slide');
    
    slides.forEach(slide => {
      if (isMobile) {
        slide.style.padding = '0 10px';
      } else {
        slide.style.padding = '0 15px';
      }
    });
  };
  
  updateSlideSize();
  window.addEventListener('resize', updateSlideSize);
}

// Amélioration de la navigation par ancre sur mobile
function setupMobileAnchors() {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const id = this.getAttribute('href');
      if (id && id.startsWith('#')) {
        e.preventDefault();
        
        const targetSection = document.querySelector(id);
        if (targetSection) {
          // Fermer le menu mobile si ouvert
          const nav = $('.nav-wrap nav.primary');
          if (nav && nav.classList.contains('show')) {
            toggleMobileMenu();
          }
          
          // Forcer l'affichage de la section de destination
          targetSection.classList.add('in');
          
          // Forcer l'affichage de tous les éléments animés à l'intérieur
          const animatedChildren = targetSection.querySelectorAll('[data-anim]');
          animatedChildren.forEach(child => child.classList.add('in'));
          
          // Faire défiler en douceur vers la section avec un décalage pour le header
          const headerHeight = $('header').offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// Fonction pour détecter si l'utilisateur est sur mobile
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
         (window.innerWidth <= 768 && 'ontouchstart' in window);
}

// Initialisation des améliorations mobiles
function initMobileOptimizations() {
  // Ne pas exécuter sur desktop
  if (!isMobileDevice()) return;
  
  setupMobileMenu();
  setupMobileDropdowns();
  setupMobileAnimations();
  setupMobileAccessibility();
  setupMobileCarousel();
  setupMobileAnchors();
}

// ===== FONCTION D'INITIALISATION COMPLÈTE ET À JOUR =====
document.addEventListener('DOMContentLoaded', function() {
  // Set year
  $('#year').textContent = new Date().getFullYear();
  
  // Initialize language
  const saved = (localStorage.getItem('abroad_lang') || '').toLowerCase();
  if(saved === 'en' || saved === 'fr'){ 
    applyLanguage(saved); 
  } else { 
    const navLang = (navigator.language || navigator.userLanguage || 'fr').slice(0,2).toLowerCase(); 
    applyLanguage(navLang === 'en' ? 'en' : 'fr'); 
  }
  
  // Initialize WhatsApp links
  setWhatsAppLink(currentLang);
  
  // Initialize testimonials
  renderGridView();
  
  // Header scroll effect with throttling
  const header = $('header');
  let scrollTimer = null;
  
  function handleScroll() {
    if (scrollTimer) {
      window.cancelAnimationFrame(scrollTimer);
    }
    
    scrollTimer = window.requestAnimationFrame(() => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Mobile menu toggle
  const burger = $('.burger');
  if(burger) {
    burger.addEventListener('click', toggleMobileMenu);
    burger.addEventListener('keydown', (e) => { 
      if(e.key === 'Enter' || e.key === ' ') { 
        e.preventDefault(); 
        toggleMobileMenu(); 
      } 
    });
  }
  
  // Close menu on link click
  $$('a[data-target]').forEach(a => a.addEventListener('click', () => { 
    const nav = $('.nav-wrap nav.primary');
    if(nav && nav.classList.contains('show')) toggleMobileMenu(); 
  }));
  
  // Initialiser les optimisations mobiles
  initMobileOptimizations();
  
  // Contact form validation & WhatsApp redirect
  const contactForm = $('#contact-form');
  const formStatus = $('#form-status');
  const inputs = $$('#contact-form input, #contact-form textarea, #contact-form select');
  
  inputs.forEach(inp => {
    inp.addEventListener('input', () => { 
      const err = $(`#${inp.id}-error`); 
      if(err && inp.value.trim()) err.style.display='none'; 
    });
  });
  
  if(contactForm){
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      
      if (!validateForm()) {
        formStatus.textContent = translations[currentLang].formFill;
        formStatus.className = 'form-status error';
        return;
      }
      
      const name = $('#name').value.trim();
      const email = $('#email').value.trim();
      const service = $('#service').value;
      const message = $('#message').value.trim();
      
      const serviceLabels = {
        alternance: { fr: 'Alternance en France', en: 'Work-study in France' },
        logement: { fr: 'Recherche de logement', en: 'Housing search' },
        etudes: { fr: 'Études à l\'international', en: 'International studies' },
        ausbildung: { fr: 'Ausbildung & Formations pro', en: 'Ausbildung & Professional training' }
      };
      
      const serviceLabel = serviceLabels[service] ? serviceLabels[service][currentLang] : service;
      
      // Create WhatsApp message
      const whatsappMessage = encodeURIComponent(
        `${currentLang === 'en' ? 'New contact request from Abroad Zone website' : 'Nouvelle demande de contact depuis le site Abroad Zone'}\n\n` +
        `${currentLang === 'en' ? 'Name' : 'Nom'}: ${name}\n` +
        `${currentLang === 'en' ? 'Email' : 'Email'}: ${email}\n` +
        `${currentLang === 'en' ? 'Service' : 'Service'}: ${serviceLabel}\n\n` +
        `${currentLang === 'en' ? 'Message' : 'Message'}: ${message}`
      );
      
      // Redirect to WhatsApp
      window.location.href = `https://wa.me/${WA_NUMBER}?text=${whatsappMessage}`;
      
      formStatus.textContent = currentLang === 'en' ? 'Redirecting to WhatsApp...' : 'Redirection vers WhatsApp...';
      formStatus.className = 'form-status success';
      
      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }, 3000);
      
      contactForm.reset();
    });
  }
  
  // Language switch
  $('#lang-fr').addEventListener('click', () => applyLanguage('fr'));
  $('#lang-en').addEventListener('click', () => applyLanguage('en'));
  
  // Accessibility: keyboard tabbing detection
  document.addEventListener('keydown', (e) => { 
    if(e.key === 'Tab') document.body.classList.add('user-is-tabbing'); 
  });
  
  // FAQ Accordion
  $$('button.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      
      // Close all other elements
      $$('button.faq-question').forEach(otherButton => {
        if (otherButton !== button) {
          otherButton.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current element
      button.setAttribute('aria-expanded', !isExpanded);
    });
  });
  
  // Privacy Modal
  const privacyLinks = $$('a[href="#privacy"]');
  privacyLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openPrivacyModal();
    });
  });
  
  // Event listeners for close buttons
  $$('[data-a11y-dialog-hide]').forEach(button => {
    button.addEventListener('click', closePrivacyModal);
  });
  
  // Close modal when clicking on overlay
  const privacyModal = $('#privacy-modal');
  if (privacyModal) {
    privacyModal.addEventListener('click', (e) => {
      if (e.target === privacyModal || e.target.classList.contains('modal-overlay')) {
        closePrivacyModal();
      }
    });
  }
  
  // Make cards focusable for keyboard navigation
  $$('.card, .destination, .stat, .step').forEach(el => {
    if (!el.hasAttribute('tabindex')) {
      el.setAttribute('tabindex', '0');
    }
    
    // Add keyboard event handlers
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });
  
  // Dropdown mobile toggle
  const dropdowns = $$('.dropdown');
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 980) {
        e.preventDefault();
        dropdown.classList.toggle('active');
        
        // Fermer les autres dropdowns
        dropdowns.forEach(otherDropdown => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove('active');
          }
        });
      }
    });
    
    // Fermer le dropdown quand on clique ailleurs
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && window.innerWidth <= 980) {
        dropdown.classList.remove('active');
      }
    });
  });
});

// Gestion de l'indicateur de chargement
window.addEventListener('load', function() {
  const loader = $('#page-loader');
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 300);
  }
});

// Gestion du bouton Retour en haut
const backToTopBtn = $('#back-to-top');

if (backToTopBtn) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Support clavier
  backToTopBtn.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });
}
// Gestion de l'indicateur de chargement
window.addEventListener('load', function() {
  const loader = $('#page-loader');
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 300);
  }
});

// Gestion du bouton Retour en haut
const backToTopBtn = $('#back-to-top');

if (backToTopBtn) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Support clavier
  backToTopBtn.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });
}
