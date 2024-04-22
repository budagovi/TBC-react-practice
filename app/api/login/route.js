import { AUTH_COOKIE_KEY } from '@/constants';
import { cookies } from 'next/headers'

export async function POST(req) {

  const { username, password } = await req.json()

  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
    })
  })

  if (response.ok) {
    const data = await response.json();
    const body = JSON.stringify({ message: 'successfull sign in' })
    
    const cookieStorage = cookies();
    cookieStorage.set(AUTH_COOKIE_KEY, data.token);
    
    return new Response(body, {
      status: response.status, // 200
    })
  }
  else {
    const body = JSON.stringify({ message: 'failed sign in' })
    
    return new Response(body, {
      status: response.status, // 401
    })
  }
}