'use server'
// --- constnats
import { BASE_URL } from "../lib/constants";
// --- jose-auth
import { getSession } from "../lib/jose-auth/auth";
// --- types
import type { IActionResponse } from "../lib/types/responses";

/**
 * Server Action, fetches database cart instance for corresponding user_id
 * 
 * @returns object containing execution success property [boolean].
 * if success is true, it additionally returns payload object with "data" property, that holds the actual data
 */
const getDatabaseCart = async (userId: number): Promise<IActionResponse> => {

  const session = await getSession();
  const id = session ? session.user.id : null;

  try {

    const response = await fetch(`${BASE_URL}/api/cart?userId=${userId}`, {
      headers: {
        'authUserId': id
      },
      next: { revalidate: 0 }
    })

    if (response.ok) {

      const data = await response.json();
      return {
        success: true,
        payload: { data }
      }
    }

    return {
      success: false,
      message: 'Cart Not Found',
      status: 404
    }

  } catch (error: any) {
    console.error("[Error in getDaatabaseCart()]:", error);
    return {
      success: false,
      message: error.message || 'failed to fetch cart',
      status: error.status
    };
  }

}

export default getDatabaseCart;
