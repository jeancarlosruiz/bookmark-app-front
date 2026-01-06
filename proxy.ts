import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/better-auth";

export async function proxy(request: NextRequest) {
  const isAuthRoute =
    request.nextUrl.pathname.startsWith("/signin") ||
    request.nextUrl.pathname.startsWith("/signup") ||
    request.nextUrl.pathname.startsWith("/forgot-password") ||
    request.nextUrl.pathname.startsWith("/reset-password");

  // Get session to check if user is authenticated AND not anonymous
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const hasSession = !!session?.user;
  const isAnonymous = session?.user?.isAnonymous ?? false;
  const isFullyAuthenticated = hasSession && !isAnonymous;

  // Redirect authenticated (non-anonymous) users away from auth routes
  if (isAuthRoute && isFullyAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow anonymous users to access auth routes (to sign in/register)
  // This enables the onLinkAccount callback to fire
  if (isAuthRoute && isAnonymous) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to signin
  // (no session at all, not even anonymous)
  if (!isAuthRoute && !hasSession) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Excluir: API routes, archivos estáticos, imágenes, etc.
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|examples).*)",
  ],
};
