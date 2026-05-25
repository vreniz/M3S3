  /* ─────────────────────────────────────────────────────────────
     TASK 2 · Selección de elementos con getElementById / querySelector
  ───────────────────────────────────────────────────────────── */
  const inputNota   = document.getElementById('inputNota');      // getElementById
  const btnAgregar  = document.getElementById('btnAgregar');     // getElementById
  const listaNotas  = document.querySelector('#listaNotas');     // querySelector
  const errorMsg    = document.querySelector('#errorMsg');       // querySelector
  const emptyState  = document.querySelector('#emptyState');
  const contadorEl  = document.querySelector('#contadorNotas');
  const logOutput   = document.querySelector('#logOutput');
 
  // Confirmación en consola de que las referencias existen
  console.log('[TASK 2] Elementos seleccionados:');
  console.log('  inputNota  →', inputNota);
  console.log('  btnAgregar →', btnAgregar);
  console.log('  listaNotas →', listaNotas);
 
 
  /* ─────────────────────────────────────────────────────────────
     TASK 5 · Cargar notas guardadas en localStorage al inicio
  ───────────────────────────────────────────────────────────── */
 
  // Arreglo en memoria que siempre refleja el estado real
  let notas = [];
 
  /**
   * Escribe notas[] en localStorage (serializado como JSON).
   */
  const guardarEnStorage = () => {
    localStorage.setItem('notas', JSON.stringify(notas));
    // Mismo mensaje en DevTools Y en el panel visual
    console.log(`[TASK 5] localStorage actualizado (${notas.length} notas)`);
    agregarLog(`localStorage actualizado (${notas.length} notas)`);
  };
 
  /**
   * Lee localStorage y puebla el arreglo notas[].
   * Se llama una sola vez al cargar la página.
   */
  const cargarDesdeStorage = () => {
    const dato = localStorage.getItem('notas');          // recuperar
    if (dato) {
      notas = JSON.parse(dato);                          // convertir JSON → array
      notas.forEach(texto => renderizarNota(texto));     // re-renderizar cada nota
      console.log(`[TASK 5] Notas cargadas desde localStorage: ${notas.length}`);
      agregarLog(`Cargadas ${notas.length} nota(s) desde localStorage`);
    } else {
      console.log('[TASK 5] No hay notas en localStorage.');
      agregarLog('No hay notas guardadas. ¡Empieza a escribir!');
    }
    actualizarUI();
  };
 
 
  /* ─────────────────────────────────────────────────────────────
     TASK 3 · Crear y agregar un <li> al DOM
  ───────────────────────────────────────────────────────────── */
 
  /**
   * Crea un elemento <li> con el texto de la nota y un botón "Eliminar",
   * y lo inserta en la lista usando appendChild().
   * @param {string} texto - Contenido de la nota.
   */
  const renderizarNota = (texto) => {
    /* Crear elementos */
    const li          = document.createElement('li');
    const spanTexto   = document.createElement('span');
    const btnEliminar = document.createElement('button');
 
    /* Asignar clases */
    li.classList.add('nota-item');
    spanTexto.classList.add('nota-texto');
    btnEliminar.classList.add('btn-eliminar');
 
    /* Modificar contenido con textContent (criterio de aceptación) */
    spanTexto.textContent   = texto;            // textContent para el texto
    btnEliminar.textContent = 'Eliminar';       // textContent para el botón
 
    /* Atributo accesibilidad */
    btnEliminar.setAttribute('aria-label', `Eliminar nota: ${texto}`);
 
    /* ─── TASK 4 · Eliminar nota del DOM ─── */
    btnEliminar.addEventListener('click', () => {
      listaNotas.removeChild(li);               // removeChild desde la <ul>
      notas = notas.filter(n => n !== texto);   // actualizar arreglo
 
      // Log PRIMERO → mismo orden que el panel visual
      console.log(`[TASK 4] Nota eliminada: "${texto}"`);
      agregarLog(`Nota eliminada: "${texto}"`);
 
      guardarEnStorage();                       // loggea "localStorage actualizado"
      actualizarUI();
    });
 
    /* Ensamblar y agregar al DOM */
    li.appendChild(spanTexto);
    li.appendChild(btnEliminar);
    listaNotas.appendChild(li);                 // appendChild en la <ul>
  };
 
  /**
   * Manejador del clic en "Agregar".
   */
  const agregarNota = () => {
    const texto = inputNota.value.trim();
 
    /* Validación: campo vacío */
    if (!texto) {
      errorMsg.classList.add('visible');        // mostrar mensaje de error
      inputNota.focus();
      return;
    }
 
    /* Ocultar error si existía */
    errorMsg.classList.remove('visible');
 
    /* Log PRIMERO → mismo orden que el panel visual */
    console.log(`[TASK 3] Nota agregada: "${texto}"`);
    agregarLog(`Nota agregada: "${texto}"`);
 
    /* Agregar al arreglo y guardar en localStorage */
    notas.push(texto);
    guardarEnStorage();                         // TASK 5 → loggea "localStorage actualizado"
 
    /* Renderizar en el DOM */
    renderizarNota(texto);
    actualizarUI();
 
    /* Limpiar y enfocar el input */
    inputNota.value = '';
    inputNota.focus();
  };
 
 
  /* ─────────────────────────────────────────────────────────────
     EVENTOS
  ───────────────────────────────────────────────────────────── */
 
  // Clic en botón Agregar
  btnAgregar.addEventListener('click', agregarNota);
 
  // Enter en el input también agrega la nota
  inputNota.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') agregarNota();
  });
 
  // Ocultar error al empezar a escribir
  inputNota.addEventListener('input', () => {
    if (inputNota.value.trim()) errorMsg.classList.remove('visible');
  });
 
 
  /* ─────────────────────────────────────────────────────────────
     HELPERS DE UI
  ───────────────────────────────────────────────────────────── */
 
  /**
   * Actualiza el contador y el estado vacío.
   */
  const actualizarUI = () => {
    const total = notas.length;
    contadorEl.textContent = `${total} nota${total !== 1 ? 's' : ''}`;
 
    // Mostrar / ocultar estado vacío
    if (total === 0) {
      emptyState.classList.add('visible');
    } else {
      emptyState.classList.remove('visible');
    }
  };
 
  /**
   * Agrega una entrada al panel de consola visual (en pantalla).
   * @param {string} msg - Mensaje a registrar.
   */
  const agregarLog = (msg) => {
    const li = document.createElement('li');
    li.textContent = msg;
    // Insertar al principio para ver lo más reciente arriba
    logOutput.insertBefore(li, logOutput.firstChild);
  };
 
 
  /* ─────────────────────────────────────────────────────────────
     INIT · Cargar datos al arrancar la página
  ───────────────────────────────────────────────────────────── */
  cargarDesdeStorage();   // TASK 5 – recuperar y renderizar notas guardadas