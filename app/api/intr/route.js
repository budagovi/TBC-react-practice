
import { cookies } from "next/headers";
import { LANG_COOKIE_KEY } from "@/constants";
import { NextResponse } from "next/server";


export async function POST(req) {

  const { lang } = await req.json()
  
  const cookiesStorage = cookies();

  if (cookiesStorage.get(LANG_COOKIE_KEY)) {
    return NextResponse({ message: 'language unchanged', status: 200 })
  }
  else {
    cookiesStorage.set(LANG_COOKIE_KEY, lang)
    console.log(LANG_COOKIE_KEY + ' - ' + lang)
    const body = JSON.stringify({ message: 'successfully set language' })
    return new Response(body, {
      status: 200, // ok
    })
  }

}

