'use strict';
const translations = {
  es: {
    'nav.menu':      'Carta',
    'nav.galeria':   'Galería',
    'nav.historia':  'Historia',
    'nav.contacto':  'Contacto',
    'nav.ubicacion': 'Ubicación',
    'nav.cupones':   'Cupones',

    'hero.eyebrow': 'Cancas · Ruta Máncora – Punta Sal',
    'hero.title':   'Sabor de mar,<br><em>bienvenida de casa</em>',
    'hero.sub':     'Platillos frescos del Pacífico Norte, cocinados con sazón familiar desde la orilla.',
    'hero.cta1':    'Ver la carta',
    'hero.cta2':    'Reservar por WhatsApp',

    'menu.eyebrow':      'Lo que cocinamos',
    'menu.title':        'Nuestra carta',
    'menu.sub':          'Filtra por categoría y encuentra tu plato favorito.',
    'menu.tab.all':      'Todo',
    'menu.tab.entradas': 'Entradas',
    'menu.tab.pescados': 'Pescados',
    'menu.tab.bebidas':  'Bebidas',

    'plato.ceviche':        'Ceviche de conchas',
    'plato.ceviche.desc':   'Conchas negras marinadas en limón, ají limo y cebolla morada.',
    'plato.causa':          'Causa de camarones',
    'plato.causa.desc':     'Papa amarilla sazonada, rellena con camarones salteados y palta.',
    'plato.leche':          'Leche de tigre',
    'plato.leche.desc':     'Fondo de ceviche con trozos de pescado, cancha y camote.',
    'plato.sudado':         'Sudado de pescado',
    'plato.sudado.desc':    'Corvina fresca en caldo de chicha de jora, tomate y ají amarillo.',
    'plato.frito':          'Pescado frito con arroz',
    'plato.frito.desc':     'Lenguado entero frito, acompañado de arroz blanco, yuca y salsa criolla.',
    'plato.jalea':          'Jalea mixta',
    'plato.jalea.desc':     'Variedad de mariscos y pescado rebozado, con yuca frita y zarza criolla.',
    'plato.parihuela':      'Parihuela',
    'plato.parihuela.desc': 'Sopa marinera con cangrejos, almejas, filete y trozos de mariscos frescos.',
    'plato.chicha':         'Chicha morada',
    'plato.chicha.desc':    'Bebida artesanal de maíz morado con clavo y canela.',
    'plato.limonada':       'Limonada de la casa',
    'plato.limonada.desc':  'Limón sutil, azúcar y hierbabuena, servida bien fría.',
    'plato.cafe':           'Café pasado',
    'plato.cafe.desc':      'Café de grano norteño, servido en chusco.',

    'galeria.eyebrow': 'Momentos en el restaurante',
    'galeria.title':   'Galería',
    'galeria.sub':     'Haz clic en una foto para verla completa.',

    'historia.eyebrow': 'Nuestra historia',
    'historia.title':   'Del mar a la mesa,<br>desde siempre',
    'historia.p1':      'Mi Yessenia nació en Cancas como un sueño familiar: trasladar el sabor del Pacífico Norte directamente al plato del viajero que recorre la Panamericana. Detrás de cada ceviche hay manos que conocen el mar.',
    'historia.p2':      'La pesca artesanal de Cancas es el alma del restaurante. Trabajamos con pescadores locales para garantizar que el producto llegue fresco cada mañana, honrando la tradición de la costa norte del Perú.',
    'historia.p3':      'Hoy, en la ruta Máncora – Cancas – Punta Sal, somos la parada donde el turista descansa y el lugareño se sienta como en casa.',

    'contacto.eyebrow':     'Estamos para ti',
    'contacto.title':       'Contáctanos',
    'contacto.sub':         'Reserva tu mesa o consulta lo que necesites.',
    'contacto.whatsapp':    'WhatsApp',
    'contacto.whatsapp.sub':'Reservas y consultas',
    'contacto.llamar':      'Llamar',
    'contacto.horario':     'Horario',
    'contacto.horario.val': 'Lun – Dom · 8 am – 9 pm',

    'ubicacion.eyebrow': '¿Dónde estamos?',
    'ubicacion.title':   '¿Cómo llegar?',
    'ubicacion.sub':     'Estamos sobre la Panamericana Norte, en Cancas — a 20 min al sur de Máncora.',
    'ubicacion.cta':     'Abrir ruta en Google Maps',

    'cupones.eyebrow': 'Premio por visitarnos',
    'cupones.title':   '¿Tienes un cupón?',
    'cupones.sub':     'Ingresa el código de tu ticket y califica tu experiencia para canjear tu beneficio.',
    'cupones.btn':     'Validar cupón',
    'cupones.ok':      '✅ ¡Cupón válido! Muestra esta pantalla en caja para tu beneficio.',
    'cupones.err':     '❌ Código no válido. Verifica el ticket e inténtalo de nuevo.',
    'cupones.empty':   'Por favor ingresa el código de tu ticket.',

    'footer.tagline':       'Del Pacífico Norte a tu mesa.',
    'footer.nav.title':     'Navegación',
    'footer.contact.title': 'Contáctanos',
    'footer.social.title':  'Síguenos',
    'footer.bottom':        '© 2026 Restaurante Mi Yessenia · Cancas, Perú · Desarrollado por estudiantes UTP – Taller de Programación Web.',
  },

  en: {
    'nav.menu':      'Menu',
    'nav.galeria':   'Gallery',
    'nav.historia':  'Story',
    'nav.contacto':  'Contact',
    'nav.ubicacion': 'Location',
    'nav.cupones':   'Coupons',

    'hero.eyebrow': 'Cancas · Route Máncora – Punta Sal',
    'hero.title':   'Taste of the sea,<br><em>warmth of home</em>',
    'hero.sub':     'Fresh dishes from the Northern Pacific, cooked with family tradition right on the shore.',
    'hero.cta1':    'View the menu',
    'hero.cta2':    'Book via WhatsApp',

    'menu.eyebrow':      'What we cook',
    'menu.title':        'Our menu',
    'menu.sub':          'Filter by category and find your favourite dish.',
    'menu.tab.all':      'All',
    'menu.tab.entradas': 'Starters',
    'menu.tab.pescados': 'Seafood',
    'menu.tab.bebidas':  'Drinks',

    'plato.ceviche':        'Black clam ceviche',
    'plato.ceviche.desc':   'Black clams marinated in lime, ají limo chilli and red onion.',
    'plato.causa':          'Prawn causa',
    'plato.causa.desc':     'Seasoned yellow potato filled with sautéed prawns and avocado.',
    'plato.leche':          "Tiger's milk",
    'plato.leche.desc':     'Ceviche base with fish pieces, toasted corn and sweet potato.',
    'plato.sudado':         'Steamed fish',
    'plato.sudado.desc':    'Fresh sea bass steamed in chicha de jora broth with tomato and ají amarillo.',
    'plato.frito':          'Fried fish with rice',
    'plato.frito.desc':     'Whole fried sole, served with white rice, yuca and criolla sauce.',
    'plato.jalea':          'Mixed jalea',
    'plato.jalea.desc':     'Assorted battered seafood and fish with fried yuca and criolla relish.',
    'plato.parihuela':      'Parihuela',
    'plato.parihuela.desc': 'Seafood chowder with crab, clams, fillet and fresh shellfish.',
    'plato.chicha':         'Purple corn chicha',
    'plato.chicha.desc':    'Artisan purple corn drink with clove and cinnamon.',
    'plato.limonada':       'House lemonade',
    'plato.limonada.desc':  'Subtle lime, sugar and mint, served ice cold.',
    'plato.cafe':           'Drip coffee',
    'plato.cafe.desc':      'Northern grain coffee, served in a traditional clay cup.',

    'galeria.eyebrow': 'Moments at the restaurant',
    'galeria.title':   'Gallery',
    'galeria.sub':     'Click a photo to view it full size.',

    'historia.eyebrow': 'Our story',
    'historia.title':   'From the sea to the table,<br>always',
    'historia.p1':      "Mi Yessenia was born in Cancas as a family dream: to bring the flavour of the Northern Pacific directly to the plate of every traveller on the Panamericana. Behind every ceviche are hands that know the sea.",
    'historia.p2':      "Artisan fishing in Cancas is the soul of the restaurant. We work with local fishermen to ensure the product arrives fresh every morning, honouring the tradition of Peru's northern coast.",
    'historia.p3':      'Today, on the Máncora – Cancas – Punta Sal route, we are the stop where the tourist rests and the local feels at home.',

    'contacto.eyebrow':     'We are here for you',
    'contacto.title':       'Contact us',
    'contacto.sub':         'Book your table or ask whatever you need.',
    'contacto.whatsapp':    'WhatsApp',
    'contacto.whatsapp.sub':'Bookings & enquiries',
    'contacto.llamar':      'Call us',
    'contacto.horario':     'Opening hours',
    'contacto.horario.val': 'Mon – Sun · 8 am – 9 pm',

    'ubicacion.eyebrow': 'Where are we?',
    'ubicacion.title':   'How to get here?',
    'ubicacion.sub':     'We are on the Panamericana Norte in Cancas — 20 min south of Máncora.',
    'ubicacion.cta':     'Open route in Google Maps',

    'cupones.eyebrow': 'Reward for visiting us',
    'cupones.title':   'Got a coupon?',
    'cupones.sub':     'Enter the code from your ticket and rate your experience to redeem your benefit.',
    'cupones.btn':     'Validate coupon',
    'cupones.ok':      '✅ Valid coupon! Show this screen at the till to receive your benefit.',
    'cupones.err':     '❌ Invalid code. Check your ticket and try again.',
    'cupones.empty':   'Please enter the code from your ticket.',

    'footer.tagline':       'From the Northern Pacific to your table.',
    'footer.nav.title':     'Navigation',
    'footer.contact.title': 'Contact',
    'footer.social.title':  'Follow us',
    'footer.bottom':        '© 2026 Restaurante Mi Yessenia · Cancas, Peru · Developed by UTP students – Web Programming Workshop.',
  }
};

/* ─────────────────────────────────────────────
   IDIOMA — guardado en localStorage
───────────────────────────────────────────── */
let currentLang = localStorage.getItem('lang') || 'es';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);           // ← guarda en localStorage
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = translations[lang]?.[el.dataset.i18n];
    if (val !== undefined) el.innerHTML = val;
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

/* ─────────────────────────────────────────────
   ACCESIBILIDAD — contraste y tamaño
   (en memoria de sesión, no localStorage)
───────────────────────────────────────────── */
let fontScale    = 1;
let highContrast = false;

document.getElementById('btn-font-up').addEventListener('click', () => {
  fontScale = Math.min(1.5, fontScale + 0.1);
  document.documentElement.style.setProperty('--fs-scale', fontScale);
});
document.getElementById('btn-font-down').addEventListener('click', () => {
  fontScale = Math.max(0.85, fontScale - 0.1);
  document.documentElement.style.setProperty('--fs-scale', fontScale);
});
document.getElementById('btn-contrast').addEventListener('click', () => {
  highContrast = !highContrast;
  document.body.classList.toggle('high-contrast', highContrast);
  document.getElementById('btn-contrast').setAttribute('aria-pressed', String(highContrast));
});

/* ─────────────────────────────────────────────
   HAMBURGER
───────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ─────────────────────────────────────────────
   MENÚ TABS
───────────────────────────────────────────── */
const tabs  = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.menu-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const cat = tab.dataset.cat;
    cards.forEach(card => {
      card.classList.toggle('hidden', cat !== 'all' && card.dataset.cat !== cat);
    });
  });
});

/* ─────────────────────────────────────────────
   GALERÍA — LIGHTBOX
───────────────────────────────────────────── */
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox     = document.getElementById('lightbox');
const lbImg        = document.getElementById('lb-img');
let   lbIndex      = 0;

function openLightbox(index) {
  lbIndex = index;
  const src = galleryItems[index].dataset.src;
  const alt = galleryItems[index].querySelector('img').alt;
  lbImg.src = src;
  lbImg.alt = alt;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  document.getElementById('lb-close').focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lbImg.src = '';
  document.body.style.overflow = '';
  galleryItems[lbIndex].focus();
}

function moveLightbox(dir) {
  lbIndex = (lbIndex + dir + galleryItems.length) % galleryItems.length;
  const src = galleryItems[lbIndex].dataset.src;
  const alt = galleryItems[lbIndex].querySelector('img').alt;
  lbImg.src = src;
  lbImg.alt = alt;
}

galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});
document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.getElementById('lb-prev').addEventListener('click',  () => moveLightbox(-1));
document.getElementById('lb-next').addEventListener('click',  () => moveLightbox(1));

lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => {
  if (lightbox.hidden) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  moveLightbox(-1);
  if (e.key === 'ArrowRight') moveLightbox(1);
});

/* ─────────────────────────────────────────────
   ESTRELLAS DE CALIFICACIÓN
───────────────────────────────────────────── */
const stars = document.querySelectorAll('.star');
let selectedRating = 0;

stars.forEach(star => {
  star.addEventListener('mouseenter', () => {
    const v = parseInt(star.dataset.val);
    stars.forEach(s => s.classList.toggle('lit', parseInt(s.dataset.val) <= v));
  });
  star.addEventListener('mouseleave', () => {
    stars.forEach(s => s.classList.toggle('lit', parseInt(s.dataset.val) <= selectedRating));
  });
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.dataset.val);
    stars.forEach(s => s.classList.toggle('lit', parseInt(s.dataset.val) <= selectedRating));
  });
});

/* ─────────────────────────────────────────────
   CUPONES — SHA-256 con Web Crypto API
───────────────────────────────────────────── */
const VALID_HASHES = new Set([
  'a5a3f89e9fb1f98b4a39c1bfec97f453f43b1e84e07e5f92c0d77b68f96ac50a', // MIYESSENIA2025
  '7b05a8c3e921042f21dc6a2a41c820e78cbce2e23f9f1c9d9ed98e1e52c7a311', // CANCAS2026
  '1e4a06c7b93040a0f5bab7e823d8ee7c9b1f04cc2fc9c7c1d5e77ec4b7a50e8d', // YESSENIA10
]);

async function sha256(msg) {
  const buf  = new TextEncoder().encode(msg.toUpperCase().trim());
  const hash = await window.crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,'0')).join('');
}

document.getElementById('btn-validar').addEventListener('click', async () => {
  const input  = document.getElementById('coupon-input').value.trim();
  const status = document.getElementById('coupon-status');
  const t      = translations[currentLang];
  status.className = '';

  if (!input) { status.textContent = t['cupones.empty']; status.className = 'error'; return; }

  const hash = await sha256(input);
  const used = JSON.parse(localStorage.getItem('usedCoupons') || '[]');

  if (used.includes(hash)) {
    status.textContent = '⚠️ Este cupón ya fue canjeado anteriormente.';
    status.className = 'error';
    return;
  }

  if (VALID_HASHES.has(hash)) {
    status.textContent = t['cupones.ok'];
    used.push(hash);
    localStorage.setItem('usedCoupons', JSON.stringify(used));
  } else {
    status.textContent = t['cupones.err'];
    status.className = 'error';
  }
});

/* ─────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────── */
const revealEls = document.querySelectorAll(
  '.menu-card, .gallery-item, .historia-img-wrap, .contact-card, .coupon-box'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────── */
applyLang(currentLang);   // restaura idioma guardado en localStorage
