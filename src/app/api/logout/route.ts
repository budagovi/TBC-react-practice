import { cookies } from "next/headers";
import { AUTH_COOKIE_KEY } from "@/src/constants";

export async function GET() {

  const cookiesStorage = cookies();
  if(cookiesStorage.get(AUTH_COOKIE_KEY)) {
    cookiesStorage.delete(AUTH_COOKIE_KEY);

    const body = JSON.stringify({ message: 'successfull sign out' })
    return new Response(body, {
      status: 200, // ok
    })
  }

  const body = JSON.stringify({message: 'failed to log out'})
  return new Response(body, {status: 400})
}