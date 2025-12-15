import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "./stack/server";

const publicRoutes = ["/signin", "/signup"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    console.log(`[Middleware] ${req.method} ${pathname}`);
  }

  const user = await stackServerApp.getUser();

  const isAuthenticated = !!user;
  // const isAuthenticated = true;

  const isAuthRoutes = publicRoutes.some((route) => route === pathname);

  if (isAuthenticated && isAuthRoutes) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  console.log("Middleware alert", {
    user: isAuthenticated,
  });
}

export const config = {
  matcher: [
    /*
     * Ejecutar middleware en todas las rutas EXCEPTO:
     * - API routes internos de Next.js (_next)
     * - Archivos estáticos (imágenes, fuentes, etc.)
     * - Archivos en /public
     * - favicon.ico
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
