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
└── script.js     ← lógica JavaScript (Tasks 2 – 5)
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
 
### Elements — DOM antes y después
 
**1. Estado vacío** — `#listaNotas` está vacío, sin elementos `<li>` presentes.
 
![DOM vacío](assets/elements/1.Empty.png)
 
**2. Luego de agregar una nota** — aparece un nuevo `<li class="nota-item">` dentro de `#listaNotas` sin recargar la página.
 
![DOM luego de agregar](assets/elements/2.luegodeagregar.png)
 
**3. Luego de eliminar la nota** — el `<li>` se elimina del DOM y la lista vuelve al estado vacío.
 
![DOM luego de eliminar](assets/elements/3.luegodeeliminar.png)
 
---
 
### Console — logs por cada operación
 
**Luego de agregar una nota** — la consola muestra `[TASK 3] Nota agregada` y `[TASK 5] localStorage actualizado`.
 
![Consola luego de agregar](assets/console/1.DOM—despuésdenota.png)
 
**Luego de agregar y eliminar** — secuencia completa de logs: notas agregadas, nota eliminada, localStorage actualizado tras cada acción.
 
![Consola agregar y eliminar](assets/console/2.DOM-agregaryeliminarconstorage.png)
 
**Luego de recargar** — la consola muestra `[TASK 5] Notas cargadas desde localStorage`, confirmando que los datos persistieron.
 
![Consola notas cargadas](assets/console/3.DOM-notascargadasdelstorage.png)
 
---
 
### Application — panel de Local Storage
 
**Con datos, antes de recargar** — la clave `notas` almacena el array actual como string JSON.
 
![LocalStorage sin recargar](assets/application/1.localstoragesnrecargar.png)
 
**Después de recargar** — los datos persisten en Local Storage; las notas siguen presentes y se cargan de vuelta en la interfaz.
 
![LocalStorage después de recargar](assets/application/2.localstoragedesprecargar.png)
 
---


