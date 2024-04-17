'use server'

import { AUTH_COOKIE_KEY } from "@/constants";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

export async function login(formData) {

  const cookieStore = cookies();

  const username = {
    username: formData.get('username'),
    password: formData.get('password')
  }

    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...username,
      })
    })

    const userInfo = await response.json();

    if(response.ok) {
      
      cookieStore.set(AUTH_COOKIE_KEY, userInfo.token)
    }


    userInfo.message && console.log(userInfo.message);
}


// kminchelle
// 0lelplR

export async function logout() {

  const cookieStore = cookies();
  cookieStore.delete(AUTH_COOKIE_KEY);
}