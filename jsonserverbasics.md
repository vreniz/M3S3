# 🗄️ JSON Server + Fetch API — Guía desde cero (para dummies 🐣)

Una API falsa completa con cero backend real. Perfecta para prototipos y practicar fetch.

---

## ¿Qué es json-server?

`json-server` convierte un archivo `.json` en una **API REST funcional** al instante.
Sin Node propio, sin Express, sin configuración compleja. Solo un archivo y un comando.

Imagínatelo así:
```
db.json  →  json-server  →  http://localhost:3000/productos  ✅
  (tus datos)    (la magia)         (tu API lista para fetch)
```

---

## 0. Antes de empezar — Requisitos

Necesitas tener **Node.js** instalado. Para verificar, abre tu terminal y escribe:

```bash
node -v
npm -v
```

Si ves números (ej: `v20.11.0`), estás lista. Si no, descarga Node desde [nodejs.org](https://nodejs.org) (versión LTS).

---

## 1. Crear la carpeta del proyecto desde cero

Abre tu terminal (o la terminal integrada de VS Code) y ejecuta esto paso a paso:

```bash
# 1. Crea una carpeta nueva
mkdir mi-proyecto-api

# 2. Entra a esa carpeta
cd mi-proyecto-api

# 3. Abre VS Code desde aquí (opcional pero recomendado)
code .
```

Ahora estás dentro de tu carpeta vacía. ✅

---

## 2. Inicializar el proyecto con npm

Esto crea el archivo `package.json`, que es el "cerebro" de tu proyecto: guarda el nombre, versión y las dependencias que instales.

```bash
npm init -y
```

El flag `-y` responde "sí" a todas las preguntas automáticamente. Verás algo así:

```json
{
  "name": "mi-proyecto-api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Este archivo se creó solito en tu carpeta. No lo toques por ahora. ✅

---

## 3. Instalar json-server

```bash
npm install json-server --save-dev
```

¿Qué pasó aquí?
- `npm install` → descarga e instala el paquete
- `json-server` → el nombre del paquete
- `--save-dev` → lo registra en tu `package.json` como dependencia de desarrollo

Después de instalarlo verás una carpeta `node_modules/` aparecer. Es normal, ahí vive json-server. No la toques. ✅

Tu estructura de carpetas ahora se ve así:
```
mi-proyecto-api/
├── node_modules/      ← generada sola, no tocar
├── package.json       ← el cerebro del proyecto
└── package-lock.json  ← generado solo, no tocar
```

---

## 4. Crear tu base de datos falsa

Dentro de `mi-proyecto-api/`, crea un archivo llamado `db.json`:

```json
{
  "productos": [
    { "id": 1, "nombre": "Guitarra eléctrica", "precio": 850000 },
    { "id": 2, "nombre": "Bajo Fender", "precio": 1200000 },
    { "id": 3, "nombre": "Batería Pearl", "precio": 3500000 }
  ],
  "usuarios": [
    { "id": 1, "nombre": "Rosy", "email": "rosy@ejemplo.com" }
  ]
}
```

> Cada clave del objeto (`"productos"`, `"usuarios"`) se convierte en un **endpoint** de tu API automáticamente.

Tu estructura ahora:
```
mi-proyecto-api/
├── node_modules/
├── db.json            ← tus datos (nueva!)
├── package.json
└── package-lock.json
```

---

## 5. Agregar el script en package.json

Abre `package.json` y reemplaza la línea del script `"test"` para que quede así:

```json
{
  "name": "mi-proyecto-api",
  "version": "1.0.0",
  "scripts": {
    "api": "json-server --watch db.json --port 3000"
  },
  "devDependencies": {
    "json-server": "^1.0.0"
  }
}
```

> Solo cambia la parte de `"scripts"`. El resto déjalo como está.

---

## 6. Levantar el servidor

En la terminal, estando dentro de `mi-proyecto-api/`, ejecuta:

```bash
npm run api
```

Verás algo así:

```
JSON Server started on PORT :3000
Press CTRL-C to stop

Watching db.json...

( ˶ˆ꒳ˆ˵ )

Index:
http://localhost:3000/

Static files:
Serving ./public directory if it exists

Endpoints:
http://localhost:3000/productos
http://localhost:3000/usuarios
```

✅ **¡Tu API está viva!** Puedes abrir `http://localhost:3000/productos` en el navegador y ver tus datos.

> ⚠️ Deja esta terminal abierta mientras trabajas. Si la cierras, el servidor se apaga.

---

## 7. Endpoints disponibles (automáticos)

| Método   | URL                  | Acción                        |
|----------|----------------------|-------------------------------|
| `GET`    | `/productos`         | Obtener todos                 |
| `GET`    | `/productos/1`       | Obtener uno por ID            |
| `POST`   | `/productos`         | Crear uno nuevo               |
| `PUT`    | `/productos/1`       | Reemplazar uno completo       |
| `PATCH`  | `/productos/1`       | Actualizar campos específicos |
| `DELETE` | `/productos/1`       | Eliminar uno                  |

---

## 8. Entendiendo fetch — antes de usarlo

`fetch` es una función nativa de JavaScript que hace peticiones HTTP. Así funciona mentalmente:

```
Tu código JS  →  fetch()  →  pide datos al servidor  →  el servidor responde  →  tú recibes los datos
```

Fetch devuelve una **Promesa**: no tienes los datos al instante, sino que llegarán "después". Por eso usamos `.then()` o `async/await` para esperar.

Anatomía de un fetch básico:
```javascript
fetch("URL de la API")          // 1. Haz la petición
  .then(res => res.json())      // 2. Convierte la respuesta a JSON (JavaScript puro)
  .then(data => console.log(data)) // 3. Usa los datos
  .catch(err => console.error(err)); // 4. Si algo falla, muéstralo
```

---

## 9. Haciendo fetch a tu API

### GET — Obtener todos los productos
```javascript
fetch("http://localhost:3000/productos")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### GET — Obtener un producto por ID
```javascript
fetch("http://localhost:3000/productos/1")
  .then(res => res.json())
  .then(data => console.log(data));
```

### POST — Crear un nuevo producto
```javascript
fetch("http://localhost:3000/productos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"   // Le dices: "te mando JSON"
  },
  body: JSON.stringify({                 // Convierte objeto JS → texto JSON
    nombre: "Pedal de efectos",
    precio: 320000
  })
})
  .then(res => res.json())
  .then(data => console.log("Creado:", data));
```
> json-server asigna el `id` automáticamente 🎉

### PATCH — Actualizar solo un campo
```javascript
fetch("http://localhost:3000/productos/1", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ precio: 900000 })
})
  .then(res => res.json())
  .then(data => console.log("Actualizado:", data));
```

### DELETE — Eliminar un producto
```javascript
fetch("http://localhost:3000/productos/1", {
  method: "DELETE"
})
  .then(res => {
    if (res.ok) console.log("Eliminado correctamente");
  });
```

---

## 10. Con async/await — las 4 funciones base (la forma moderna y más legible)

`async/await` es azúcar sintáctica sobre las Promesas. Hace que el código asíncrono se lea como si fuera síncrono (de arriba a abajo).

Aquí están los 4 métodos fundamentales como funciones con nombre claro, para que la relación entre el nombre de la función y el método HTTP sea evidente:

```javascript
const BASE_URL = "http://localhost:3000";

// ─────────────────────────────────────────────
// GET — obtener todos los productos
// ─────────────────────────────────────────────
async function get() {
  try {
    // "await" pausa hasta que el servidor responda
    const res = await fetch(`${BASE_URL}/productos`);

    // Si el código de respuesta NO es 200-299, lanzamos error
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

    // res.json() convierte el texto de la respuesta en un objeto JS
    const data = await res.json();

    console.log("Productos:", data);
  } catch (error) {
    console.error("Algo salió mal:", error);
  }
}

// ─────────────────────────────────────────────
// POST — crear un producto nuevo
// ─────────────────────────────────────────────
async function post() {
  try {
    const res = await fetch(`${BASE_URL}/productos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"  // le avisas al servidor que mandas JSON
      },
      body: JSON.stringify({                // convierte objeto JS → string JSON
        nombre: "Pedal Boss DS-1",
        precio: 320000
      })
    });

    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

    const data = await res.json(); // el servidor devuelve el objeto creado (con id)
    console.log("Creado:", data);
  } catch (error) {
    console.error("Algo salió mal:", error);
  }
}

// ─────────────────────────────────────────────
// PUT — reemplazar un producto completo por ID
// PUT reemplaza TODO el objeto. Si omites un campo, ese campo desaparece.
// ─────────────────────────────────────────────
async function put() {
  try {
    const res = await fetch(`${BASE_URL}/productos/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: "Guitarra acústica Yamaha",  // debes enviar TODOS los campos
        precio: 950000
      })
    });

    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

    const data = await res.json();
    console.log("Reemplazado:", data);
  } catch (error) {
    console.error("Algo salió mal:", error);
  }
}

// ─────────────────────────────────────────────
// DELETE — eliminar un producto por ID
// ─────────────────────────────────────────────
async function del() {
  try {
    const res = await fetch(`${BASE_URL}/productos/1`, {
      method: "DELETE"
    });

    // DELETE exitoso devuelve código 200 pero sin cuerpo JSON
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

    console.log("Eliminado correctamente ✅");
  } catch (error) {
    console.error("Algo salió mal:", error);
  }
}

// Llama la que necesites:
get();
// post();
// put();
// del();
```

> **💡 PUT vs PATCH — ¿cuál usar?**
> - `PUT` → reemplaza el objeto **completo**. Si mandas solo `{ precio: 900000 }`, el campo `nombre` desaparece.
> - `PATCH` → actualiza **solo los campos que mandas**. El resto queda intacto.
> - Para ediciones parciales, siempre prefiere `PATCH`.

---

## 11. Ejemplo completo — Modularizado en 3 archivos

En lugar de poner todo en un solo HTML, separamos responsabilidades. Cada archivo tiene su propio trabajo:

```
mi-proyecto-api/
├── index.html      ← solo estructura (el esqueleto)
├── style.css       ← solo estilos (la apariencia)
└── main.js         ← solo lógica JS (el comportamiento + fetch)
```

> En el HTML vinculamos los otros dos archivos con `<link>` y `<script>`.

---

### 📄 `index.html`

Solo estructura. Sin una línea de CSS ni JS aquí adentro.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Mi tienda — JSON Server</title>

  <!-- Vincula el CSS externo -->
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <h1>🎸 Tienda de instrumentos</h1>
  <p class="subtitulo">Consumiendo json-server en tiempo real</p>

  <div class="controles">
    <button id="btn-get">GET — Ver productos</button>
    <button id="btn-post">POST — Agregar uno</button>
    <button id="btn-put">PUT — Reemplazar ID 1</button>
    <button id="btn-delete">DELETE — Borrar ID 1</button>
  </div>

  <!-- Aquí se renderizan las cards -->
  <div id="lista"></div>

  <p class="log-titulo">📋 Respuesta de la API:</p>
  <div id="log">Presiona un botón para ver la respuesta aquí...</div>

  <!-- Vincula el JS externo. Va al final del body para que el HTML cargue primero -->
  <script src="main.js"></script>

</body>
</html>
```

---

### 🎨 `style.css`

Solo estilos. Cero lógica aquí.

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', sans-serif;
  background: #0f0f0f;
  color: #f0f0f0;
  min-height: 100vh;
  padding: 40px 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 10px;
  color: #e2b96f;
}

.subtitulo {
  text-align: center;
  color: #888;
  margin-bottom: 40px;
  font-size: 0.95rem;
}

/* ── Botones ── */
.controles {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

button {
  padding: 10px 22px;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s, transform 0.1s;
}

button:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

#btn-get    { background: #3b82f6; color: white; }
#btn-post   { background: #22c55e; color: white; }
#btn-put    { background: #f59e0b; color: #111; }
#btn-delete { background: #ef4444; color: white; }

/* ── Cards ── */
#lista {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  max-width: 800px;
  margin: 0 auto 40px;
}

.card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 20px;
  transition: border-color 0.2s;
}

.card:hover {
  border-color: #e2b96f;
}

.card h3 {
  color: #e2b96f;
  margin-bottom: 8px;
  font-size: 1rem;
}

.card p {
  color: #aaa;
  font-size: 0.88rem;
}

.card .precio {
  color: #22c55e;
  font-weight: 700;
  font-size: 1.1rem;
  margin-top: 10px;
}

/* ── Log de respuesta ── */
.log-titulo {
  text-align: center;
  color: #555;
  font-size: 0.8rem;
  margin: 0 auto 8px;
  max-width: 800px;
}

#log {
  background: #111;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  color: #7ee787;
  min-height: 80px;
  white-space: pre-wrap;
}
```

---

### ⚙️ `main.js`

Solo lógica: fetch, render y eventos. Cero HTML ni CSS aquí.

```javascript
// ── Configuración ─────────────────────────────────
const BASE_URL = "http://localhost:3000";

// Referencias al DOM (los elementos del HTML que vamos a manipular)
const lista = document.getElementById("lista");
const log   = document.getElementById("log");

// ── Utilidades ────────────────────────────────────

// Muestra la respuesta JSON en el recuadro de log
function mostrarLog(data) {
  log.textContent = JSON.stringify(data, null, 2);
}

// Muestra un mensaje de estado en el área de cards
function mostrarMensaje(texto, color) {
  lista.innerHTML = `<p style="color:${color};text-align:center;grid-column:1/-1">${texto}</p>`;
}

// Genera las cards de productos en el DOM
function renderProductos(productos) {
  lista.innerHTML = "";
  productos.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${p.nombre}</h3>
      <p>ID: ${p.id}</p>
      <p class="precio">$${p.precio.toLocaleString("es-CO")}</p>
    `;
    lista.appendChild(card);
  });
}

// ── Funciones de fetch ────────────────────────────

async function get() {
  try {
    const res = await fetch(`${BASE_URL}/productos`);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const data = await res.json();
    renderProductos(data);
    mostrarLog(data);
  } catch (err) {
    log.textContent = "❌ Error: " + err.message;
  }
}

async function post() {
  const nuevo = { nombre: "Pedal Boss DS-1", precio: 320000 };
  try {
    const res = await fetch(`${BASE_URL}/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo)
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const data = await res.json();
    mostrarLog(data);
    mostrarMensaje("✅ Producto creado. Presiona GET para ver la lista.", "#22c55e");
  } catch (err) {
    log.textContent = "❌ Error: " + err.message;
  }
}

async function put() {
  const reemplazo = { nombre: "Guitarra Yamaha F310", precio: 950000 };
  try {
    const res = await fetch(`${BASE_URL}/productos/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reemplazo)
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const data = await res.json();
    mostrarLog(data);
    mostrarMensaje("✏️ ID 1 reemplazado. Presiona GET para ver el cambio.", "#f59e0b");
  } catch (err) {
    log.textContent = "❌ Error: " + err.message;
  }
}

async function del() {
  try {
    const res = await fetch(`${BASE_URL}/productos/1`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    mostrarLog({ mensaje: "Producto con ID 1 eliminado correctamente ✅" });
    mostrarMensaje("🗑️ ID 1 eliminado. Presiona GET para confirmar.", "#ef4444");
  } catch (err) {
    log.textContent = "❌ Error: " + err.message;
  }
}

// ── Event listeners ───────────────────────────────
// Conectan cada botón del HTML con su función de fetch

document.getElementById("btn-get").addEventListener("click", get);
document.getElementById("btn-post").addEventListener("click", post);
document.getElementById("btn-put").addEventListener("click", put);
document.getElementById("btn-delete").addEventListener("click", del);
```

---

### ¿Cómo usarlo?

1. Abre **dos terminales** en VS Code (ícono `+` en la terminal)
2. Terminal 1 → levanta el servidor: `npm run api`
3. Terminal 2 → abre el HTML con Live Server (extensión de VS Code) o arrástralo al navegador
4. Presiona los botones y observa las respuestas en el recuadro de log

---

## 12. Filtros y queries útiles

json-server soporta queries por URL sin configuración extra:

```bash
# Filtrar por campo exacto
GET /productos?precio=850000

# Ordenar ascendente o descendente
GET /productos?_sort=precio&_order=asc

# Paginar resultados
GET /productos?_page=1&_limit=2

# Buscar texto libre
GET /productos?q=guitarra
```

---

## Estructura final del proyecto

```
mi-proyecto-api/
├── node_modules/        ← generada por npm, no tocar
├── db.json              ← tus datos (la "base de datos")
├── index.html           ← estructura HTML
├── style.css            ← estilos
├── main.js              ← lógica y fetch
├── package.json         ← configuración del proyecto
└── package-lock.json    ← generado por npm, no tocar
```

---

## Resumen en 5 pasos

```bash
mkdir mi-proyecto-api   # 1. Crea carpeta
cd mi-proyecto-api      # 2. Entra a ella
npm init -y             # 3. Inicializa el proyecto
npm install json-server --save-dev  # 4. Instala json-server
```

Luego crea `db.json`, agrega el script en `package.json` y:

```bash
npm run api             # 5. Levanta la API
```

¡Listo! En menos de 5 minutos tienes una API REST funcionando. 🚀
