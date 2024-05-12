// *
// * Middleware (executes on each path, before any request is completed)
// *

// --- Constants
import { AUTH_COOKIE_KEY } from "./constants";
// --- next/react api
import { NextRequest, NextResponse } from "next/server";
// --- next-internationalization
import { createI18nMiddleware } from 'next-international/middleware'

// internationalization 
const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'ka'],
  defaultLocale: 'en',
  urlMappingStrategy: 'rewrite'
})

// removing locale from URL
const removeLocale = (path: string): string => {
  return '/' + path.split('/').slice(2).join('/');
}

export function middleware(request: NextRequest) {

  // extract pathname 
  const { pathname } = request.nextUrl;
  console.log("middleware executes on " + pathname)

  const i18nResponse = I18nMiddleware(request);
  if (i18nResponse) {
    return i18nResponse;
  }

  // remove locale from URL
  const possibleLocale = pathname.split('/')[1]
  if (possibleLocale === 'en' || possibleLocale === 'ka') {
    const newPathname: string = removeLocale(pathname)
    console.log('[removing locale from URL] redirect to ' + newPathname)
    return NextResponse
      .redirect(new URL(newPathname, request.url), { status: 307 })
  }

  // extract token for checking authorized user existence
  const token = !!request.cookies.get(AUTH_COOKIE_KEY);

  // redirects for user authentication
  if (!pathname.includes('/login') && !token) {
    console.log(`[unauthorized user] redirecting to /login`)
    return NextResponse
      .redirect(new URL(`/login`, request.url), { status: 307 })
  }
  else if (pathname.includes('/login') && token) {
    console.log('[authorized user] redirecting to /store')
    return NextResponse
      .redirect(new URL('/store', request.url), { status: 307 })
  }

  return NextResponse.next();
}

// deny middleware execution on paths..
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|icon.svg|images).*)"],
};