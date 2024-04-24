import { NextRequest } from "next/server";
import { AUTH_COOKIE_KEY } from "./constants";
import { NextResponse } from "next/server";
import { i18n } from "./i18n.config";

export function middleware(request: NextRequest) {
  console.log("middleware executes on " + request.nextUrl.pathname)
  const { pathname } = request.nextUrl;

  // return early if we deal with route handlers
  if (pathname.includes('/api')) {
    return NextResponse.next();
  }

  // internationalization
  const currLocale = (() => { //cuurent lang value
    for (let locale of i18n.locales) {
      if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
        return locale;
      }
    }
    return null;
  })();

  if (!currLocale) {
    request.nextUrl.pathname = `/${i18n.defaultLocale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
  }

  // extract token for checking authorized user existence
  const token = !!request.cookies.get(AUTH_COOKIE_KEY);

  // redirects for user authentication
  if (!pathname.includes('/login') && !token) {
    console.log(`redirecting to login [`)
    return NextResponse.redirect(new URL(`/login`, request.url), { status: 307 })
  }

  if (pathname.includes('/login') && token) {
    console.log('redirecting to store')
    return NextResponse.redirect(new URL('/store', request.url), { status: 307 })
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};