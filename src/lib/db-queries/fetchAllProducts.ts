// --- vercel
import { sql } from "@vercel/postgres";
// --- types
import { IProduct } from "../types/entities";

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
        light_requirement   AS "lightReq", 
        watering_needs      AS "wateringNeed", 
        growth_rate         AS "growthRate", 
        size, 
        pet_friendly        AS "petFriendly", 
        flowering, 
        imgUrl              AS "imgUrl",
        imageUrls           AS "imgUrls",
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
