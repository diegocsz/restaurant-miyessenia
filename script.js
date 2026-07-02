document.addEventListener("DOMContentLoaded", () => {
  let listaProductos = [];

  const contenedorProductos = document.getElementById("productos");
  const botonesCategoria = document.querySelectorAll(".boton_categoria");

  function renderizarProductos(categoriaSeleccionada) {
    contenedorProductos.innerHTML = "";

    const productosFiltrados = listaProductos.filter(
      (producto) => producto.categoria === categoriaSeleccionada,
    );

    if (productosFiltrados.length === 0) {
      const mensajeVacioTraducido =
        translations[currentLang]?.["msg.vacio"] ||
        "Próximamente más platos en esta sección...";
      contenedorProductos.innerHTML = `<p class="mensaje-vacio">${mensajeVacioTraducido}</p>`;
      return;
    }

    productosFiltrados.forEach((producto) => {
      const tarjetaContenedora = document.createElement("div");
      tarjetaContenedora.classList.add("tarjeta_producto");

      const nombreTraducido =
        translations[currentLang]?.[`prod.name.${producto.id}`] ||
        producto.nombre;
      const descripcionTraducida =
        translations[currentLang]?.[`prod.desc.${producto.id}`] ||
        producto.desc;
      const rutaImagenFinal = producto.img || "img/default.png";

      tarjetaContenedora.innerHTML = `
            <article class="menu-card" data-cat="${producto.categoria}" role="listitem">
              <div class="menu-img-wrap">
                <img src="${rutaImagenFinal}" alt="${nombreTraducido}" class="menu-img" loading="lazy">
                <h3>${nombreTraducido}</h3>
              </div>
              <div class="menu-info">
                  <h3>${nombreTraducido}</h3>
                  <p>${descripcionTraducida}</p>
              </div>
            </article>
            `;

      contenedorProductos.appendChild(tarjetaContenedora);
    });
  }

  botonesCategoria.forEach((botonCategoriaIndividual) => {
    botonCategoriaIndividual.addEventListener("click", () => {
      botonesCategoria.forEach((botonParaLimpiar) =>
        botonParaLimpiar.classList.remove("active"),
      );
      botonCategoriaIndividual.classList.add("active");

      const categoriaSeleccionada =
        botonCategoriaIndividual.getAttribute("data-category");
      renderizarProductos(categoriaSeleccionada);
    });
  });

  async function cargarMenu() {
    try {
      const respuestaPeticion = await fetch("productos.json");
      if (!respuestaPeticion.ok) {
        throw new Error("No se pudo cargar el archivo de productos");
      }
      listaProductos = await respuestaPeticion.json();

      if (botonesCategoria.length > 0) {
        botonesCategoria[0].classList.add("active");
        renderizarProductos(botonesCategoria[0].getAttribute("data-category"));
      }
    } catch (errorDetectado) {
      console.error("Error al inicializar la carta:", errorDetectado);
      contenedorProductos.innerHTML = `<p class="mensaje-vacio">Error al cargar el menú. Inténtalo más tarde.</p>`;
    }
  }

  cargarMenu();
  applyLang(currentLang);

  window.renderizarProductosGlobal = renderizarProductos;
});

// Manejo de Idioma e Internacionalización
let currentLang = localStorage.getItem("lang") || "es";
let translations = {};

async function applyLang(idiomaSeleccionado) {
  try {
    const respuestaIdioma = await fetch(`lang/${idiomaSeleccionado}.json`);
    if (!respuestaIdioma.ok)
      throw new Error(`No se pudo cargar el idioma: ${idiomaSeleccionado}`);

    translations = await respuestaIdioma.json();
    currentLang = idiomaSeleccionado;
    localStorage.setItem("lang", idiomaSeleccionado);
    document.documentElement.lang = idiomaSeleccionado;

    document.querySelectorAll("[data-i18n]").forEach((elementoTraducible) => {
      const textoTraducido = translations[elementoTraducible.dataset.i18n];
      if (textoTraducido !== undefined)
        elementoTraducible.innerHTML = textoTraducido;
    });

    document.querySelectorAll(".lang-btn").forEach((botonIdioma) => {
      botonIdioma.classList.toggle(
        "active",
        botonIdioma.dataset.lang === idiomaSeleccionado,
      );
    });

    if (typeof window.renderizarProductosGlobal === "function") {
      const botonCategoriaActivo = document.querySelector(
        ".boton_categoria.active",
      );
      if (botonCategoriaActivo) {
        window.renderizarProductosGlobal(
          botonCategoriaActivo.getAttribute("data-category"),
        );
      }
    }
  } catch (errorIdioma) {
    console.error("Error al cambiar de idioma:", errorIdioma);
  }
}

document.querySelectorAll(".lang-btn").forEach((botonIdiomaIndividual) => {
  botonIdiomaIndividual.addEventListener("click", () =>
    applyLang(botonIdiomaIndividual.dataset.lang),
  );
});

// Características de Accesibilidad
let fontScale = parseFloat(localStorage.getItem("fontScale")) || 1;
let highContrast = localStorage.getItem("highContrast") === "true";

document.documentElement.style.setProperty("--fs-scale", fontScale);
document.body.classList.toggle("high-contrast", highContrast);
document
  .getElementById("btn-contrast")
  .setAttribute("aria-pressed", String(highContrast));

document.getElementById("btn-font-up").addEventListener("click", () => {
  fontScale = Math.min(1.5, fontScale + 0.1);
  document.documentElement.style.setProperty("--fs-scale", fontScale);
  localStorage.setItem("fontScale", fontScale);
});

document.getElementById("btn-font-down").addEventListener("click", () => {
  fontScale = Math.max(0.85, fontScale - 0.1);
  document.documentElement.style.setProperty("--fs-scale", fontScale);
  localStorage.setItem("fontScale", fontScale);
});

document.getElementById("btn-contrast").addEventListener("click", () => {
  highContrast = !highContrast;
  document.body.classList.toggle("high-contrast", highContrast);
  document
    .getElementById("btn-contrast")
    .setAttribute("aria-pressed", String(highContrast));
  localStorage.setItem("highContrast", highContrast);
});

// Menú de Navegación Móvil (Hamburguesa)
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  const menuAbierto = navLinks.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", String(menuAbierto));
});

navLinks.querySelectorAll("a").forEach((enlaceIndividual) => {
  enlaceIndividual.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// Pestañas Estáticas del Menú
const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll(".menu-card");

tabs.forEach((pestanaIndividual) => {
  pestanaIndividual.addEventListener("click", () => {
    tabs.forEach((pestanaParaLimpiar) => {
      pestanaParaLimpiar.classList.remove("active");
      pestanaParaLimpiar.setAttribute("aria-selected", "false");
    });
    pestanaIndividual.classList.add("active");
    pestanaIndividual.setAttribute("aria-selected", "true");

    const categoryFilter = pestanaIndividual.dataset.cat;
    cards.forEach((tarjetaIndividual) => {
      tarjetaIndividual.classList.toggle(
        "hidden",
        categoryFilter !== "all" &&
          tarjetaIndividual.dataset.cat !== categoryFilter,
      );
    });
  });
});

// Galería de Fotos - Lightbox
const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
let lbIndex = 0;

function openLightbox(indiceImagenSeleccionada) {
  lbIndex = indiceImagenSeleccionada;
  const rutaImagenAltaResolucion =
    galleryItems[indiceImagenSeleccionada].dataset.src;
  const textoAlternativoImagen =
    galleryItems[indiceImagenSeleccionada].querySelector("img").alt;

  lbImg.src = rutaImagenAltaResolucion;
  lbImg.alt = textoAlternativoImagen;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";

  window.lastActiveElement = document.activeElement;
  document.getElementById("lb-close").focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lbImg.src = "";
  document.body.style.overflow = "";
  if (window.lastActiveElement) window.lastActiveElement.focus();
}

function moveLightbox(direccionNavegacion) {
  lbIndex =
    (lbIndex + direccionNavegacion + galleryItems.length) % galleryItems.length;
  const nuevaRutaImagen = galleryItems[lbIndex].dataset.src;
  const nuevoTextoAlternativo = galleryItems[lbIndex].querySelector("img").alt;

  lbImg.src = nuevaRutaImagen;
  lbImg.alt = nuevoTextoAlternativo;
}

galleryItems.forEach((elementoGaleriaIndividual, indiceGaleria) => {
  elementoGaleriaIndividual.addEventListener("click", () =>
    openLightbox(indiceGaleria),
  );
});

document.getElementById("lb-close").addEventListener("click", closeLightbox);
document
  .getElementById("lb-prev")
  .addEventListener("click", () => moveLightbox(-1));
document
  .getElementById("lb-next")
  .addEventListener("click", () => moveLightbox(1));

lightbox.addEventListener("click", (eventoClickFondo) => {
  if (eventoClickFondo.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (eventoTeclado) => {
  if (lightbox.hidden) return;
  if (eventoTeclado.key === "Escape") closeLightbox();
  if (eventoTeclado.key === "ArrowLeft") moveLightbox(-1);
  if (eventoTeclado.key === "ArrowRight") moveLightbox(1);
});

// Sistema de Calificación (Estrellas)
const stars = document.querySelectorAll(".star");
let selectedRating = 0;

stars.forEach((estrellaIndividual) => {
  estrellaIndividual.addEventListener("mouseenter", () => {
    const valorEstrellaActual = parseInt(estrellaIndividual.dataset.val);
    stars.forEach((estrellaParaIluminar) =>
      estrellaParaIluminar.classList.toggle(
        "lit",
        parseInt(estrellaParaIluminar.dataset.val) <= valorEstrellaActual,
      ),
    );
  });

  estrellaIndividual.addEventListener("mouseleave", () => {
    stars.forEach((estrellaParaRestaurar) =>
      estrellaParaRestaurar.classList.toggle(
        "lit",
        parseInt(estrellaParaRestaurar.dataset.val) <= selectedRating,
      ),
    );
  });

  estrellaIndividual.addEventListener("click", () => {
    selectedRating = parseInt(estrellaIndividual.dataset.val);
    stars.forEach((estrellaParaFijar) =>
      estrellaParaFijar.classList.toggle(
        "lit",
        parseInt(estrellaParaFijar.dataset.val) <= selectedRating,
      ),
    );
  });
});

// Validación de Cupones de Descuento
const VALID_HASHES = new Set([
  "a5a3f89e9fb1f98b4a39c1bfec97f453f43b1e84e07e5f92c0d77b68f96ac50a", // MIYESSENIA2025
  "7b05a8c3e921042f21dc6a2a41c820e78cbce2e23f9f1c9d9ed98e1e52c7a311", // CANCAS2026
  "1e4a06c7b93040a0f5bab7e823d8ee7c9b1f04cc2fc9c7c1d5e77ec4b7a50e8d", // YESSENIA10
]);

async function sha256(textoPlanoMensaje) {
  const bytesMensaje = new TextEncoder().encode(
    textoPlanoMensaje.toUpperCase().trim(),
  );
  const bufferResultadoHash = await window.crypto.subtle.digest(
    "SHA-256",
    bytesMensaje,
  );
  return Array.from(new Uint8Array(bufferResultadoHash))
    .map((byteIndividual) => byteIndividual.toString(16).padStart(2, "0"))
    .join("");
}

document.getElementById("btn-validar").addEventListener("click", async () => {
  const textoIntroducidoCupon = document
    .getElementById("coupon-input")
    .value.trim();
  const parrafoEstadoCupon = document.getElementById("coupon-status");
  const diccionarioTraduccionesActivo = translations[currentLang];
  parrafoEstadoCupon.className = "";

  if (!textoIntroducidoCupon) {
    parrafoEstadoCupon.textContent =
      diccionarioTraduccionesActivo["cupones.empty"];
    parrafoEstadoCupon.className = "error";
    return;
  }

  const hashTextoIntroducido = await sha256(textoIntroducidoCupon);
  const arregloCuponesUsados = JSON.parse(
    localStorage.getItem("usedCoupons") || "[]",
  );

  if (arregloCuponesUsados.includes(hashTextoIntroducido)) {
    parrafoEstadoCupon.textContent =
      "⚠️ Este cupón ya fue canjeado anteriormente.";
    parrafoEstadoCupon.className = "error";
    return;
  }

  if (VALID_HASHES.has(hashTextoIntroducido)) {
    parrafoEstadoCupon.textContent =
      diccionarioTraduccionesActivo["cupones.ok"];
    arregloCuponesUsados.push(hashTextoIntroducido);
    localStorage.setItem("usedCoupons", JSON.stringify(arregloCuponesUsados));
  } else {
    parrafoEstadoCupon.textContent =
      diccionarioTraduccionesActivo["cupones.err"];
    parrafoEstadoCupon.className = "error";
  }
});

// Animaciones de Aparición (Scroll Reveal)
const revealEls = document.querySelectorAll(
  ".menu-card, .gallery-item, .historia-img-wrap, .contact-card, .coupon-box",
);
revealEls.forEach((elementoParaPreparar) =>
  elementoParaPreparar.classList.add("reveal"),
);

const observer = new IntersectionObserver(
  (entradasObservadas) => {
    entradasObservadas.forEach((entradaDeElemento) => {
      if (entradaDeElemento.isIntersecting) {
        entradaDeElemento.target.classList.add("visible");
        observer.unobserve(entradaDeElemento.target);
      }
    });
  },
  { threshold: 0.12 },
);

revealEls.forEach((elementoParaVigilar) =>
  observer.observe(elementoParaVigilar),
);