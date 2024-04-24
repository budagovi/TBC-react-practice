import { cookies } from "next/headers";
import { AUTH_COOKIE_KEY } from "@/constants";
import { NextResponse } from "next/server";


export async function GET() {

  const cookiesStorage = cookies();
  if(cookiesStorage.get(AUTH_COOKIE_KEY)) {
    cookiesStorage.delete(AUTH_COOKIE_KEY);

    const body = JSON.stringify({ message: 'successfull sign out' })
    return new Response(body, {
      status: 200, // ok
    })
  }

  return NextResponse({message: 'failed to log out', status: 400})
}

