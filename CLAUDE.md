# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **bookmark manager app** challenge from Frontend Mentor, built as a full-stack application with Next.js 15, React 19, and Stack Auth for authentication. The app allows users to manage bookmarks with features like search, filtering by tags, archiving, pinning, and theme switching.

## Tech Stack

- **Framework**: Next.js 15.5.4 (App Router with Turbopack)
- **React**: 19.1.0 (Server Components enabled)
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.x with PostCSS
- **UI Components**: Radix UI primitives + shadcn/ui (new-york style)
- **Authentication**: Stack Auth (@stackframe/stack) 2.8.41
- **Icons**: Lucide React
- **Theming**: next-themes with light/dark mode support
- **Validation**: Zod 4.1.13
- **Toast Notifications**: Sonner

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
```

## Architecture

### Authentication System (Stack Auth)

**Dual Configuration Pattern** - The app uses separate client/server Stack Auth instances:

- **Client** (`stack/client.tsx`): For client components, provides `useStackApp()` hook
  - Methods: `signInWithCredential()`, `signUpWithCredential()`, `signInWithOAuth()`
  - Token storage: NextJS cookies

- **Server** (`stack/server.tsx`): For server components, marked with `"use server-only"`
  - Usage: `await stackServerApp.getUser()` or `await stackServerApp.getUser({ or: "redirect" })`
  - Provides automatic redirect when user is not authenticated

**Environment Variables Required:**
```env
NEXT_PUBLIC_STACK_PROJECT_ID='...'
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY='...'
STACK_SECRET_SERVER_KEY='...'
```

**Security Note**: Always implement defense-in-depth by verifying authentication in both middleware AND page components. Do not rely solely on middleware for route protection (CVE-2025-29927 mitigation).

### Provider Hierarchy (app/layout.tsx)

The app has a specific provider nesting order that must be maintained:

```tsx
<ThemeProvider>          // next-themes for dark mode
  <StackProvider>        // Stack Auth context
    <StackTheme>         // Stack Auth UI theming
      {children}
      <Toaster />        // Sonner toast notifications
    </StackTheme>
  </StackProvider>
</ThemeProvider>
```

### Component Architecture (Atomic Design)

Components are organized by complexity:

- **atoms/**: Single-purpose primitives (Button, Input, Separator, etc.)
  - Button uses CVA (Class Variance Authority) for variants
  - Sidebar is complex: includes Provider, Context, mobile drawer support, keyboard shortcuts (Cmd/Ctrl+B)

- **molecules/**: Composed components (SearchBar, etc.)
  - SearchBar: Custom component with icon, uses CSS variables for theming

- **organisms/**: Complex composite components (AppSidebar, Header)
  - Header: Server component that checks auth state via `stackServerApp.getUser()`

- **pages/**: Page-level components (currently empty)
- **templates/**: Layout templates (currently empty)

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
import { stackServerApp } from "@/stack/server"
import { cn } from "@/lib/utils"
```

## Key Patterns

### Server vs Client Components

**Server Components (default):**
- Layout, loading, pages
- Header component (checks auth with `stackServerApp.getUser()`)
- Prefer for data fetching and when auth state is needed

**Client Components (must have `"use client"`):**
- Sign in/sign up pages (form handling, OAuth)
- Sidebar (state management, keyboard shortcuts, responsive behavior)
- All Radix UI wrappers (interactive primitives)
- Components using hooks (useState, useEffect, useTheme, etc.)

### Authentication in Components

**Server Components:**
```tsx
import { stackServerApp } from "@/stack/server"

export default async function ProtectedPage() {
  const user = await stackServerApp.getUser({ or: "redirect" })
  // Automatically redirects to /signin if not authenticated
  return <div>Hello {user.displayName}</div>
}
```

**Client Components:**
```tsx
"use client"
import { useUser } from "@stackframe/stack"

export function ProtectedComponent() {
  const user = useUser({ or: "redirect" })
  // Automatically redirects to /signin if not authenticated
  return <div>Hello {user.displayName}</div>
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

- Authentication UI and flows are implemented
- Component library foundation is complete
- Sidebar with mobile drawer support is functional
- SearchBar molecule component exists in `components/molecules/`
- Bookmark management features are in development

### Important Files

- `middleware.ts` (if exists): Route protection for auth-only and protected routes
- `app/globals.css`: All CSS variable definitions
- `components.json`: shadcn/ui configuration (style: new-york, RSC enabled)
- `stack/client.tsx` & `stack/server.tsx`: Authentication configuration

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
