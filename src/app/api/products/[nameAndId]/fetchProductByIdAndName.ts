'use server'
// --- vercel
import { sql } from "@vercel/postgres";
// --- types


/**
 * Fetch a product by name and id from the database
 * @returns Promise<IProduct | null> a product or null if query fails
 */
const fetchProductByIdAndName = async (id: number, name: string) => {
  try {
    const queryResult = await sql`
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