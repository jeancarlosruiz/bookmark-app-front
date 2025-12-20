import { NextRequest, NextResponse } from "next/server";
import { authService } from "./lib/dal/auth";

const publicRoutes = [
  "/signin",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    console.log(`[Middleware] ${req.method} ${pathname}`);
  }

  const session = await authService.hasUserCookies(req);
  const isPublicRoute = publicRoutes.some((r) => pathname.startsWith(r));
  const isAuthenticated = !!session;

  if (isDev) {
    console.log({ pathname, isPublicRoute, isAuthenticated: !!session });
  }

  // If it's a public route
  if (isPublicRoute) {
    // Redirect authenticated users away from auth pages
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    // Allow unauthenticated users to access public routes
    return NextResponse.next();
  }

  // All other routes require authentication
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Ejecutar middleware en todas las rutas EXCEPTO:
     * - API routes (/api/*)
     * - Archivos estáticos (_next/static, _next/image)
     * - Archivos de imagen (svg, png, jpg, etc.)
     * - favicon.ico
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
