import { NextRequest } from "next/server";
import { AUTH_COOKIE_KEY } from "./constants";
import { NextResponse } from "next/server";
import { i18n } from "../i18n.config";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {

  // extract pathname 
  const { pathname } = request.nextUrl;
  console.log("middleware executes on " + pathname)

  // internationalization
  // const currLocale = (() => { //cuurent lang value
  //   for (let locale of i18n.locales) {
  //     if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
  //       return locale;
  //     }
  //   }
  //   return null;
  // })();

  const currLocale = cookies().get('locale')?.value;

  if (!currLocale) {
    // request.nextUrl.pathname = `/${i18n.defaultLocale}${pathname}`
    // return NextResponse.redirect(request.nextUrl)

    const response = NextResponse.next()
    response.cookies.set('locale', i18n.defaultLocale)
    return response;
  }

  // extract token for checking authorized user existence
  const token = !!request.cookies.get(AUTH_COOKIE_KEY);

  // redirects for user authentication
  if (!pathname.includes('/login') && !token) {
    console.log(`redirecting to login`)
    return NextResponse.redirect(new URL(`/login`, request.url), { status: 307 })
  }
  else if (pathname.includes('/login') && token) {
    console.log('redirecting to store')
    return NextResponse.redirect(new URL('/store', request.url), { status: 307 })
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|icon|images).*)"],
};