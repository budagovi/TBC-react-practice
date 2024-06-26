'use server';
// --- constants
import { BASE_URL } from "@/src/lib/constants";
// --- types
import { IBlog } from "@/src/lib/types/entities";
import { IActionResponse } from "@/src/lib/types/responses";

/**
 * Server Action, fetches blogs data from the database
 * 
 * @returns object containing execution success property [boolean].
 * if success is true, it additionally returns payload object with "data" property, that holds the actual data
 */
const getBlogs = async (): Promise<IActionResponse> => {

  try {
    const response = await fetch(BASE_URL + '/api/blogs', { next: { revalidate: 0 } });
    if (response.ok) {
      const data: Array<IBlog> = await response.json();
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
    console.error("[Error in getBlogs()]:", error.message);
    return {
      success: false,
      message: error.message || 'failed to fetch data ',
      status: error.status
    };
  }
}

export default getBlogs;