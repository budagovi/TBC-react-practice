import { NextResponse } from "next/server";
import { AUTH_COOKIE_KEY} from "./constants";


let defaultLocale = 'en'
let locales = ['ge', 'en']

export function middleware(req) {

  // extract current path
  const { pathname } = req.nextUrl;
  console.log('middleware executes - ' + pathname)

  // return early if we deal with route handlers
  if (pathname.includes('/api')) {
    return NextResponse.next();
  }


  // internationalization
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    req.nextUrl.pathname = `/${defaultLocale}${pathname}`
    return NextResponse.redirect(req.nextUrl)
  } 

  // extract token for checking authorized user existence
  const token = !!req.cookies.get(AUTH_COOKIE_KEY);

  // redirects for user authentication
  if (!pathname.includes('/login') && !token) {
    console.log('redirecting to login')
    return NextResponse.redirect(new URL('/login', req.url), { status: 307 })
  }

  if (pathname.includes('/login') && token) {
    console.log('redirecting to store')
    return NextResponse.redirect(new URL('/store', req.url), { status: 307 })
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};