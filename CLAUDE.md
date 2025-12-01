# Frontend Architecture Overview

## Project Stack
- **Framework**: Next.js 15.5.4 with Turbopack
- **React**: 19.1.0 (React Server Components enabled)
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.x with PostCSS
- **UI Component Library**: Radix UI primitives + custom components
- **Icons**: Lucide React
- **Authentication**: Stackframe (@stackframe/stack) 2.8.41
- **Font**: Manrope (Google Fonts)

## Directory Structure

```
frontend/
├── app/                          # Next.js app directory (App Router)
│   ├── layout.tsx               # Root layout with Stack provider setup
│   ├── loading.tsx              # Suspense loading fallback
│   ├── page.tsx                 # Home page (dashboard)
│   ├── globals.css              # Global Tailwind styles
│   ├── signin/
│   │   └── page.tsx             # Sign in page
│   └── signup/
│       └── page.tsx             # Sign up page
│
├── components/                   # React components organized by atomic design
│   ├── atoms/                   # Basic building block components
│   │   ├── button.tsx           # Button with CVA variants
│   │   ├── input.tsx            # Form input
│   │   ├── separator.tsx        # Radix UI separator
│   │   ├── sheet.tsx            # Dialog-based sheet component
│   │   ├── sidebar.tsx          # Complex sidebar with provider
│   │   ├── skeleton.tsx         # Loading skeleton
│   │   └── tooltip.tsx          # Tooltip component
│   ├── molecules/               # Combined atoms (currently empty)
│   ├── organisms/               # Complex components
│   │   ├── app-sidebar.tsx      # Main app sidebar
│   │   └── header.tsx           # App header with auth state
│   ├── pages/                   # Page-level components (currently empty)
│   └── templates/               # Layout templates (currently empty)
│
├── stack/                        # Stackframe authentication configuration
│   ├── client.tsx               # Client-side Stack app configuration
│   └── server.tsx               # Server-side Stack app configuration (server-only)
│
├── hooks/                        # Custom React hooks
│   └── use-mobile.ts            # Mobile breakpoint detection hook (768px)
│
├── lib/                          # Utility functions
│   └── utils.ts                 # cn() utility for Tailwind + clsx merging
│
├── public/                       # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts               # Next.js configuration (minimal)
├── eslint.config.mjs            # ESLint configuration
├── postcss.config.mjs           # PostCSS configuration for Tailwind
├── components.json              # shadcn/ui configuration
├── .env                         # Environment variables
└── README.md                    # Project documentation

```

## Key Configuration Files

### tsconfig.json
- **Target**: ES2017
- **Module**: esnext
- **JSX**: preserve
- **Path Alias**: `@/*` points to root directory
- **Compiler Options**: strict mode enabled, skipLibCheck, esModuleInterop

### next.config.ts
- Minimal configuration with Turbopack enabled via `next dev --turbopack`
- No custom redirects, rewrites, or middleware

### postcss.config.mjs
- Uses `@tailwindcss/postcss` plugin for Tailwind CSS 4

### components.json (shadcn/ui config)
- Style: new-york
- RSC: enabled
- TSX: enabled
- Base Color: neutral
- CSS Variables: enabled
- Icon Library: lucide
- Path aliases configured for components, utils, ui, lib, hooks

## Authentication Implementation

### Stackframe Integration (@stackframe/stack)

#### Architecture
- **Provider Pattern**: Authentication state managed via `StackProvider` + `StackTheme` wrapper in root layout
- **Dual Setup**: Client and server configurations for different use cases

#### Client Configuration (`stack/client.tsx`)
```typescript
new StackClientApp({
  tokenStore: "nextjs-cookie"  // Stores auth tokens in cookies
})
```
- Used in client components via `useStackApp()` hook
- Provides: `signInWithCredential()`, `signUpWithCredential()`, `signInWithOAuth()`
- Token storage: NextJS cookies

#### Server Configuration (`stack/server.tsx`)
```typescript
new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    signIn: "/signin",
    signUp: "/signup",
    signOut: "/"
  }
})
```
- Used in server components via `await stackServerApp.getUser()`
- Provides user data and sign-out redirects
- Marked with `"use server-only"` directive

#### Environment Variables
```
NEXT_PUBLIC_STACK_PROJECT_ID='...'              # Public client ID
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY='...'  # Public API key
STACK_SECRET_SERVER_KEY='...'                   # Server-only secret key
```

### Authentication Flows

#### Sign Up (Client Component)
- Route: `/signup`
- Methods:
  - `app.signUpWithCredential({ email, password })`
  - `app.signInWithOAuth("github", { returnTo: "/" })`

#### Sign In (Client Component)
- Route: `/signin`
- Method: `app.signInWithCredential({ email, password })`

#### Header Component (Server Component)
- Uses `stackServerApp.getUser()` to fetch current user
- Displays conditional UI based on auth state:
  - Logged in: "Logeado" + Sign out link
  - Logged out: Log In + Sign Up links

## Component Architecture

### Atomic Design Pattern
Components are organized in three layers:

#### Atoms (`components/atoms/`)
Minimal, single-purpose components wrapping Radix UI primitives:
- **Button**: CVA-based button with variants (default, secondary, destructive, outline, ghost, link)
  - Sizes: sm, md, lg, icon, icon-sm, icon-lg
  - Uses Radix UI `Slot` for polymorphism
- **Input**: Form input with focus states, accessibility
- **Separator**: Horizontal/vertical divider
- **Sheet**: Modal/drawer using Radix Dialog
- **Tooltip**: Tooltip with positioning
- **Skeleton**: Loading placeholder
- **Sidebar**: Complex component system with full mobile support

#### Sidebar Component Details
The sidebar is a feature-complete component with:
- **Provider**: `SidebarProvider` manages state (open/closed, mobile/desktop)
- **Context**: `useSidebar()` hook for state management
- **Layout Components**: `Sidebar`, `SidebarContent`, `SidebarHeader`, `SidebarFooter`
- **Menu System**: Nested menu with labels, actions, badges
- **Mobile Support**: Converts to drawer on screens < 768px
- **Variants**: sidebar, floating, inset
- **Keyboard Shortcut**: Cmd/Ctrl+B to toggle
- **State Persistence**: Sidebar state stored in cookies

#### Organisms (`components/organisms/`)
Composite components made from atoms:
- **AppSidebar**: Main application sidebar using sidebar primitives
- **Header**: Navigation header with auth state and links

#### Molecules, Pages, Templates
Directories exist but are currently empty. These are for future expansion.

## Styling System

### Tailwind CSS 4.x Integration
- **Engine**: PostCSS plugin
- **CSS Variables**: Enabled in components.json
- **Prefix**: None (global usage)
- **Base Color**: Neutral

### CSS Variables (`app/globals.css`)

#### Color Palette
**Neutral (Light Mode)**:
- `--neutral-900`: #051513 (darkest)
- `--neutral-800`: #4c5659
- `--neutral-500`: #899492
- `--neutral-400`: #cocfcf
- `--neutral-300`: #dde9e7
- `--neutral-200`: #e8f0ef
- `--neutral-0`: #ffffff (lightest)

**Neutral (Dark Mode)**:
- `--neutral-900-dark`: #001414
- `--neutral-800-dark`: #001f1f
- `--neutral-600-dark`: #002e2d
- `--neutral-500-dark`: #004241
- And more...

**Accent Colors**:
- **Teal**: --teal-800 (#013c3b), --teal-700 (#014745)
- **Red**: --red-800 (#cb0a04), --red-600 (#fd4740)

**Spacing Variables**:
- `--spacing-0` through `--spacing-1250` (0px to 50px)
- Naming: 50px increments (spacing-50, spacing-100, etc.)

### Utility Classes
- **Component Utilities**: For typography, layout, shadows
- **CVA (Class Variance Authority)**: Used in Button, Sidebar components for variant management
- **Merge Utilities**: `cn()` function in `lib/utils.ts` combines clsx + tailwind-merge

## Custom Hooks

### useIsMobile
- **Location**: `hooks/use-mobile.ts`
- **Purpose**: Detect mobile viewport (< 768px breakpoint)
- **Implementation**: Uses MediaQueryList API with event listener
- **Return**: Boolean indicating mobile state
- **Usage**: Used by Sidebar component for responsive behavior

## Utility Functions

### cn() - Classname Merger
**Location**: `lib/utils.ts`
```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
- Combines clsx (conditional classes) with tailwind-merge (resolves conflicts)
- Used throughout components for dynamic styling
- Enables safe Tailwind class composition

## Server vs Client Components

### Server Components (Default)
- Root layout, loading, pages
- Header component: Uses `stackServerApp.getUser()` for auth state
- Enables async data fetching and secrets handling

### Client Components (Marked with "use client")
- Signin/signup pages: Form handling, OAuth flows
- Sidebar component: State management, keyboard shortcuts, responsive behavior
- All Radix UI wrapper components: Interactive primitives

## Development Patterns

### Import Aliases
All imports use the `@/` prefix configured in tsconfig:
```typescript
import { Button } from "@/components/atoms/button"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
```

### Component Composition
Components are designed for composition:
```typescript
<SidebarProvider>
  <AppSidebar />
  <main>
    <Header />
    {children}
  </main>
</SidebarProvider>
```

### Props Pattern
- Components use React.ComponentProps<> for native element props
- Extends with custom props using intersection types
- Optional `asChild` prop from Radix UI for component polymorphism

## Build & Development

### Scripts
- `npm run dev`: Start dev server with Turbopack
- `npm run build`: Production build with Turbopack
- `npm run start`: Start production server
- `npm lint`: Run ESLint

### Turbopack
- Enabled for both dev and build processes
- Provides faster compilation than SWC

## Font Configuration
- **Font**: Manrope from Google Fonts
- **Variable**: `--font-manrope-sans`
- **Subsets**: Latin
- **Applied**: Via body className in root layout

## Performance Features
- React Server Components enabled
- Next.js image optimization available
- Turbopack for fast builds
- Suspense loading states
- CSS-in-JS with Tailwind for minimal runtime overhead

## Notes on Current State
- Home page currently shows component showcase/playground
- Molecules, Pages, and Templates directories are placeholders
- App is in early development phase
- Focus on authentication setup and UI component library foundation
