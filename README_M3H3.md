# Lista de Notas · DOM Practice

Mini-app de notas construida con HTML, CSS y JavaScript vanilla como ejercicio de manipulación del DOM y persistencia con `localStorage`.

---

## Objetivo

Practicar las APIs nativas del navegador para:

- Seleccionar elementos del DOM con `getElementById` y `querySelector`
- Crear, insertar y eliminar nodos dinámicamente con `createElement`, `appendChild` y `removeChild`
- Modificar contenido con `textContent`
- Persistir datos entre recargas usando `localStorage`

---

## Estructura del proyecto

```
M3H3/
├── index.html     ← estructura HTML de la app
├── styles.css     ← estilos y variables CSS
└── script2.js     ← lógica JavaScript (Tasks 2 – 5)
```

---

## Cómo correr el proyecto

No requiere instalación ni servidor. Basta con abrir `index.html` directamente en el navegador:

```
Doble click en index.html
```

O desde la terminal:

```bash
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

> ⚠️ Si se usa Live Server en VS Code, cada vez que `localStorage` cambia el servidor puede detectar actividad. Se recomienda abrir el archivo directamente para evitar recargas inesperadas.

---

## Funcionalidades

| Acción | Comportamiento |
|---|---|
| Escribir en el input y hacer click en **Agregar** | Crea un `<li>` con la nota y lo inserta en la lista |
| Presionar **Enter** en el input | Equivale a hacer click en Agregar |
| Hacer click en **Eliminar** de una nota | Remueve el `<li>` del DOM y actualiza `localStorage` |
| Recargar la página | Las notas persisten — se recuperan desde `localStorage` |
| Intentar agregar una nota vacía | Muestra un mensaje de error sin agregar nada |

---

## Tareas implementadas

### TASK 1 — Estructura HTML

`index.html` contiene:

- Título e instrucción
- `<input id="inputNota">` y `<button id="btnAgregar">`
- `<ul id="listaNotas">` donde se renderizan las notas
- Estado vacío, contador y consola visual

### TASK 2 — Selección de elementos

```javascript
// getElementById
const inputNota  = document.getElementById('inputNota');
const btnAgregar = document.getElementById('btnAgregar');

// querySelector
const listaNotas = document.querySelector('#listaNotas');
const errorMsg   = document.querySelector('#errorMsg');
```

Se loggean en consola al cargar la página para confirmar que las referencias existen.

### TASK 3 — Agregar notas al DOM

```javascript
const renderizarNota = (texto) => {
  const li          = document.createElement('li');
  const spanTexto   = document.createElement('span');
  const btnEliminar = document.createElement('button');

  spanTexto.textContent   = texto;       // textContent para el texto
  btnEliminar.textContent = 'Eliminar';  // textContent para el botón

  li.appendChild(spanTexto);
  li.appendChild(btnEliminar);
  listaNotas.appendChild(li);            // appendChild en la <ul>
};
```

Antes de renderizar, se valida que el input no esté vacío. Si lo está, se muestra `#errorMsg` y se enfoca el input de nuevo.

### TASK 4 — Eliminar notas del DOM

```javascript
btnEliminar.addEventListener('click', () => {
  listaNotas.removeChild(li);              // removeChild desde la <ul>
  notas = notas.filter(n => n !== texto);  // actualizar arreglo en memoria
  guardarEnStorage();
});
```

### TASK 5 — Persistencia con `localStorage`

```javascript
// Guardar
localStorage.setItem('notas', JSON.stringify(notas));

// Recuperar al cargar la página
const dato = localStorage.getItem('notas');
if (dato) {
  notas = JSON.parse(dato);               // JSON string → array
  notas.forEach(texto => renderizarNota(texto));
}
```

Cada vez que se agrega o elimina una nota, el arreglo en memoria se sincroniza con `localStorage`. Al recargar, se recupera y se re-renderiza cada nota.

### TASK 6 — Validación y evidencias

La app incluye una **consola visual** en pantalla (`#logOutput`) que registra en tiempo real:

- Cuántas notas se cargaron desde `localStorage` al iniciar
- Qué nota se agregó o eliminó
- Cuándo se actualizó `localStorage`

Esto permite verificar el comportamiento sin abrir DevTools.

**Para verificar en el navegador:**

1. Abrir DevTools → pestaña **Application** → **Local Storage** → `file://`
2. Agregar notas y observar cómo la clave `notas` se actualiza con cada acción
3. Recargar la página y comprobar que las notas persisten

---

## Criterios de aceptación cumplidos

| Criterio | Estado |
|---|---|
| `appendChild` y `removeChild` para agregar y eliminar del DOM | ✅ |
| Al menos dos métodos de selección (`getElementById`, `querySelector`) | ✅ |
| Contenido modificado con `textContent` | ✅ |
| Notas persisten tras recargar | ✅ |
| Acciones evidenciadas en consola (DevTools y panel visual) | ✅ |
| Código comentado con `let` / `const` | ✅ |

---

## Conceptos clave usados

| Concepto | Dónde se usa |
|---|---|
| `document.getElementById` | Selección de input y botón Agregar |
| `document.querySelector` | Selección de lista, error, contador y log |
| `document.createElement` | Crear `<li>`, `<span>`, `<button>` |
| `appendChild` | Insertar nota en `<ul>` |
| `removeChild` | Eliminar nota de `<ul>` |
| `textContent` | Asignar texto a span y botón |
| `classList.add / remove` | Mostrar y ocultar error y estado vacío |
| `localStorage.setItem` | Guardar notas serializadas como JSON |
| `localStorage.getItem` | Recuperar notas al cargar la página |
| `JSON.stringify / parse` | Serializar y deserializar el array de notas |
| `addEventListener` | Click en Agregar y Eliminar, Enter en input |
