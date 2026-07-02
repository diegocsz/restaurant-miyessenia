document.addEventListener("DOMContentLoaded", () => {
  // Variable global interna que almacenará el arreglo de platos cargados desde el archivo JSON
  let listaProductos = [];

  // Selección del nodo del DOM donde se inyectarán las tarjetas de los platos
  const contenedorProductos = document.getElementById("productos");
  // Selección de todos los elementos interactivos que actúan como botones de categorías
  const botonesCategoria = document.querySelectorAll(".boton_categoria");

  // Función que limpia el contenedor y dibuja las tarjetas correspondientes a la categoría seleccionada
  function renderizarProductos(categoriaSeleccionada) {
    // Vaciamos por completo el contenido HTML actual del contenedor de productos
    contenedorProductos.innerHTML = "";

    // Filtramos el arreglo global quedándonos solo con los elementos que coincidan con la categoría elegida
    const productosFiltrados = listaProductos.filter(
      (producto) => producto.categoria === categoriaSeleccionada,
    );

    // Si la categoría evaluada no contiene ningún producto en el archivo JSON
    if (productosFiltrados.length === 0) {
      // Buscamos el mensaje de sección vacía en las traducciones cargadas o usamos un texto de respaldo
      const mensajeVacioTraducido =
        translations[currentLang]?.["msg.vacio"] ||
        "Próximamente más platos en esta sección...";
      // Insertamos el párrafo con el mensaje correspondiente dentro del contenedor principal
      contenedorProductos.innerHTML = `<p class="mensaje-vacio">${mensajeVacioTraducido}</p>`;
      // Cortamos la ejecución de la función de manera prematura
      return;
    }

    // Iteramos sobre cada uno de los productos que superaron el filtro de la categoría
    productosFiltrados.forEach((producto) => {
      // Creamos un nuevo elemento contenedor de tipo división en la memoria del navegador
      const tarjetaContenedora = document.createElement("div");
      // Le asignamos la clase CSS requerida para los estilos visuales de la tarjeta
      tarjetaContenedora.classList.add("tarjeta_producto");

      // Buscamos el nombre traducido del producto usando su identificador único o usamos el nombre por defecto
      const nombreTraducido =
        translations[currentLang]?.[`prod.name.${producto.id}`] ||
        producto.nombre;
      // Buscamos la descripción traducida del producto usando su identificador único o usamos la descripción por defecto
      const descripcionTraducida =
        translations[currentLang]?.[`prod.desc.${producto.id}`] ||
        producto.desc;

      // Validamos si existe una propiedad de imagen válida o asignamos la ruta de la imagen de respaldo
      const rutaImagenFinal = producto.img || "img/default.png";

      // Estructuramos el contenido HTML interno de la tarjeta usando plantillas literales de JavaScript
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

      // Añadimos la tarjeta recién estructurada como un nodo hijo dentro del contenedor de productos
      contenedorProductos.appendChild(tarjetaContenedora);
    });
  }

  // Recorremos la lista de botones de categorías para escuchar las interacciones del usuario
  botonesCategoria.forEach((botonCategoriaIndividual) => {
    // Escuchamos el evento de clic en cada botón de categoría
    botonCategoriaIndividual.addEventListener("click", () => {
      // Removemos la clase de activación visual a todos los botones para limpiar el estado anterior
      botonesCategoria.forEach((botonParaLimpiar) =>
        botonParaLimpiar.classList.remove("active"),
      );
      // Añadimos la clase de activación visual únicamente al botón que recibió el clic
      botonCategoriaIndividual.classList.add("active");

      // Recuperamos el valor del atributo personalizado que define la categoría de este botón
      const categoriaSeleccionada =
        botonCategoriaIndividual.getAttribute("data-category");
      // Ejecutamos la función de dibujo pasando la categoría que acabamos de recuperar
      renderizarProductos(categoriaSeleccionada);
    });
  });

  // Función asíncrona dedicada a realizar la petición de red para traer el menú del restaurante
  async function cargarMenu() {
    try {
      // Realizamos la petición de red asíncrona hacia el archivo local de productos en formato JSON
      const respuestaPeticion = await fetch("productos.json");
      // Validamos si la respuesta del servidor no fue exitosa (por ejemplo, un error 404 o 500)
      if (!respuestaPeticion.ok) {
        // Lanzamos un error explícito para interrumpir el flujo y saltar directamente al bloque catch
        throw new Error("No se pudo cargar el archivo de productos");
      }
      // Transformamos el cuerpo de la respuesta de texto plano a un objeto o arreglo de JavaScript ejecutable
      listaProductos = await respuestaPeticion.json();

      // Verificamos si existen botones de categoría disponibles en la estructura de la página actual
      if (botonesCategoria.length > 0) {
        // Activamos visualmente el primer botón de la lista por defecto al cargar la página
        botonesCategoria[0].classList.add("active");
        // Renderizamos de forma automática los productos correspondientes a la categoría del primer botón
        renderizarProductos(botonesCategoria[0].getAttribute("data-category"));
      }
    } catch (errorDetectado) {
      // Imprimimos el error detallado en la consola del navegador para facilitar las tareas de depuración
      console.error("Error al inicializar la carta:", errorDetectado);
      // Inyectamos un mensaje de error amigable para el usuario final dentro del contenedor de productos
      contenedorProductos.innerHTML = `<p class="mensaje-vacio">Error al cargar el menú. Inténtalo más tarde.</p>`;
    }
  }

  // Invocamos la función de carga del menú para que inicie la petición apenas se procese este bloque
  cargarMenu();

  // Asignamos la función local al objeto global window para que pueda ser invocada desde la lógica de idiomas
  window.renderizarProductosGlobal = renderizarProductos;
});

// Inicializamos la variable del idioma actual recuperando el valor guardado o asignando español por defecto
let currentLang = localStorage.getItem("lang") || "es";
// Inicializamos el objeto global que contendrá las llaves y textos del idioma activo
let translations = {};

// Función asíncrona encargada de descargar el archivo de traducción e inyectarlo en el HTML
async function applyLang(idiomaSeleccionado) {
  try {
    // Realizamos la petición de red para traer el archivo JSON específico del idioma solicitado
    const respuestaIdioma = await fetch(`lang/${idiomaSeleccionado}.json`);
    // Validamos si el archivo JSON del idioma no existe o no se pudo leer correctamente
    if (!respuestaIdioma.ok)
      throw new Error(`No se pudo cargar el idioma: ${idiomaSeleccionado}`);

    // Convertimos el archivo JSON binario en un objeto estructurado de llaves y valores en JavaScript
    translations = await respuestaIdioma.json();
    // Actualizamos la variable del idioma global con el nuevo código de lenguaje seleccionado
    currentLang = idiomaSeleccionado;
    // Guardamos de forma persistente la preferencia del idioma en la memoria local del navegador del usuario
    localStorage.setItem("lang", idiomaSeleccionado);
    // Actualizamos el atributo oficial de idioma en la etiqueta HTML raíz para mejorar el SEO y la accesibilidad
    document.documentElement.lang = idiomaSeleccionado;

    // Buscamos todos los elementos de la interfaz que posean el atributo de traducción personalizado
    document.querySelectorAll("[data-i18n]").forEach((elementoTraducible) => {
      // Obtenemos el texto traducido correspondiente usando el valor del atributo como llave del diccionario
      const textoTraducido = translations[elementoTraducible.dataset.i18n];
      // Si el texto existe en nuestro archivo JSON, reemplazamos el contenido HTML interno del elemento
      if (textoTraducido !== undefined)
        elementoTraducible.innerHTML = textoTraducido;
    });

    // Buscamos todos los botones que controlan el cambio de idioma en la interfaz gráfica
    document.querySelectorAll(".lang-btn").forEach((botonIdioma) => {
      // Añadimos o removemos la clase de activación visual dependiendo de si coincide con el idioma activo
      botonIdioma.classList.toggle(
        "active",
        botonIdioma.dataset.lang === idiomaSeleccionado,
      );
    });

    // Validamos si la función de dibujo de productos globales ya se encuentra registrada en el objeto window
    if (typeof window.renderizarProductosGlobal === "function") {
      // Localizamos el botón de categoría de comida que se encuentra activo en este preciso momento
      const botonCategoriaActivo = document.querySelector(
        ".boton_categoria.active",
      );
      // Si encontramos un botón activo, forzamos su redibujado para que asimile los textos del nuevo idioma
      if (botonCategoriaActivo) {
        window.renderizarProductosGlobal(
          botonCategoriaActivo.getAttribute("data-category"),
        );
      }
    }
  } catch (errorIdioma) {
    // Registramos el fallo en la consola para saber exactamente qué archivo JSON no se pudo procesar
    console.error("Error al cambiar de idioma:", errorIdioma);
  }
}

// Buscamos todos los botones selectores de idioma para asignarles sus respectivos controladores de eventos
document.querySelectorAll(".lang-btn").forEach((botonIdiomaIndividual) => {
  // Escuchamos el evento de clic sobre cada uno de los botones de cambio de idioma
  botonIdiomaIndividual.addEventListener("click", () =>
    applyLang(botonIdiomaIndividual.dataset.lang),
  );
});

// Inicializamos la escala de la fuente recuperando el valor numérico del almacenamiento local o usando uno por defecto
let fontScale = parseFloat(localStorage.getItem("fontScale")) || 1;
// Inicializamos el estado del contraste alto convirtiendo el texto guardado a un valor booleano puro
let highContrast = localStorage.getItem("highContrast") === "true";

// Inyectamos la variable CSS personalizada de escala en el elemento raíz del documento al iniciar la carga
document.documentElement.style.setProperty("--fs-scale", fontScale);
// Activamos o desactivamos la clase de contraste alto en el cuerpo del documento según la preferencia recuperada
document.body.classList.toggle("high-contrast", highContrast);
// Actualizamos el atributo de accesibilidad aria-pressed en el botón para informar a los lectores de pantalla
document
  .getElementById("btn-contrast")
  .setAttribute("aria-pressed", String(highContrast));

// Escuchamos el evento de clic en el botón encargado de aumentar el tamaño de la tipografía de la web
document.getElementById("btn-font-up").addEventListener("click", () => {
  // Calculamos el nuevo tamaño incrementando en 0.1, asegurando un tope máximo de 1.5 veces el tamaño original
  fontScale = Math.min(1.5, fontScale + 0.1);
  // Actualizamos la propiedad CSS personalizada en la raíz del documento para que los estilos asimilen el cambio
  document.documentElement.style.setProperty("--fs-scale", fontScale);
  // Guardamos de manera persistente el nuevo valor numérico de la escala en la memoria del navegador
  localStorage.setItem("fontScale", fontScale);
});

// Escuchamos el evento de clic en el botón encargado de disminuir el tamaño de la tipografía de la web
document.getElementById("btn-font-down").addEventListener("click", () => {
  // Calculamos el nuevo tamaño reduciendo en 0.1, asegurando un tope mínimo de 0.85 veces el tamaño original
  fontScale = Math.max(0.85, fontScale - 0.1);
  // Actualizamos la propiedad CSS personalizada en la raíz del documento para refrescar los tamaños de fuente
  document.documentElement.style.setProperty("--fs-scale", fontScale);
  // Almacenamos el nuevo valor numérico de forma persistente para futuras visitas del usuario
  localStorage.setItem("fontScale", fontScale);
});

// Escuchamos el evento de clic en el botón selector encargado de conmutar el modo de alto contraste
document.getElementById("btn-contrast").addEventListener("click", () => {
  // Invertimos el valor booleano actual de la variable que controla el estado del contraste alto
  highContrast = !highContrast;
  // Añadimos o removemos la clase CSS del cuerpo del documento según el nuevo estado de la variable
  document.body.classList.toggle("high-contrast", highContrast);
  // Actualizamos el estado del atributo aria-pressed para mantener informadas a las herramientas de accesibilidad
  document
    .getElementById("btn-contrast")
    .setAttribute("aria-pressed", String(highContrast));
  // Guardamos el nuevo estado booleano en formato de cadena de texto dentro de la memoria local
  localStorage.setItem("highContrast", highContrast);
});

// Seleccionamos el elemento del botón hamburguesa del menú de navegación móvil
const hamburger = document.getElementById("hamburger");
// Seleccionamos el contenedor que aloja los enlaces directos de la navegación de la página
const navLinks = document.getElementById("nav-links");

// Escuchamos la interacción de clic sobre el botón del menú hamburguesa para desplegar las opciones
hamburger.addEventListener("click", () => {
  // Conmutamos la clase CSS que controla la apertura visual del contenedor de enlaces de navegación
  const menuAbierto = navLinks.classList.toggle("open");
  // Sincronizamos el estado de accesibilidad aria-expanded con el estado booleano de apertura del menú
  hamburger.setAttribute("aria-expanded", String(menuAbierto));
});

// Buscamos todos los enlaces de anclaje individuales dentro del contenedor de navegación móvil
navLinks.querySelectorAll("a").forEach((enlaceIndividual) => {
  // Escuchamos el clic en cada enlace para cerrar de forma automática el panel al saltar a una sección
  enlaceIndividual.addEventListener("click", () => {
    // Removemos la clase CSS de apertura del contenedor para ocultar el panel de navegación móvil
    navLinks.classList.remove("open");
    // Forzamos el estado de accesibilidad de la hamburguesa a falso indicando que ya está cerrado
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// Seleccionamos todas las pestañas de filtrado estáticas de la sección del menú de comidas
const tabs = document.querySelectorAll(".tab");
// Seleccionamos todas las tarjetas de menú estáticas presentes en el código de la página
const cards = document.querySelectorAll(".menu-card");

// Recorremos cada una de las pestañas estáticas para asignarles su comportamiento de filtrado visual
tabs.forEach((pestanaIndividual) => {
  // Escuchamos el evento de clic sobre la pestaña estática seleccionada
  pestanaIndividual.addEventListener("click", () => {
    // Limpiamos los estados de activación y atributos de accesibilidad de todas las pestañas de la lista
    tabs.forEach((pestanaParaLimpiar) => {
      pestanaParaLimpiar.classList.remove("active");
      pestanaParaLimpiar.setAttribute("aria-selected", "false");
    });
    // Añadimos la clase CSS activa únicamente a la pestaña que acaba de recibir la interacción del usuario
    pestanaIndividual.classList.add("active");
    // Establecemos el atributo de accesibilidad aria-selected en verdadero para la pestaña seleccionada
    pestanaIndividual.setAttribute("aria-selected", "true");

    // Recuperamos el identificador de la categoría almacenado en el atributo de datos de la pestaña
    const categoriaFiltro = pestanaIndividual.dataset.cat;
    // Iteramos por cada una de las tarjetas estáticas para evaluar su visibilidad en la interfaz
    cards.forEach((tarjetaIndividual) => {
      // Conmutamos la clase CSS oculta si la pestaña no es "all" y la categoría de la tarjeta no coincide con el filtro
      tarjetaIndividual.classList.toggle(
        "hidden",
        categoriaFiltro !== "all" &&
          tarjetaIndividual.dataset.cat !== categoriaFiltro,
      );
    });
  });
});

// Creamos un arreglo indexado a partir de todos los elementos pertenecientes a la galería de fotos
const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
// Seleccionamos el nodo del DOM que actúa como el contenedor principal de la pantalla del Lightbox
const lightbox = document.getElementById("lightbox");
// Seleccionamos la etiqueta de imagen interna donde se inyectará la foto ampliada del Lightbox
const lbImg = document.getElementById("lb-img");
// Inicializamos el índice numérico que rastrea la posición de la imagen activa en la galería
let lbIndex = 0;

// Función encargada de abrir la pantalla del Lightbox inyectando los datos de la imagen seleccionada
function openLightbox(indiceImagenSeleccionada) {
  // Actualizamos el índice de seguimiento global con la posición de la imagen recién seleccionada
  lbIndex = indiceImagenSeleccionada;
  // Recuperamos la ruta de la imagen en alta resolución desde el atributo de datos del elemento de la galería
  const rutaImagenAltaResolucion =
    galleryItems[indiceImagenSeleccionada].dataset.src;
  // Recuperamos el texto alternativo de la imagen interna para mantener la accesibilidad en la ampliación
  const textoAlternativoImagen =
    galleryItems[indiceImagenSeleccionada].querySelector("img").alt;

  // Asignamos la ruta de origen recuperada a la etiqueta de imagen interna de la pantalla flotante
  lbImg.src = rutaImagenAltaResolucion;
  // Asignamos el texto alternativo recuperado a la etiqueta de imagen interna de la pantalla flotante
  lbImg.alt = textoAlternativoImagen;
  // Mostramos el elemento del Lightbox removiendo el estado oculto nativo del navegador
  lightbox.hidden = false;
  // Bloqueamos el desplazamiento vertical del cuerpo de la página para evitar desajustes de lectura de fondo
  document.body.style.overflow = "hidden";

  // Almacenamos una referencia global del elemento del DOM que poseía el foco antes de abrir el Lightbox
  window.lastActiveElement = document.activeElement;
  // Trasladamos el foco del teclado directamente al botón de cierre interno de la ventana del Lightbox
  document.getElementById("lb-close").focus();
}

// Función encargada de ocultar la pantalla flotante del Lightbox y restaurar el comportamiento de la página
function closeLightbox() {
  // Ocultamos el contenedor del Lightbox activando el atributo oculto nativo del navegador
  lightbox.hidden = true;
  // Limpiamos la ruta de la imagen interna para liberar recursos de memoria del navegador de forma inmediata
  lbImg.src = "";
  // Restauramos el comportamiento de desplazamiento vertical estándar en el cuerpo de la página web
  document.body.style.overflow = "";

  // Si guardamos una referencia válida del elemento anterior, le devolvemos el foco del teclado inmediatamente
  if (window.lastActiveElement) window.lastActiveElement.focus();
}

// Función encargada de navegar entre las imágenes de la galería sumando o restando al índice actual
function moveLightbox(direccionNavegacion) {
  // Calculamos el nuevo índice usando una operación de módulo para crear un bucle infinito circular continuo
  lbIndex =
    (lbIndex + direccionNavegacion + galleryItems.length) % galleryItems.length;
  // Recuperamos la ruta de la nueva imagen apuntada por el índice de navegación calculado
  const nuevaRutaImagen = galleryItems[lbIndex].dataset.src;
  // Recuperamos el texto alternativo de la nueva foto apuntada por el índice de navegación calculado
  const nuevoTextoAlternativo = galleryItems[lbIndex].querySelector("img").alt;

  // Actualizamos el origen de la imagen de la pantalla flotante con la nueva ruta calculada
  lbImg.src = nuevaRutaImagen;
  // Actualizamos el texto alternativo de la imagen de la pantalla flotante con el nuevo texto calculado
  lbImg.alt = nuevoTextoAlternativo;
}

// Recorremos los elementos de la galería de imágenes para asociar los controladores de apertura
galleryItems.forEach((elementoGaleriaIndividual, indiceGaleria) => {
  // Escuchamos el clic en cada foto de la galería para gatillar la apertura en la posición correspondiente
  elementoGaleriaIndividual.addEventListener("click", () =>
    openLightbox(indiceGaleria),
  );
});

// Asignamos el evento de clic al botón de cierre del Lightbox para invocar la función de ocultado
document.getElementById("lb-close").addEventListener("click", closeLightbox);
// Asignamos el evento de clic al botón de retroceso para mover el Lightbox hacia la imagen anterior
document
  .getElementById("lb-prev")
  .addEventListener("click", () => moveLightbox(-1));
// Asignamos el evento de clic al botón de avance para mover el Lightbox hacia la imagen posterior
document
  .getElementById("lb-next")
  .addEventListener("click", () => moveLightbox(1));

// Escuchamos los clics en el contenedor del Lightbox para cerrarlo si el usuario presiona el fondo oscuro exterior
lightbox.addEventListener("click", (eventoClickFondo) => {
  if (eventoClickFondo.target === lightbox) closeLightbox();
});

// Escuchamos las pulsaciones de teclas globales en el documento para habilitar navegación por teclado
document.addEventListener("keydown", (eventoTeclado) => {
  // Si la pantalla del Lightbox se encuentra oculta en este momento, ignoramos por completo las pulsaciones
  if (lightbox.hidden) return;
  // Si la tecla presionada equivale a la tecla de Escape, cerramos la pantalla del Lightbox de inmediato
  if (eventoTeclado.key === "Escape") closeLightbox();
  // Si la tecla presionada equivale a la flecha izquierda, navegamos hacia la foto anterior de la lista
  if (eventoTeclado.key === "ArrowLeft") moveLightbox(-1);
  // Si la tecla presionada equivale a la flecha derecha, navegamos hacia la foto posterior de la lista
  if (eventoTeclado.key === "ArrowRight") moveLightbox(1);
});

// Seleccionamos todos los elementos de tipo estrella interactivos de la sección de calificación de experiencia
const stars = document.querySelectorAll(".star");
// Inicializamos la variable que guardará la puntuación numérica final seleccionada por el usuario
let selectedRating = 0;

// Recorremos cada estrella de la lista para programar los efectos visuales y de selección
stars.forEach((estrellaIndividual) => {
  // Escuchamos el momento en que el puntero del mouse ingresa al área visual de la estrella analizada
  estrellaIndividual.addEventListener("mouseenter", () => {
    // Recuperamos el valor numérico entero asociado al nivel de esta estrella desde sus atributos de datos
    const valorEstrellaActual = parseInt(estrellaIndividual.dataset.val);
    // Encendemos de forma temporal todas las estrellas cuyo valor sea menor o igual al de la estrella apuntada
    stars.forEach((estrellaParaIluminar) =>
      estrellaParaIluminar.classList.toggle(
        "lit",
        parseInt(estrellaParaIluminar.dataset.val) <= valorEstrellaActual,
      ),
    );
  });

  // Escuchamos el momento en que el puntero del mouse abandona el área visual de la estrella analizada
  estrellaIndividual.addEventListener("mouseleave", () => {
    // Restauramos el estado de iluminación basándonos únicamente en la puntuación fija guardada globalmente
    stars.forEach((estrellaParaRestaurar) =>
      estrellaParaRestaurar.classList.toggle(
        "lit",
        parseInt(estrellaParaRestaurar.dataset.val) <= selectedRating,
      ),
    );
  });

  // Escuchamos el clic del usuario para fijar la calificación de estrellas de forma definitiva en la sesión
  estrellaIndividual.addEventListener("click", () => {
    // Almacenamos el valor numérico de la estrella seleccionada en la variable de seguimiento global
    selectedRating = parseInt(estrellaIndividual.dataset.val);
    // Forzamos la iluminación fija y definitiva de todas las estrellas que alcancen el puntaje establecido
    stars.forEach((estrellaParaFijar) =>
      estrellaParaFijar.classList.toggle(
        "lit",
        parseInt(estrellaParaFijar.dataset.val) <= selectedRating,
      ),
    );
  });
});

// Definimos el conjunto inmutable de hashes SHA-256 correspondientes a los códigos de cupones válidos
const VALID_HASHES = new Set([
  "a5a3f89e9fb1f98b4a39c1bfec97f453f43b1e84e07e5f92c0d77b68f96ac50a", // Código secreto equivalente a MIYESSENIA2025
  "7b05a8c3e921042f21dc6a2a41c820e78cbce2e23f9f1c9d9ed98e1e52c7a311", // Código secreto equivalente a CANCAS2026
  "1e4a06c7b93040a0f5bab7e823d8ee7c9b1f04cc2fc9c7c1d5e77ec4b7a50e8d", // Código secreto equivalente a YESSENIA10
]);

// Función asíncrona encargada de computar el Hash criptográfico SHA-256 de una cadena de texto recibida
async function sha256(textoPlanoMensaje) {
  // Convertimos la cadena de texto a un arreglo de bytes binarios usando codificación estándar UTF-8
  const bytesMensaje = new TextEncoder().encode(
    textoPlanoMensaje.toUpperCase().trim(),
  );
  // Solicitamos a la Web Crypto API del navegador que realice el cálculo del resumen criptográfico SHA-256
  const bufferResultadoHash = await window.crypto.subtle.digest(
    "SHA-256",
    bytesMensaje,
  );
  // Convertimos el buffer binario devuelto en un arreglo hexadecimal plano legible de texto continuo
  return Array.from(new Uint8Array(bufferResultadoHash))
    .map((byteIndividual) => byteIndividual.toString(16).padStart(2, "0"))
    .join("");
}

// Escuchamos el evento de clic sobre el botón encargado de iniciar la validación del cupón de descuento
document.getElementById("btn-validar").addEventListener("click", async () => {
  // Capturamos el texto introducido por el usuario en el campo de entrada removiendo los espacios en blanco externos
  const textoIntroducidoCupon = document
    .getElementById("coupon-input")
    .value.trim();
  // Seleccionamos el nodo del texto de estado donde se imprimen las respuestas del proceso de validación
  const parrafoEstadoCupon = document.getElementById("coupon-status");
  // Creamos un acceso directo abreviado al diccionario de traducciones de la sesión del idioma activo
  const diccionarioTraduccionesActivo = translations[currentLang];
  // Limpiamos cualquier clase CSS previa del párrafo de estado para reiniciar su apariencia visual
  parrafoEstadoCupon.className = "";

  // Validamos si el campo de entrada se encuentra completamente vacío de caracteres legibles
  if (!textoIntroducidoCupon) {
    // Inyectamos el texto de advertencia correspondiente a campo vacío desde nuestro diccionario de traducciones
    parrafoEstadoCupon.textContent =
      diccionarioTraduccionesActivo["cupones.empty"];
    // Asignamos la clase CSS de error para teñir el texto de advertencia de color rojo
    parrafoEstadoCupon.className = "error";
    // Interrumpimos la ejecución del código para obligar al usuario a rellenar el campo
    return;
  }

  // Calculamos de forma asíncrona el hash hexadecimal seguro a partir del código ingresado por el usuario
  const hashTextoIntroducido = await sha256(textoIntroducidoCupon);
  // Recuperamos el arreglo de hashes de cupones usados desde el almacenamiento local o creamos un arreglo vacío
  const arregloCuponesUsados = JSON.parse(
    localStorage.getItem("usedCoupons") || "[]",
  );

  // Verificamos si el hash calculado ya se encuentra registrado dentro de la lista de cupones consumidos
  if (arregloCuponesUsados.includes(hashTextoIntroducido)) {
    // Notificamos al usuario que el beneficio del cupón ya ha sido reclamado en una oportunidad anterior
    parrafoEstadoCupon.textContent =
      "⚠️ Este cupón ya fue canjeado anteriormente.";
    // Aplicamos la clase de error visual para alertar al usuario sobre la invalidez del intento actual
    parrafoEstadoCupon.className = "error";
    // Finalizamos la ejecución del validador de cupones
    return;
  }

  // Evaluamos si el hash calculado existe dentro de nuestro conjunto de hashes válidos autorizados
  if (VALID_HASHES.has(hashTextoIntroducido)) {
    // Imprimimos el mensaje de éxito de validación recuperado desde el diccionario de traducciones activo
    parrafoEstadoCupon.textContent =
      diccionarioTraduccionesActivo["cupones.ok"];
    // Añadimos el nuevo hash aprobado al listado de cupones consumidos de la sesión del cliente
    arregloCuponesUsados.push(hashTextoIntroducido);
    // Guardamos la lista de cupones actualizada convirtiéndola a una cadena de texto dentro de la memoria local
    localStorage.setItem("usedCoupons", JSON.stringify(arregloCuponesUsados));
  } else {
    // Imprimimos el mensaje de error de código incorrecto recuperado desde el diccionario de traducciones activo
    parrafoEstadoCupon.textContent =
      diccionarioTraduccionesActivo["cupones.err"];
    // Aplicamos la clase CSS de error para dar el formato visual adverso al párrafo de estado
    parrafoEstadoCupon.className = "error";
  }
});

// Seleccionamos todos los nodos de la interfaz que deben ejecutar la animación de aparición al hacer scroll
const revealEls = document.querySelectorAll(
  ".menu-card, .gallery-item, .historia-img-wrap, .contact-card, .coupon-box",
);
// Añadimos la clase CSS base de preparación para la animación a cada uno de los elementos seleccionados
revealEls.forEach((elementoParaPreparar) =>
  elementoParaPreparar.classList.add("reveal"),
);

// Instanciamos el Intersection Observer nativo del navegador para vigilar la visibilidad de los elementos
const observer = new IntersectionObserver(
  (entradasObservadas) => {
    // Evaluamos cada una de las entradas de elementos monitoreados por el observador de intersección
    entradasObservadas.forEach((entradaDeElemento) => {
      // Si el elemento cruzó el umbral establecido y ya es visible en la pantalla del usuario
      if (entradaDeElemento.isIntersecting) {
        // Añadimos la clase CSS visible para desencadenar la animación de transición definida en los estilos
        entradaDeElemento.target.classList.add("visible");
        // Dejamos de observar este elemento específico para liberar memoria y evitar ejecuciones redundantes
        observer.unobserve(entradaDeElemento.target);
      }
    });
  },
  { threshold: 0.12 },
); // Configuramos el umbral para requerir que el 12% del elemento sea visible antes de actuar

// Registramos cada uno de los elementos preparados dentro del motor de vigilancia del Intersection Observer
revealEls.forEach((elementoParaVigilar) =>
  observer.observe(elementoParaVigilar),
);

// Escuchamos el evento nativo del DOM para arrancar la carga del idioma inicial guardado de forma segura
document.addEventListener("DOMContentLoaded", () => {
  // Ejecutamos la función de traducción inicial pasando el código de lenguaje guardado en las preferencias
  applyLang(currentLang);
});
