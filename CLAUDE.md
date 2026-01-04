# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **bookmark manager app** challenge from Frontend Mentor, built as a full-stack application with Next.js 16, React 19, and Better Auth for authentication. The app allows users to manage bookmarks with features like search, filtering by tags, archiving, pinning, and theme switching.

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router with Turbopack)
- **React**: 19.2.3 (Server Components enabled)
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.1.14 with PostCSS
- **UI Components**: Radix UI primitives + shadcn/ui (new-york style)
- **Authentication**: Better Auth 1.4.7 with Google OAuth, email/password, and anonymous mode
- **Database**: PostgreSQL (Neon) with Drizzle ORM 0.45.1
- **Icons**: Lucide React 0.545.0
- **Theming**: next-themes 0.4.6 with light/dark mode support
- **Validation**: Zod 4.1.13
- **Toast Notifications**: Sonner 2.0.7
- **Email**: React Email 5.1.0 with Resend 6.6.0

## Development Commands

```bash
# Development server with Turbopack (port 3000)
 pnpm dev

# Production build with Turbopack
pnpm build

# Start production server
pnpm start

# Run ESLint
pnpm lint

# Database commands (Drizzle Kit) - Better Auth tables ONLY
pnpm db:generate    # Generate migrations from schema changes
pnpm db:migrate     # Run migrations
pnpm db:push        # Push schema directly to database (dev only, careful!)
pnpm db:studio      # Open Drizzle Studio (database GUI on port 4983)

# Email preview (development server on port 3001)
pnpm email:preview  # Preview email templates in browser
```

## Common Development Workflows

### Adding a New shadcn/ui Component

```bash
# shadcn/ui components are aliased to @/components/atoms
npx shadcn@latest add [component-name]

# Example: Adding a new dialog
npx shadcn@latest add dialog
```

Components will be added to `components/atoms/` directory (configured via `components.json`).

### Working with Email Templates

1. Create email template in `emails/` directory using React Email components
2. Preview in browser: `npm run email:preview`
3. Send via Resend in server actions or API routes

### Database Schema Changes (Better Auth tables only)

```bash
# 1. Modify lib/db/schema.ts
# 2. Generate migration
npm run db:generate

# 3. Review migration in lib/db/migrations/
# 4. Apply migration
npm run db:migrate

# OR for quick dev iteration (skips migrations)
npm run db:push
```

**Remember**: Only Better Auth tables live in this database. Bookmark data is in the Go backend.

## Architecture

### Next.js 16 Breaking Changes

**Important**: Next.js 16 introduced a breaking change where `middleware.ts` was renamed to `proxy.ts`:

- **Old convention (Next.js 15 and earlier)**: `middleware.ts` with `export function middleware()`
- **New convention (Next.js 16+)**: `proxy.ts` with `export function proxy()`
- **Why**: The name "proxy" better reflects the network boundary and routing focus
- **Runtime**: Default is Node.js (not Edge runtime like in middleware)
- **Migration**: Use codemod `npx @next/codemod@canary upgrade latest` or manually rename

This project correctly uses `proxy.ts` as per Next.js 16 conventions.

### Authentication System (Better Auth)

**Server-First Architecture** - Better Auth uses a unified server configuration with client bindings:

**Server** (`lib/auth/better-auth.ts`):

- Primary auth instance configured with `betterAuth()`
- Database adapter: Drizzle ORM with PostgreSQL
- Plugins: `anonymous()`, `jwt()` (EdDSA keys with JWKS rotation), `nextCookies()`
- Social providers: Google OAuth
- Email/password with verification required
- Session expiry: 7 days with 1-day update age
- Cookie cache: 5 minutes

**Client** (`lib/auth/better-auth-client.ts`):

- Client bindings created with `createAuthClient()`
- Must be marked with `"use client"`
- Provides `useSession()` hook and OAuth methods
- Methods: `authClient.signIn.social()`, `authClient.signUp.email()`, etc.

**Data Access Layer** (`lib/dal/auth.ts`):

- Centralized auth service for server actions
- Methods: `signIn()`, `signUp()`, `signOut()`, `getCurrentUser()`, `getUserToken()`, etc.
- Always uses `headers()` from next/headers for request context

**Environment Variables Required:**

```env
# Better Auth
BETTER_AUTH_SECRET='...'             # Required for session encryption
BETTER_AUTH_URL='http://localhost:3000'
NEXT_PUBLIC_BETTER_AUTH_URL='http://localhost:3000'

# Google OAuth
GOOGLE_CLIENT_ID='...'
GOOGLE_CLIENT_SECRET='...'

# Database (Neon PostgreSQL)
DATABASE_URL='postgresql://...'

# Email (Resend)
RESEND_API_KEY='...'
RESEND_FROM_EMAIL='onboarding@resend.dev'  # Use your domain in production

# Backend API
API_URL='http://localhost:8080/api'              # Server-side calls
NEXT_PUBLIC_API_URL='http://localhost:8080/api'  # Client-side calls
```

**Route Protection** (`proxy.ts`):

- **Next.js 16 Convention**: In Next.js 16, `middleware` was renamed to `proxy` (the project is correctly configured)
- Uses Better Auth's `getSessionCookie()` for lightweight session checking
- Public routes: `/signin`, `/signup`, `/forgot-password`, `/reset-password`
- All other routes require session cookie
- Authenticated users redirected away from auth pages to `/`
- Unauthenticated users redirected to `/signin`
- Excludes: `/api/*`, `_next/static`, `_next/image`, `favicon.ico`, static assets, `/examples`
- Runtime: Node.js (default in Next.js 16 proxy, NOT edge runtime)
- The function must be exported as `proxy`, not `middleware`

### Database Schema (Drizzle ORM)

**Schema Location**: `lib/db/schema.ts`

**Better Auth Tables** (automatically managed):

- `user`: Core user data with `id`, `name`, `email`, `emailVerified`, `isAnonymous`
- `session`: Session tokens with expiration, IP tracking, user agent
- `account`: OAuth and email/password credentials with refresh tokens
- `verification`: Email verification tokens
- `jwks`: JWT signing keys for rotation

**Drizzle Configuration** (`drizzle.config.ts`):

- Migrations output: `lib/db/migrations/`
- Dialect: PostgreSQL
- Indexes on `userId` for performance

### Provider Hierarchy (app/layout.tsx)

**Current Setup**:

```tsx
<NuqsAdapter>
  {" "}
  // nuqs for type-safe URL query params
  <ThemeProvider // next-themes for dark/light mode
    attribute="class"
    defaultTheme="system"
    enableSystem
    enableColorScheme
  >
    {children}
    <Toaster duration={2000} /> // Sonner toast notifications
  </ThemeProvider>
</NuqsAdapter>
```

**Font**: Manrope from Google Fonts (variable font, latin subset)

Note: Better Auth does not require a React context provider. Authentication state is managed via cookies and the Data Access Layer.

### URL State Management with nuqs

The app uses `nuqs` (v2.8.6) for type-safe URL query parameter management:

```tsx
import { useQueryState, parseAsString, parseAsArrayOf } from "nuqs";

// Single query param
const [search, setSearch] = useQueryState(
  "search",
  parseAsString.withDefault(""),
);

// Array query param (for tags)
const [tags, setTags] = useQueryState(
  "tags",
  parseAsArrayOf(parseAsString).withDefault([]),
);

// Update URL with new value
setSearch("my search query"); // URL: ?search=my+search+query
setTags(["tag1", "tag2"]); // URL: ?tags=tag1&tags=tag2
```

**Important**: All pages that use query params must be wrapped in `NuqsAdapter` (already done in root layout).

### Component Architecture (Atomic Design)

Components are organized by complexity:

- **atoms/**: Single-purpose primitives (Button, Input, Separator, Sonner, etc.)
  - Button uses CVA (Class Variance Authority) for variants
  - Most atoms are Radix UI wrappers from shadcn/ui
  - Sidebar is complex: includes Provider, Context, mobile drawer support, keyboard shortcuts (Cmd/Ctrl+B)

- **molecules/**: Composed components (SearchBar, etc.)
  - SearchBar: Custom component with icon, uses CSS variables for theming

- **organisms/**: Complex composite components (AppSidebar, Header, etc.)

- **pages/**: Page-level components
- **templates/**: Layout templates

### Data Access Layer Pattern

**Location**: `lib/dal/`

The app uses a centralized Data Access Layer for server-side operations:

- `auth.ts`: Authentication operations (signIn, signUp, getCurrentUser, etc.)
- `bookmark.ts`: Bookmark CRUD operations
- `tags.ts`: Tag operations (getUserTags)
- `http-client.ts`: HTTP client with error handling and automatic JWT token injection for backend API calls

**Server Actions** (`actions/`):

- `auth.ts`: Auth-related server actions
- `bookmarks.ts`: Bookmark server actions that call `bookmarkService`
- `tags.ts`: Tag server actions that call `tagService`

Pattern: Server actions call DAL services, which handle business logic and backend API communication via `httpClient`.

**HTTP Client Architecture** (`lib/dal/http-client.ts`):

- Singleton HTTP client for all backend API communication with Go backend
- Automatically injects JWT token from `authService.getUserToken()` in `Authorization: Bearer <token>` header
- Base URL selection based on execution context:
  - Server-side (SSR/Server Actions): uses `process.env.API_URL`
  - Client-side (browser): uses `process.env.NEXT_PUBLIC_API_URL`
- Validates URLs on initialization - throws clear error if malformed
- Timeout handling (30 seconds default, configurable per request)
- Custom `HTTPError` class with status, statusText, and URL for detailed error tracking
- Methods: `get<T>()`, `post<T>()`, `put<T>()`, `patch<T>()`, `delete<T>()`
- Optional `requireAuth` flag to skip token injection when needed
- Detailed logging in development mode (requests, responses, errors)
- Network error detection with helpful messages
- See `TROUBLESHOOTING.md` for common issues and debugging guide

### Styling System

**Tailwind CSS 4.x with Custom CSS Variables:**

The project uses extensive CSS variables defined in `app/globals.css`:

- **Spacing**: `--spacing-0` through `--spacing-1250` (increments of 50, e.g., spacing-100 = 8px)
- **Colors**: Dual palettes for light/dark modes
  - Light: `--neutral-900` (darkest) to `--neutral-0` (white)
  - Dark: `--neutral-900-dark` to `--neutral-0-dark`
  - Accents: `--teal-*`, `--red-*`

**Usage Pattern:**

```tsx
className =
  "bg-[var(--neutral-800,#4c5c59)] dark:bg-[var(--neutral-800-dark,#001f1f)]";
```

**cn() Utility** (`lib/utils.ts`): Combines clsx + tailwind-merge for safe class composition:

```tsx
import { cn } from "@/lib/utils"
className={cn("base-classes", conditionalClass && "conditional", className)}
```

### Import Aliases

All imports use `@/` prefix:

```tsx
import { Button } from "@/components/atoms/button";
import { authService } from "@/lib/dal/auth";
import { cn } from "@/lib/utils";
```

### Validation with Zod

**Schema Location**: `lib/zod/`

Zod schemas are centralized for:

- Authentication forms (`auth.ts`)
- Bookmark operations
- Type inference and runtime validation

Pattern: Define schemas in `lib/zod/`, import in server actions and components.

## Key Patterns

### Server vs Client Components

**Server Components (default):**

- Layout, loading, pages
- Prefer for data fetching and authentication checks
- Can call `authService.getCurrentUser()` directly

**Client Components (must have `"use client"`):**

- Interactive forms (sign in/sign up, bookmark forms)
- Components using hooks (useState, useEffect, useTheme, useSession)
- All Radix UI wrappers (interactive primitives)
- Sidebar (state management, keyboard shortcuts, responsive behavior)

### Authentication in Components

**Server Components & Server Actions:**

```tsx
import { authService } from "@/lib/dal/auth";

export default async function ProtectedPage() {
  const session = await authService.getCurrentUser();

  if (!session?.user) {
    redirect("/signin");
  }

  return <div>Hello {session.user.name}</div>;
}
```

**Client Components:**

```tsx
"use client";
import { useSession } from "@/lib/auth/better-auth-client";

export function ProtectedComponent() {
  const { data: session, isPending } = useSession();

  if (isPending) return <div>Loading...</div>;
  if (!session?.user) return null;

  return <div>Hello {session.user.name}</div>;
}
```

**Server Actions Pattern:**

```tsx
"use server";

export async function myAction() {
  const userData = await authService.getCurrentUser();

  if (!userData?.user?.id) {
    throw new Error("User not authenticated");
  }

  // Use userData.user.id for operations
}
```

### Component Props Pattern

Components extend native HTML element props:

```tsx
export interface SearchBarProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  containerClassName?: string;
}
```

Radix UI components support `asChild` for polymorphism:

```tsx
<Button asChild>
  <a href="/profile">Profile</a>
</Button>
```

### Error Handling Pattern

All server actions follow a consistent error handling pattern:

```tsx
"use server";

export async function myServerAction() {
  try {
    // 1. Validate authentication first
    const userData = await authService.getCurrentUser();
    if (!userData?.user?.id) {
      return { success: false, error: "User not authenticated" };
    }

    // 2. Perform operation
    const result = await someService.doSomething(userData.user.id);

    return { success: true, data: result };
  } catch (error) {
    // 3. Handle HTTPError specifically (from backend calls)
    if (error instanceof HTTPError) {
      console.error("HTTP Error:", {
        status: error.status,
        statusText: error.statusText,
        url: error.url,
        message: error.message,
      });
      return { success: false, error: error.message, status: error.status };
    }

    // 4. Handle unexpected errors
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
```

**Never call `httpClient` or DAL services directly from client components.** Always use server actions as the interface.

### Data Flow Architecture

```
Client Component (Browser)
    ↓ calls
Server Action (Next.js Server)
    ↓ calls
DAL Service (lib/dal/)
    ↓ calls
HTTP Client (lib/dal/http-client.ts)
    ↓ HTTP request
Go Backend API (Railway)
    ↓ queries
PostgreSQL + Redis
```

**Key Rules**:

1. Client components can ONLY call server actions
2. Server actions can call DAL services
3. DAL services use HTTP client to communicate with Go backend
4. Never skip layers (e.g., client → DAL directly is forbidden)

## Project-Specific Notes

### Bookmark Manager Features

The app is being built to support:

- Add/edit bookmarks with title, description, URL, tags
- Search by title, filter by tags
- Archive/unarchive, pin/unpin bookmarks
- Sort by recently added, recently visited, most visited
- View count tracking, last visited tracking
- Automatic favicon extraction from URLs
- Dark/light theme toggle

### Current State

- Authentication UI and flows are implemented (Better Auth with Google OAuth, email/password, anonymous)
- Database schema defined with Drizzle ORM for Better Auth tables
- Component library foundation is complete (Radix UI + shadcn/ui)
- Sidebar with mobile drawer support is functional
- SearchBar molecule component exists in `components/molecules/`
- Email templates set up with React Email and Resend
- Bookmark management features are in development
- Backend communication layer via HTTP client in DAL

### Important Files

- `proxy.ts`: Route protection proxy (Next.js 16 convention, replaces deprecated `middleware.ts`)
- `app/globals.css`: All CSS variable definitions for light/dark themes
- `components.json`: shadcn/ui configuration (style: new-york, RSC enabled, ui alias to atoms/)
- `lib/auth/better-auth.ts`: Server auth configuration
- `lib/auth/better-auth-client.ts`: Client auth bindings (client-side only)
- `lib/dal/auth.ts`: Authentication data access layer
- `lib/dal/http-client.ts`: HTTP client with automatic JWT token injection
- `lib/dal/bookmark.ts`: Bookmark service that communicates with Go backend
- `lib/dal/tags.ts`: Tag service
- `lib/db/schema.ts`: Drizzle database schema (Better Auth tables only)
- `drizzle.config.ts`: Drizzle Kit configuration
- `lib/zod/auth.ts`: Authentication validation schemas
- `lib/zod/bookmark.ts`: Bookmark validation schemas
- `actions/bookmarks.ts`: Server actions for bookmark operations
- `actions/auth.ts`: Server actions for authentication
- `TROUBLESHOOTING.md`: Detailed guide for debugging backend fetch errors

## Critical Known Issues

### 1. Server Actions Need Implementation (URGENT)

`createBookmarkAction` and `updateBookmarkAction` in `actions/bookmarks.ts` are currently empty stubs that always return success without performing any operation.

### 2. Backend Architecture (IMPORTANT)

- This Next.js app is a **frontend-only application** for UI and authentication
- All bookmark data is stored in a separate **Go backend** (deployed on Railway)
- The Go backend uses:
  - PostgreSQL (separate from Neon) for bookmark storage
  - Redis for caching
  - JWT token validation (tokens from Better Auth)
- **CRITICAL**: Do NOT create bookmark tables in the Drizzle schema
  - `lib/db/schema.ts` only contains Better Auth tables (user, session, account, verification, jwks)
  - Bookmark operations must ALWAYS go through `httpClient` to the Go API
  - Never query bookmark data from the Neon database directly

## Frontend Mentor Challenge

This is a premium Frontend Mentor challenge. **Do not share design files publicly.** The `.gitignore` is configured to prevent accidental upload of design assets.

User requirements from the challenge:

- Add new bookmarks with metadata (title, description, URL, tags, favicon)
- View all bookmarks with details (favicon, view count, last visited, date added)
- Search bookmarks by title
- Filter bookmarks by tags (single or multiple)
- Archive/unarchive bookmarks
- Pin/unpin bookmarks
- Edit existing bookmarks
- Delete bookmarks
- Copy URLs to clipboard
- Visit bookmarked websites
- Sort by: recently added, recently visited, most visited
- Light/dark theme toggle
- Responsive design with hover/focus states

## Best Practices for This Project

### 1. Component Creation

**Use "use client" sparingly** - only when absolutely necessary:

- Forms with interactive state
- Components using browser APIs (localStorage, window, etc.)
- Components using client-side hooks (useState, useEffect, etc.)
- Radix UI components (they require interactivity)

**Prefer Server Components** for:

- Data fetching
- Authentication checks
- Static content
- SEO-critical pages

### 2. Authentication Patterns

**In Server Components/Actions**:

```tsx
const userData = await authService.getCurrentUser();
if (!userData?.user?.id) {
  // Handle unauthenticated state
}
```

**In Client Components**:

```tsx
const { data: session, isPending } = useSession();
if (isPending) return <LoadingSpinner />;
if (!session?.user) return null;
```

### 3. Styling Conventions

- Use `cn()` utility for conditional classes
- Prefer CSS variables over hardcoded colors: `bg-[var(--neutral-800)]`
- Include dark mode variants: `dark:bg-[var(--neutral-800-dark)]`
- Follow spacing scale: `--spacing-{0,50,100,150,...,1250}`
- Use Tailwind utilities, not inline styles

### 4. Type Safety

- Always define Zod schemas in `lib/zod/` for validation
- Infer TypeScript types from Zod schemas: `type MyType = z.infer<typeof MySchema>`
- Use TypeScript strict mode (already configured)
- Export types from DAL services for reuse

### 5. Environment Variables

- Server-only vars: prefix with nothing (e.g., `API_URL`, `DATABASE_URL`)
- Client-accessible vars: prefix with `NEXT_PUBLIC_` (e.g., `NEXT_PUBLIC_API_URL`)
- Never expose secrets to the client
- Always use HTTPS URLs in production (validated by HTTP client)

### 6. File Naming Conventions

- Components: PascalCase (e.g., `BookmarkCard.tsx`)
- Utilities/services: camelCase (e.g., `auth.ts`, `http-client.ts`)
- Server actions: camelCase with `Action` suffix (e.g., `getBookmarksAction`)
- Types/interfaces: PascalCase with descriptive names
- Directories: kebab-case or camelCase (existing pattern varies)

### 7. Import Organization

Organize imports in this order:

1. React and Next.js
2. Third-party libraries
3. Internal aliases (@/components, @/lib, etc.)
4. Relative imports
5. Types (if separate from values)

Example:

```tsx
import { useState } from "react";
import { redirect } from "next/navigation";
import { Button } from "@/components/atoms/button";
import { authService } from "@/lib/dal/auth";
import { MyLocalComponent } from "./my-component";
import type { User } from "@/lib/types";
```
