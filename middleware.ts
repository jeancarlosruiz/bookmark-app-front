import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

const publicRoutes = ["/signin", "/signup"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    console.log(`[Middleware] ${req.method} ${pathname}`);
  }

  const session = await auth.api.getSession({
    headers: req.headers,
  });

  const isAuthenticated = !!session?.user;

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
