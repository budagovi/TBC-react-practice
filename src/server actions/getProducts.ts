'use server';
// --- constants
import { BASE_URL } from "@/src/lib/constants";
// --- types
import { IProduct } from "@/src/lib/types/entities";
import { IActionResponse } from "@/src/lib/types/responses";

/**
 * Server Action, fetches products data from the database
 * 
 * @returns object containing execution success property [boolean].
 * if success is true, it additionally returns payload object with "data" property, that holds the actual data
 */
const getProducts = async (): Promise<IActionResponse> => {

  try {
    const response = await fetch(BASE_URL + '/api/products', { next: { revalidate: 0 } });
    if (response.ok) {
      const data: Array<IProduct> = await response.json();
      return {
        success: true,
        payload: {
          data
        }
      }
    }

    throw {
      message: 'failte to fetch data',
      status: response.status
    };

  } catch (error: any) {
    console.error("[Error in getProducts()]:", error.message);
    return {
      success: false,
      message: error.message || 'failed to fetch data ',
      status: error.status
    };
  }
}

export default getProducts;