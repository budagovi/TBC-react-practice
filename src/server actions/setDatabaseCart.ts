'use server'
// --- constants
import { BASE_URL } from "../lib/constants";
// --- jose-auth
import { getSession } from "../lib/jose-auth/auth";
// --- types
import type { ICartState } from "../lib/types/cart-context";
import type { IActionResponse } from "../lib/types/responses";

/**
 * Server Action, updates database cart instance according to user_id
 * 
 * @returns object containing execution success property [boolean].
 */
const setDatabaseCart = async (state: ICartState, userId: number): Promise<IActionResponse> => {

  const session = await getSession();
  const id = session ? session.user.id : null

  try {
    const response = await fetch(`${BASE_URL}/api/cart?userId=${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ ...state }),
      headers: {
        'Content-Type': 'application/json',
        'authUserId': id
      },
      next: { revalidate: 0 }
    })
    if (response.ok) {
      return {
        success: true
      }
    }

    throw {
      message: 'Failed To Update Cart',
      status: response.status
    };

  } catch (error: any) {

    console.error("[Error in setDatabaseCart()]:", error);
    return {
      success: false,
      message: error.message || 'Failed To Update Cart',
      status: error.status
    };
  }

}

export default setDatabaseCart;