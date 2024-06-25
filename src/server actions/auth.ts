'use server'
// --- nextjs api
import { cookies } from "next/headers";
// --- jose-auth
import { encrypt } from "@/src/lib/jose-auth/auth";
// --- types
import { ICustomApiResponse, IActionResponse } from "@/src/lib/types/responses";
import { ISignInFormData } from "@/src/lib/types/forms";
// --- constancts
import { AUTH_COOKIE_KEY, BASE_URL } from "@/src/lib/constants";
import { IUser } from "../lib/types/entities";

/**
 * Server Action, creates session token and stores it in cookies if the authorization proccess was successful
 * 
 * @returns object containing execution success property [boolean].
 * if success is false, it additionaly returns endpoint response status:
 * - 401 - "incorrect credentials"
 * - 404 -"user not found"
 * - 500 - "failed login"
 */
export async function login(formData: ISignInFormData): Promise<IActionResponse> {

  // Verify credentials
  const apiUrl = `${BASE_URL}/api/login`;
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formData
      })
    })

    if (!response.ok) {
      const data: ICustomApiResponse = await response.json();

      throw {
        message: data.message,
        status: response.status
      };
    }

    // get user
    const user: IUser = await response.json();

    // create the session
    const expires = new Date(Date.now() + 60 * 60 * 24 * 1000); // 1 day
    const session = await encrypt({ user, expires });

    // Save the session in a cookie and return successful message
    cookies().set(AUTH_COOKIE_KEY, session, { expires, httpOnly: true });
    return { success: true };

  } catch (error: any) {
    console.error("[Error in server action]:", error.message);
    return {
      success: false,
      message: error.message || 'failed login',
      status: error.status
    };
  }
}

/**
 * Removes token from cookeis
 */
export async function logout() {
  // Destroy the session
  console.log('delete session')
  cookies().set(AUTH_COOKIE_KEY, "", { expires: new Date(0) });
}

/**
 * Updates the user information in session token (executed when user edits fields on profile page)
 * @param user 
 */
export async function updateUserSession(user: IUser) {
  const expires = new Date(Date.now() + 60 * 60 * 24 * 1000); // 1 day
  const session = await encrypt({ user, expires });

  // Save the session in a cookie and return successful message
  cookies().set(AUTH_COOKIE_KEY, session, { expires, httpOnly: true });
}