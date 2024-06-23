'use server'
// --- vercel
import { sql } from "@vercel/postgres";
// --- types
import { IProduct } from "@/src/lib/types/entities";

/**
 * Fetch all products from the database
 * @returns Promise<IProduct[] | null> Array of products or null if query fails
 */
const fetchAllProducts = async (): Promise<IProduct[] | null> => {
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
      ORDER BY
        id
    `;

    return queryResult.rows || null;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products from the database");
  }
};

export default fetchAllProducts;
