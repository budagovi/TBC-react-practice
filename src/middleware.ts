// *
// * Middleware (executes on each path, before any request is completed)
// *

// --- next/react api
import { NextRequest, NextResponse } from "next/server";
// --- next-auth
import {
  publicRoutes,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT
} from "@/src/lib/jose-auth/routes"
// --- next-internationalization
import i18nMiddleware from "./lib/next-internationalization/i18nMiddleware";
// --- helpers
import includesLocale from "./utilities/helpers/includesLocale";
import removeLocale from "./utilities/helpers/removeLocale";
import { getSession, updateSession } from "./lib/jose-auth/auth";

export const middleware = async (request: NextRequest) => {

  await updateSession(request);

  // extract pathname 
  const { pathname } = request.nextUrl;
  console.log("[middleware] execution on " + pathname)

  // -=-=-=- Internationalization -=-=-=- 

  const i18nResponse = i18nMiddleware(request);
  const localeIsChanging = !!i18nResponse.cookies.get("Next-Locale") // detect request which changes the locale

  if (localeIsChanging)
    return i18nResponse;

  if (includesLocale(pathname)) {  // when locale is not changing, library does not remove it from URL, need to remove it  manually
    const newPathname: string = removeLocale(pathname)
    console.log('[middleware] removing locale and redirect to ' + newPathname)
    return NextResponse
      .redirect(new URL(newPathname, request.url), { status: 307 })
  }

  // -=-=-=- Autnentication -=-=-=-

  const isLoggedIn = !!(await getSession());
  const isPublicRoute = publicRoutes.includes(pathname)
  const isAuthRoute = authRoutes.includes(pathname)

  console.log('sesstion ' + isLoggedIn)
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse
        .redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url), { status: 307 })
    }
    return i18nResponse
  }

  if (!isPublicRoute && !isLoggedIn) {
    return NextResponse
      .redirect(new URL('/sign-in', request.url), { status: 307 })
  }

  return i18nResponse;

}

// deny middleware execution on paths..
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|icon.svg|images).*)"],
};