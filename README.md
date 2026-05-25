# 🗄️ JSON Server + Fetch API — Guía desde cero

Una API falsa completa con cero backend real. Perfecta para prototipos y practicar fetch.

---

## ¿Qué es json-server?

`json-server` convierte un archivo `.json` en una **API REST funcional** al instante.  
Sin Node, sin Express, sin configuración compleja. Solo un archivo y un comando.

---

## 1. Instalación

### Opción A — Global (recomendado para practicar)
```bash
npm install -g json-server
```

### Opción B — Local al proyecto
```bash
npm install json-server --save-dev
```

---

## 2. Crear tu base de datos falsa

Crea un archivo llamado `db.json` en la raíz de tu proyecto:

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

> Cada clave del objeto (`"productos"`, `"usuarios"`) se convierte en un **endpoint** de tu API.

---

## 3. Levantar el servidor

```bash
# Si lo instalaste global:
json-server --watch db.json

# Si lo instalaste local:
npx json-server --watch db.json
```

Verás algo así en la terminal:

```
Resources
  http://localhost:3000/productos
  http://localhost:3000/usuarios

Home
  http://localhost:3000
```

✅ Tu API está viva en `http://localhost:3000`

---

## 4. Endpoints disponibles (automáticos)

| Método   | URL                        | Acción                        |
|----------|----------------------------|-------------------------------|
| `GET`    | `/productos`               | Obtener todos                 |
| `GET`    | `/productos/1`             | Obtener uno por ID            |
| `POST`   | `/productos`               | Crear uno nuevo               |
| `PUT`    | `/productos/1`             | Reemplazar uno completo       |
| `PATCH`  | `/productos/1`             | Actualizar campos específicos |
| `DELETE` | `/productos/1`             | Eliminar uno                  |

---

## 5. Haciendo fetch a tu API

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
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    nombre: "Pedal de efectos",
    precio: 320000
  })
})
  .then(res => res.json())
  .then(data => console.log("Creado:", data));
```
> json-server asigna el `id` automáticamente 🎉

### PATCH — Actualizar solo el precio
```javascript
fetch("http://localhost:3000/productos/1", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json"
  },
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

## 6. Con async/await (más limpio)

```javascript
async function obtenerProductos() {
  try {
    const res = await fetch("http://localhost:3000/productos");
    
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    
    const productos = await res.json();
    console.log(productos);
  } catch (error) {
    console.error("Algo salió mal:", error);
  }
}

obtenerProductos();
```

---

## 7. Filtros y queries útiles

json-server soporta queries por URL sin configuración extra:

```bash
# Filtrar por campo
GET /productos?precio=850000

# Ordenar
GET /productos?_sort=precio&_order=asc

# Paginar
GET /productos?_page=1&_limit=2

# Buscar texto completo
GET /productos?q=guitarra
```

---

## 8. Cambiar el puerto (opcional)

```bash
json-server --watch db.json --port 4000
```

---

## 9. Script en package.json (opcional pero cómodo)

```json
{
  "scripts": {
    "api": "json-server --watch db.json --port 3000"
  }
}
```

Luego solo corres:
```bash
npm run api
```

---

## Resumen rápido

```
1. npm install -g json-server
2. Crea db.json con tus datos
3. json-server --watch db.json
4. fetch("http://localhost:3000/tu-recurso")
```

¡Eso es todo! En menos de 5 minutos tienes una API REST funcionando. 🚀
