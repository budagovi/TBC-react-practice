// --- vercel
import { sql } from "@vercel/postgres";
// --- types
import { IProduct } from "../types/entities";

/**
 * Fetch a product by name and id from the database
 * @returns Promise<IProduct | null> a product or null if query fails
 */
const fetchProductByIdAndName = async (id: number, name: string): Promise<IProduct | null> => {
  try {
    const queryResult = await sql<IProduct>`
      SELECT 
        id,
        name, 
        name_ge             AS "nameGe",
        price, 
        sale_percentage     AS "salePercentage", 
        description, 
        description_ge      AS "descriptionGe",
        growth_rate         AS "growthRate", 
        size, 
        flowering, 
        imgUrl              AS "imgUrl",
        category
      FROM 
        products
      WHERE
        id = ${id} and name = ${name}
    `;

    return queryResult.rows[0] || null;

  } catch (error) {

    console.error("Error fetching product by ID:", error);
    throw new Error("Database query failed");
  }
};

export default fetchProductByIdAndName;