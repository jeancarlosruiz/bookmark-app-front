# 📘 Calendario de Desarrollo — Frontend (Next.js 15 + Shadcn)

**Duración:** 4 semanas — 2 horas diarias  
**Stack:** Next.js 15, Shadcn/UI, Tailwind, Framer Motion, TypeScript  
**Repositorio:** `bookmark-manager-frontend`  
**Deploy:** Vercel

---

## 🧭 Semana 1 — Setup y estructura UI

### Día 1
[x] Crear repositorio en GitHub.
[x] Iniciar proyecto con `npx create-next-app@latest`.
[x] Instalar Shadcn/UI y configurar Tailwind.
[x] Subir base a Vercel (verificar CI/CD).

### Día 2
[x] Crear estructura de carpetas (`/components/atoms`, `/molecules`, `/organisms`).
[x] Definir layout principal (sidebar + header + main).
[x] Crear sistema de diseño base (colores, tipografía, spacing).

### Día 3
[] Crear componentes atómicos: `Button`, `Input`, `Badge`, `Card`, `Tag`, `Modal`. (Corregir los colores, creo que estan mal)
[] Implementar modo oscuro y claro.

### Día 4
[] Crear Sidebar y Navbar funcionales.
[] Renderizar bookmarks con data dummy (`data.json`).
[] Implementar búsqueda en el frontend (client-side).

### Día 5
[] Crear `BookmarkCard` y vista de listado.
[] Añadir ordenamiento dummy (por “Recently Added”, etc.).
[] Pulir estilos base con Shadcn.

---

## ⚙️ Semana 2 — Integración con backend y CRUD

### Día 6
- Configurar `.env` con URL del backend.
- Conectar la API (fetch de bookmarks).
- Mostrar datos reales en la UI.

### Día 7
- Crear modal de “Nuevo Bookmark”.
- Validar inputs y mostrar mensajes de error.

### Día 8
- Crear vista de detalles de bookmark.
- Añadir acciones de Editar / Eliminar.

### Día 9
- Implementar búsqueda y filtrado por tags.
- Mostrar contador de vistas y última visita.

### Día 10
- Agregar `Pin/Unpin` y `Archive`.
- Separar vistas: All / Pinned / Archived.

---

## 🔐 Semana 3 — Autenticación y mejoras UX/UI

### Día 11
- Crear pantallas de Login y Register.
- Implementar NextAuth o JWT simple.

### Día 12
- Manejar sesión (cookies).
- Mostrar bookmarks del usuario autenticado.

### Día 13
- Mejorar diseño responsive.
- Añadir skeletons y estados de carga.

### Día 14
- Implementar carga de favicon y metadatos en creación de bookmarks.
- Validar URLs automáticamente.

### Día 15
- Agregar “Sort by” real (recently added / most visited).
- Integrar animaciones con Framer Motion.

---

## 💎 Semana 4 — Extras, PWA y deploy

### Día 16
- Implementar “Copy to clipboard”.
- Añadir atajos de teclado (ej. `Ctrl + K`, `N`).

### Día 17
- Crear perfil de usuario y configuración.
- Subida de avatar (Cloudinary o UploadThing).

### Día 18
- Configurar PWA (manifest + offline).
- Soporte para instalación móvil.

### Día 19
- Testear UI completa.
- Pulir transiciones y feedback visual.

### Día 20
- Deploy final en Vercel.
- Escribir README con screenshots, tech stack y arquitectura.
