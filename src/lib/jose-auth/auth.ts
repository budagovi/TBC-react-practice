// jose auth
import { SignJWT } from "jose";
import { jwtVerify } from "jose";
// --- next api
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_KEY } from "../constants";

const secretKey = "oRzx7iNiibDX7qqwzy8SNnWkcno2p/LQ/TBEug3M7RSF";
const key = new TextEncoder().encode(secretKey);

/**
 * Create the session token using “SignJwt”
 * 
 * @param {any} payload 
 * @returns encrypted session token
 */
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

/**
 * Get the existing session from the cookie and then decrypt it using the “decrypt” function. 
 * Then extend the expire time and save a new session token in cookies.
 * 
 * @param request 
 * @returns updated session token in cookies
 */
export async function updateSession(request: NextRequest) {
  const session = request.cookies.get(AUTH_COOKIE_KEY)?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 60 * 60 * 24 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: AUTH_COOKIE_KEY,
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

/**
 * Get current session information
 * 
 * @returns returns decrypted session information
 */
export async function getSession() {
  const session = cookies().get(AUTH_COOKIE_KEY)?.value;
  if (!session) return null;
  return await decrypt(session);
}