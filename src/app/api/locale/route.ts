import { Locale } from 'next/dist/compiled/@vercel/og/satori';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { locale }: { locale:Locale } = await req.json();
  console.log(locale);

  cookies().set('locale', locale);
  const body = JSON.stringify({message: 'switched lang'})
  return new Response(body, {status: 200})
}