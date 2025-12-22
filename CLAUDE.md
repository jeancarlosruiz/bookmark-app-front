# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **bookmark manager app** challenge from Frontend Mentor, built as a full-stack application with Next.js 15, React 19, and Better Auth for authentication. The app allows users to manage bookmarks with features like search, filtering by tags, archiving, pinning, and theme switching.

## Tech Stack

- **Framework**: Next.js 15.5.4 (App Router with Turbopack)
- **React**: 19.1.0 (Server Components enabled)
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.x with PostCSS
- **UI Components**: Radix UI primitives + shadcn/ui (new-york style)
- **Authentication**: Better Auth 1.4.7 with Google OAuth, email/password, and anonymous mode
- **Database**: PostgreSQL (Neon) with Drizzle ORM 0.45.1
- **Icons**: Lucide React
- **Theming**: next-themes with light/dark mode support
- **Validation**: Zod 4.1.13
- **Toast Notifications**: Sonner
- **Email**: React Email with Resend

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Database commands (Drizzle Kit)
npm run db:generate    # Generate migrations from schema changes
npm run db:migrate     # Run migrations
npm run db:push        # Push schema directly to database (dev only)
npm run db:studio      # Open Drizzle Studio (database GUI)

# Email preview
npm run email:preview  # Preview email templates in development
```

## Architecture

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
```

**Middleware Protection** (`middleware.ts`):
- Public routes: `/signin`, `/signup`, `/forgot-password`, `/reset-password`
- All other routes require authentication via `authService.hasUserCookies()`
- Authenticated users redirected away from auth pages
- Excludes: `/api/auth/*`, static files, images

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

**Current Setup** (simplified, no auth provider needed):

```tsx
<ThemeProvider>          // next-themes for dark/light mode
  {children}
  <Toaster />            // Sonner toast notifications
</ThemeProvider>
```

Note: Better Auth does not require a React context provider. Authentication state is managed via cookies and the Data Access Layer.

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
- `http-client.ts`: HTTP client with error handling for external APIs

**Server Actions** (`actions/`):
- `auth.ts`: Auth-related server actions
- `bookmarks.ts`: Bookmark server actions that call `bookmarkService`

Pattern: Server actions call DAL services, which handle business logic and data fetching.

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
className="bg-[var(--neutral-800,#4c5c59)] dark:bg-[var(--neutral-800-dark,#001f1f)]"
```

**cn() Utility** (`lib/utils.ts`): Combines clsx + tailwind-merge for safe class composition:
```tsx
import { cn } from "@/lib/utils"
className={cn("base-classes", conditionalClass && "conditional", className)}
```

### Import Aliases

All imports use `@/` prefix:
```tsx
import { Button } from "@/components/atoms/button"
import { authService } from "@/lib/dal/auth"
import { cn } from "@/lib/utils"
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
import { authService } from "@/lib/dal/auth"

export default async function ProtectedPage() {
  const session = await authService.getCurrentUser()

  if (!session?.user) {
    redirect("/signin")
  }

  return <div>Hello {session.user.name}</div>
}
```

**Client Components:**
```tsx
"use client"
import { useSession } from "@/lib/auth/better-auth-client"

export function ProtectedComponent() {
  const { data: session, isPending } = useSession()

  if (isPending) return <div>Loading...</div>
  if (!session?.user) return null

  return <div>Hello {session.user.name}</div>
}
```

**Server Actions Pattern:**
```tsx
"use server"

export async function myAction() {
  const userData = await authService.getCurrentUser()

  if (!userData?.user?.id) {
    throw new Error("User not authenticated")
  }

  // Use userData.user.id for operations
}
```

### Component Props Pattern

Components extend native HTML element props:
```tsx
export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  containerClassName?: string;
}
```

Radix UI components support `asChild` for polymorphism:
```tsx
<Button asChild>
  <a href="/profile">Profile</a>
</Button>
```

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

- `middleware.ts`: Route protection - public routes and auth redirects
- `app/globals.css`: All CSS variable definitions
- `components.json`: shadcn/ui configuration (style: new-york, RSC enabled)
- `lib/auth/better-auth.ts`: Server auth configuration
- `lib/auth/better-auth-client.ts`: Client auth bindings
- `lib/dal/auth.ts`: Authentication data access layer
- `lib/db/schema.ts`: Drizzle database schema
- `drizzle.config.ts`: Drizzle Kit configuration
- `lib/zod/auth.ts`: Zod validation schemas

## Frontend Mentor Challenge

This is a premium Frontend Mentor challenge. **Do not share design files publicly.** The `.gitignore` is configured to prevent accidental upload of design assets.

User requirements from the challenge:
- Add new bookmarks with metadata
- View, search, and filter bookmarks
- Archive/pin/edit/delete bookmarks
- Copy URLs and visit bookmarked sites
- Sort by various criteria
- Light/dark theme
- Responsive design with hover/focus states
