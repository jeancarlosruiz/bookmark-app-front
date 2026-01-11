# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack bookmark management application built as a premium Frontend Mentor challenge. It's a Next.js 16+ application with TypeScript, using Better Auth for authentication and a Go backend API for bookmark management.

**Key Features**: User authentication (email/password + Google OAuth), anonymous user mode with data migration on signup, bookmark CRUD operations, tagging system, search/filter, pin/archive functionality, and light/dark themes.

## Technology Stack

- **Frontend**: Next.js 16.1.1 with React 19, App Router, Server Components, Server Actions
- **Authentication**: Better Auth with JWT plugin, anonymous user support
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Styling**: Tailwind CSS 4, shadcn/ui components, Radix UI primitives
- **State Management**: URL state with nuqs, React hooks
- **Email**: Resend with React Email templates
- **Testing**: Jest with React Testing Library
- **Deployment**: Docker-ready, configured for Railway

## Essential Commands

### Development
```bash
pnpm dev              # Start dev server with Turbopack
pnpm build            # Production build with Turbopack
pnpm start            # Start production server
pnpm lint             # Run ESLint
```

### Database (Drizzle)
```bash
pnpm db:generate      # Generate migrations from schema changes
pnpm db:migrate       # Run pending migrations
pnpm db:push          # Push schema changes directly (dev only)
pnpm db:studio        # Open Drizzle Studio GUI
```

### Testing
```bash
pnpm test             # Run all tests with coverage
pnpm test:watch       # Run tests in watch mode
```

### Email Development
```bash
pnpm email:preview    # Preview email templates at localhost:3000
```

## Architecture

### Directory Structure

```
nextjs-bookmark/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Auth pages (signin, signup, forgot-password, reset-password)
│   ├── (dashboard)/             # Protected dashboard pages
│   ├── api/auth/[...all]/       # Better Auth API route
│   └── examples/                # Component examples/documentation
├── actions/                     # Server Actions (auth, bookmarks, tags)
├── components/                  # Atomic Design pattern
│   ├── atoms/                   # Basic UI elements (Button, Input, etc.)
│   ├── molecules/               # Composite components
│   ├── organisms/               # Complex components (Header, Sidebar)
│   ├── templates/               # Page layouts
│   └── pages/                   # Page-specific components
├── lib/
│   ├── auth/                    # Better Auth configuration
│   │   ├── better-auth.ts       # Server-side auth config
│   │   └── better-auth-client.ts # Client-side auth hooks
│   ├── db/                      # Database layer
│   │   ├── schema.ts            # Drizzle schema (Better Auth tables)
│   │   ├── index.ts             # DB instance
│   │   └── migrations/          # SQL migrations
│   ├── dal/                     # Data Access Layer (see lib/dal/README.md)
│   │   ├── http-client.ts       # HTTP client with auto-auth
│   │   ├── auth.ts              # Auth service
│   │   ├── bookmark.ts          # Bookmark service
│   │   └── tags.ts              # Tags service
│   ├── zod/                     # Zod schemas (bookmark, tag, auth, utils)
│   ├── hooks/                   # Custom React hooks
│   ├── utils/                   # Utility functions
│   ├── config/                  # App configuration
│   └── email/                   # Email templates and Resend config
├── __test__/                    # Jest tests
└── emails/                      # React Email templates
```

### Key Architectural Patterns

#### 1. Component Organization (Atomic Design)
Components follow Atomic Design principles:
- **atoms/**: Basic UI primitives (Button, Input, Badge, etc.)
- **molecules/**: Combinations of atoms (SearchBar, TagFilter, BookmarkCard)
- **organisms/**: Complex components (Header, Sidebar, BookmarkList)
- **templates/**: Page layouts
- **pages/**: Page-specific components

#### 2. Data Access Layer (DAL)
All backend API calls go through the DAL services in `lib/dal/`. **Never use fetch() directly**. The DAL provides:
- Automatic JWT token injection via `http-client.ts`
- Type-safe API calls
- Centralized error handling
- Timeout management

**Example:**
```typescript
// ❌ Don't do this
const response = await fetch(`${process.env.API_URL}/bookmark`);

// ✅ Do this instead
import { bookmarkService } from "@/lib/dal/bookmark";
const bookmarks = await bookmarkService.getUserBookmarks(userId);
```

See `lib/dal/README.md` for complete documentation.

#### 3. Authentication Flow
- **Better Auth** handles all authentication (sessions, JWT, OAuth)
- **Server-side**: Use `auth.api.getSession({ headers: await headers() })`
- **Client-side**: Use `useSession()` hook from `lib/auth/better-auth-client.ts`
- **Anonymous users**: Supported via Better Auth anonymous plugin
- **Data migration**: When anonymous user signs up, data is migrated via `onLinkAccount` hook in `lib/auth/better-auth.ts`

#### 4. Server Actions
All mutations happen through Server Actions in `actions/`:
- `actions/auth.ts`: Sign in, sign up, sign out, password reset
- `actions/bookmarks.ts`: CRUD operations, pin/archive, search
- `actions/tags.ts`: Tag management

#### 5. Backend Communication
- **Backend URL**: `API_URL` (server-side) and `NEXT_PUBLIC_API_URL` (client-side)
- **Backend is Go**: The backend is a separate Go service (not in this repo)
- **Authentication**: All requests include JWT token via DAL
- **Internal endpoints**: Some endpoints (like `/internal/migrate`) require `X-Internal-API-Key` header

## Database Schema

The database uses Drizzle ORM with PostgreSQL. The schema is defined in `lib/db/schema.ts` and includes:
- Better Auth tables: `user`, `session`, `account`, `verification`, `jwks`
- **Note**: Bookmark data is managed by the Go backend, not stored in this database

When modifying the schema:
1. Update `lib/db/schema.ts`
2. Run `pnpm db:generate` to create migration
3. Run `pnpm db:migrate` to apply migration
4. Never use `pnpm db:push` in production

## Environment Variables

Required variables (see `.env.local`):
```bash
# Database
DATABASE_URL=postgresql://...

# Better Auth
BETTER_AUTH_SECRET=          # Random secret key
BETTER_AUTH_URL=             # Frontend URL (http://localhost:3000)
NEXT_PUBLIC_BETTER_AUTH_URL= # Same as above for client

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Email (Resend)
RESEND_API_KEY=
RESEND_FROM_EMAIL=

# Backend API
API_URL=                     # Server-side backend URL
NEXT_PUBLIC_API_URL=         # Client-side backend URL
INTERNAL_API_KEY=            # For internal endpoints
```

## Validation & Type Safety

- All API inputs/outputs are validated with **Zod** schemas in `lib/zod/`
- Schemas are shared between client and server
- Server Actions validate inputs before calling backend
- Type definitions are derived from Zod schemas using `z.infer<typeof schema>`

## Testing

- Tests live in `__test__/` directory
- Jest is configured with jsdom environment
- Use `@/` path alias for imports (configured in `jest.config.ts`)
- Run tests before committing: `pnpm test`

### Writing Tests
```typescript
// Example test structure
import { render, screen } from '@testing-library/react';
import Component from '@/components/atoms/Component';

describe('Component', () => {
  it('should render correctly', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

## CI/CD

GitHub Actions workflow (`.github/workflows/test.yml`) runs on every push/PR to main:
1. Lint check
2. Unit tests
3. Production build

**All checks must pass before merging.**

## Important Notes

### Path Aliases
- Use `@/` for all imports: `import { Button } from "@/components/atoms/button"`
- Configured in `tsconfig.json` and `jest.config.ts`

### Next.js 16 App Router
- This project uses **App Router**, not Pages Router
- Server Components by default (add `"use client"` when needed)
- Server Actions for mutations (no separate API routes needed)
- Route groups: `(auth)` and `(dashboard)` for layout organization

### Styling
- **Tailwind CSS 4** with custom configuration
- **shadcn/ui** components in `components/atoms/`
- **Radix UI** for complex primitives (Dialog, Dropdown, etc.)
- Dark mode via `next-themes` (ThemeProvider in root layout)

### State Management
- **URL state**: Use `nuqs` for search/filter state in URLs
- **Server state**: Server Components fetch data directly, no client-side state needed
- **Client state**: React hooks for UI-only state
- **No global state library** (Redux, Zustand, etc.)

### Better Auth Specifics
- Anonymous users get a session without email/password
- When anonymous user signs up/signs in, `onLinkAccount` callback migrates their data
- JWT tokens are auto-rotated (30-day interval, 7-day grace period)
- Session expiry: 7 days (matches backend Go service)

### Common Pitfalls
1. **Don't bypass the DAL**: Always use services from `lib/dal/`, never fetch() directly
2. **Don't mix server/client code**: Keep Server Components and Client Components separate
3. **Don't forget validation**: Always validate with Zod schemas from `lib/zod/`
4. **Don't use `db:push` in production**: Always use migrations (`db:generate` + `db:migrate`)
5. **Don't hardcode URLs**: Use `API_URL` or `NEXT_PUBLIC_API_URL` from env
