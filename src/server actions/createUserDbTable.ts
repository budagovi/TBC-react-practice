'use server'
// --- constnats
import { BASE_URL } from "../lib/constants";
// --- types
import type { IActionResponse } from "../lib/types/responses";

/**
 * Server Action, creates new cart record for newly registered user
 * 
 * @returns object containing execution success property [boolean].
 * if success is true, it additionally returns payload object with "data" property, that holds the actual data
 */
const createUserDbTable = async (userId: number): Promise<IActionResponse> => {


  try {

    const response = await fetch(`${BASE_URL}/api/cart`, {
      method: 'POST',
      body: JSON.stringify(userId),
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 0 }
    })

    if (response.ok) {

      return {
        success: true
      }
    }

    return {
      success: false,
      message: 'Could Not Create Cart Record',
      status: 500
    }

  } catch (error: any) {
    console.error("[Error in createUserDbTable()]:", error);
    return {
      success: false,
      message: error.message || 'Could Not Create Cart Record',
      status: error.status
    };
  }

}

export default createUserDbTable;
