# Data Access Layer (DAL)

Este directorio contiene la capa de acceso a datos del proyecto, proporcionando una arquitectura limpia y centralizada para todas las operaciones de datos.

## Estructura

```
lib/dal/
├── auth.ts          # Servicio de autenticación (Better Auth)
├── bookmark.ts      # Servicio de bookmarks
├── http-client.ts   # Cliente HTTP centralizado con auth automática
└── README.md        # Esta documentación
```

## Cliente HTTP (`http-client.ts`)

### Características

- **Autenticación automática**: Inyecta automáticamente el JWT token de Better Auth en todas las peticiones
- **Manejo centralizado de errores**: Clase `HTTPError` con información detallada de errores HTTP
- **Timeout configurable**: 30 segundos por defecto, personalizable por petición
- **Type-safe**: Totalmente tipado con TypeScript
- **Compatible con Next.js 15**: Funciona en Server Components y Server Actions

### Uso Básico

```typescript
import { httpClient } from "@/lib/dal/http-client";

// GET request
const data = await httpClient.get<MyType>("/api/endpoint");

// POST request
const result = await httpClient.post<MyType>("/api/endpoint", {
  key: "value"
});

// PUT request
const updated = await httpClient.put<MyType>("/api/endpoint/123", {
  key: "newValue"
});

// PATCH request
const patched = await httpClient.patch<MyType>("/api/endpoint/123", {
  key: "value"
});

// DELETE request
await httpClient.delete("/api/endpoint/123");
```

### Opciones Avanzadas

```typescript
// Request sin autenticación
const publicData = await httpClient.get("/public/endpoint", {
  requireAuth: false
});

// Custom headers
const data = await httpClient.get("/endpoint", {
  headers: {
    "X-Custom-Header": "value"
  }
});

// Timeout personalizado
const data = await httpClient.get("/slow-endpoint", {
  timeout: 60000 // 60 segundos
});
```

### Manejo de Errores

```typescript
import { httpClient, HTTPError } from "@/lib/dal/http-client";

try {
  const data = await httpClient.get("/api/endpoint");
} catch (error) {
  if (error instanceof HTTPError) {
    console.error(`HTTP ${error.status}: ${error.message}`);
    console.error(`URL: ${error.url}`);
    console.error(`Status Text: ${error.statusText}`);
  } else {
    console.error("Unexpected error:", error);
  }
}
```

## Servicios DAL

### Bookmark Service (`bookmark.ts`)

El servicio de bookmarks proporciona métodos para todas las operaciones relacionadas con bookmarks.

#### Ejemplo de Uso

```typescript
import { bookmarkService } from "@/lib/dal/bookmark";

// En un Server Action
export async function getBookmarksAction() {
  const userData = await authService.getCurrentUser();

  if (!userData?.user?.id) {
    throw new Error("User not authenticated");
  }

  const bookmarks = await bookmarkService.getUserBookmarks(userData.user.id);
  return bookmarks;
}

// Crear un bookmark
const newBookmark = await bookmarkService.createBookmark({
  title: "Mi Bookmark",
  url: "https://example.com",
  description: "Descripción opcional",
  tags: ["tag1", "tag2"]
});

// Actualizar un bookmark
const updated = await bookmarkService.updateBookmark("bookmark-id", {
  title: "Nuevo título"
});

// Pin/Unpin
await bookmarkService.togglePin("bookmark-id", true);

// Archive/Unarchive
await bookmarkService.toggleArchive("bookmark-id", true);

// Buscar
const results = await bookmarkService.searchBookmarks(userId, "query");

// Filtrar por tags
const filtered = await bookmarkService.filterByTags(userId, ["tag1", "tag2"]);
```

### Auth Service (`auth.ts`)

El servicio de autenticación maneja todas las operaciones relacionadas con Better Auth.

#### Ejemplo de Uso

```typescript
import { authService } from "@/lib/dal/auth";

// Obtener usuario actual
const session = await authService.getCurrentUser();

// Obtener token JWT
const token = await authService.getUserToken();

// Sign in
await authService.signIn({
  email: "user@example.com",
  password: "password"
});

// Sign up
await authService.signUp({
  name: "User Name",
  email: "user@example.com",
  password: "password"
});

// Sign out
await authService.signOut();
```

## Mejores Prácticas

### 1. Usar Servicios DAL en lugar de fetch directo

❌ **Incorrecto:**
```typescript
const token = await authService.getUserToken();
const response = await fetch(`${process.env.API_URL}/bookmark`, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  }
});
const data = await response.json();
```

✅ **Correcto:**
```typescript
const data = await bookmarkService.getUserBookmarks(userId);
```

### 2. Manejar errores apropiadamente

✅ **Correcto:**
```typescript
try {
  const bookmarks = await bookmarkService.getUserBookmarks(userId);
  return { success: true, data: bookmarks };
} catch (error) {
  if (error instanceof HTTPError) {
    return {
      success: false,
      error: error.message,
      status: error.status
    };
  }
  return {
    success: false,
    error: "Unknown error"
  };
}
```

### 3. Validar autenticación antes de operaciones

✅ **Correcto:**
```typescript
const userData = await authService.getCurrentUser();

if (!userData?.user?.id) {
  throw new Error("User not authenticated");
}

// Proceder con la operación
const bookmarks = await bookmarkService.getUserBookmarks(userData.user.id);
```

### 4. Usar tipos apropiados

✅ **Correcto:**
```typescript
import {
  Bookmark,
  CreateBookmarkInput,
  UpdateBookmarkInput
} from "@/lib/dal/bookmark";

const newBookmark: CreateBookmarkInput = {
  title: "Example",
  url: "https://example.com",
  tags: ["tag1"]
};

const result = await bookmarkService.createBookmark(newBookmark);
```

## Configuración

### Variables de Entorno Requeridas

```env
# API Backend URL
API_URL=http://localhost:8080

# Better Auth
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
```

## Arquitectura

```
┌─────────────────────────────────────┐
│   Server Actions / Components       │
│   (actions/bookmarks.ts)            │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│   DAL Services                      │
│   (lib/dal/bookmark.ts)             │
│   (lib/dal/auth.ts)                 │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│   HTTP Client                       │
│   (lib/dal/http-client.ts)          │
│   • Auto-authentication             │
│   • Error handling                  │
│   • Timeout management              │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│   Backend API (Go)                  │
│   http://localhost:8080             │
└─────────────────────────────────────┘
```

## Próximos Pasos

- [ ] Agregar soporte para retry automático en caso de fallo temporal
- [ ] Implementar cache de peticiones con Next.js cache tags
- [ ] Agregar interceptors para logging centralizado
- [ ] Crear servicios DAL para tags y user profile
- [ ] Agregar validación de schemas con Zod antes de enviar peticiones
