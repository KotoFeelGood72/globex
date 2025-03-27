import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Защищенные пути, требующие авторизации
const protectedPaths = [
  '/admin',
  '/broker',
  '/partner',
  '/company',
  '/dashboard'
];

// Проверяем, является ли путь защищенным
const isProtectedPath = (pathname: string) => {
  return protectedPaths.some(path => pathname.startsWith(path));
};

export default withAuth(
  function middleware(req) {
    const token = req.nextauth?.token;
    const isAuth = !!token;

    // Если путь защищенный и пользователь не авторизован
    if (isProtectedPath(req.nextUrl.pathname) && !isAuth) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    return null;
  },
  {
    callbacks: {
      authorized({ token }) {
        return true; // Всегда пропускаем, проверку делаем в middleware
      },
    },
  }
);

// Конфигурация путей для middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
