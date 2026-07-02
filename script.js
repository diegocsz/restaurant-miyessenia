document.addEventListener("DOMContentLoaded", () => {
    // 1. Declaramos la variable que guardará los platos del JSON
    let listaProductos = [];

    // 2. Selección de los elementos de tu HTML
    const contenedorProductos = document.getElementById("productos");
    const botonesCategoria = document.querySelectorAll(".boton_categoria");

    // 3. Función encargada de borrar y dibujar los platos en el <main>
    function renderizarProductos(categoriaSeleccionada) {
        contenedorProductos.innerHTML = "";

        // Filtramos usando la lista cargada desde el JSON
        const productosFiltrados = listaProductos.filter(producto => producto.categoria === categoriaSeleccionada);

        if (productosFiltrados.length === 0) {
            // Ajustado para usar las traducciones de idioma de tu segundo bloque de código
            const msgVacio = translations[currentLang]?.['msg.vacio'] || "Próximamente más platos en esta sección...";
            contenedorProductos.innerHTML = `<p class="mensaje-vacio">${msgVacio}</p>`;
            return;
        }

        productosFiltrados.forEach(producto => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta_producto");
            
            // Integración con tus traducciones dinámicas por ID de producto
            const nombreTraducido = translations[currentLang]?.[`prod.name.${producto.id}`] || producto.nombre;
            const descTraducida = translations[currentLang]?.[`prod.desc.${producto.id}`] || producto.desc;
            
            // Si el objeto no tiene imagen asignada en el JSON, colocamos una por defecto
            const rutaImagen = producto.img || "img/default.png";

            tarjeta.innerHTML = `
            <article class="menu-card" data-cat="${producto.categoria}" role="listitem">
              <div class="menu-img-wrap">
                <img src="${rutaImagen}" alt="${nombreTraducido}" class="menu-img" loading="lazy">
                <h3>${nombreTraducido}</h3>
              </div>
              <div class="menu-info">
                  <h3>${nombreTraducido}</h3>
                  <p>${descTraducida}</p>
              </div>
            </article>
            `;
            
            contenedorProductos.appendChild(tarjeta);
        });
    }

    // 4. Asignar el evento "click" a tus botones
    botonesCategoria.forEach(boton => {
        boton.addEventListener("click", () => {
            botonesCategoria.forEach(btn => btn.classList.remove("active"));
            boton.classList.add("active");

            const categoria = boton.getAttribute("data-category");
            renderizarProductos(categoria);
        });
    });

    // 5. NUEVA CARGA INICIAL: Traer los datos del JSON mediante Fetch API
    async function cargarMenu() {
        try {
            // Cambia "productos.json" por la ruta correcta si está en otra carpeta (ej: "./data/productos.json")
            const respuesta = await fetch("productos.json");
            if (!respuesta.ok) {
                throw new Error("No se pudo cargar el archivo de productos");
            }
            listaProductos = await respuesta.json();

            // Una vez cargados los datos, ejecutamos la inicialización por defecto
            if(botonesCategoria.length > 0) {
                botonesCategoria[0].classList.add("active");
                renderizarProductos(botonesCategoria[0].getAttribute("data-category"));
            }
        } catch (error) {
            console.error("Error al inicializar la carta:", error);
            contenedorProductos.innerHTML = `<p class="mensaje-vacio">Error al cargar el menú. Inténtalo más tarde.</p>`;
        }
    }

    // Ejecutamos la carga del JSON
    cargarMenu();
    
    // Hacemos que la función sea accesible de forma global para que applyLang() pueda llamarla al cambiar idiomas
    window.renderizarProductosGlobal = renderizarProductos;
});

/* ─────────────────────────────────────────────
   IDIOMA — Cargado dinámicamente desde archivos JSON
───────────────────────────────────────────── */
let currentLang = localStorage.getItem('lang') || 'es';
let translations = {}; // Empezamos vacío, se llenará con el fetch

// Función asíncrona para aplicar el idioma cargando su respectivo JSON
async function applyLang(lang) {
  try {
    // 1. Buscamos el archivo JSON correspondiente al idioma
    const response = await fetch(`lang/${lang}.json`);
    if (!response.ok) throw new Error(`No se pudo cargar el idioma: ${lang}`);
    
    translations = await response.json();
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    // 2. Traducimos los elementos estáticos del HTML que usan data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = translations[el.dataset.i18n];
      if (val !== undefined) el.innerHTML = val;
    });

    // 3. Actualizamos el estado visual de los botones de cambio de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // 4. Forzamos el re-renderizado de los productos dinámicos con el nuevo idioma
    if (typeof window.renderizarProductosGlobal === 'function') {
      const botonActivo = document.querySelector('.boton_categoria.active');
      if (botonActivo) {
        window.renderizarProductosGlobal(botonActivo.getAttribute("data-category"));
      }
    }
  } catch (error) {
    console.error("Error al cambiar de idioma:", error);
  }
}

// Escuchador de clics para los botones de idioma
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

/* ─────────────────────────────────────────────
   ACCESIBILIDAD — Modificado con memoria persistente
───────────────────────────────────────────── */
let fontScale    = parseFloat(localStorage.getItem('fontScale')) || 1;
let highContrast = localStorage.getItem('highContrast') === 'true';

// Aplicar estados iniciales guardados
document.documentElement.style.setProperty('--fs-scale', fontScale);
document.body.classList.toggle('high-contrast', highContrast);
document.getElementById('btn-contrast').setAttribute('aria-pressed', String(highContrast));

document.getElementById('btn-font-up').addEventListener('click', () => {
  fontScale = Math.min(1.5, fontScale + 0.1);
  document.documentElement.style.setProperty('--fs-scale', fontScale);
  localStorage.setItem('fontScale', fontScale); // 💾 Guarda
});

document.getElementById('btn-font-down').addEventListener('click', () => {
  fontScale = Math.max(0.85, fontScale - 0.1);
  document.documentElement.style.setProperty('--fs-scale', fontScale);
  localStorage.setItem('fontScale', fontScale); // 💾 Guarda
});

document.getElementById('btn-contrast').addEventListener('click', () => {
  highContrast = !highContrast;
  document.body.classList.toggle('high-contrast', highContrast);
  document.getElementById('btn-contrast').setAttribute('aria-pressed', String(highContrast));
  localStorage.setItem('highContrast', highContrast); // 💾 Guarda
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
  // ... tu código base ...
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  
  // Guardamos cuál fue el elemento que abrió el lightbox
  window.lastActiveElement = document.activeElement; 
  document.getElementById('lb-close').focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lbImg.src = '';
  document.body.style.overflow = '';
  
  // Devolvemos el foco exactamente a la foto original de donde vino
  if (window.lastActiveElement) window.lastActiveElement.focus(); 
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
   INIT — Carga inicial controlada
───────────────────────────────────────────── */
// Esperamos a que el DOM esté listo para cargar el idioma por defecto
document.addEventListener("DOMContentLoaded", () => {
  applyLang(currentLang);
});