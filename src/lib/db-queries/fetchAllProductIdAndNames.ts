// --- vercel
import { sql } from "@vercel/postgres";
// --- types
import { IProduct } from "../types/entities";

/**
 * Fetches all products' name and id for product page's static rendering
 * @returns Promise<IProduct[] | null> Array of products' name and id or null if query fails
 * 
 * As url of product page consists of name and id of product, in case if user changes 
 * the id in URL, the page will show another product but with initial name in URL.
 * so we validate both name and id to fetch data for product page.
 */
const fetchAllProductIdAndNames = async (): Promise<IProduct[] | null> => {
  try {
    const queryResult = await sql<IProduct>`
      SELECT 
        id,
        name
      FROM 
        products
      ORDER BY
        id
    `;

    //const nameAndIds = queryResult.rows.map(record => formatProductPathname(record.name, record.id))
    return queryResult.rows || null;

  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products from the database");
  }
};

export default fetchAllProductIdAndNames;
