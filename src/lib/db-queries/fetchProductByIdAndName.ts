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
    const qResult = await sql<IProduct>`
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
      WHERE
        id = ${id} and name = ${name}
    `;

    return qResult.rows[0] || null;

  } catch (error) {

    console.error("Error fetching product by ID:", error);
    throw new Error("Database query failed");
  }
};

export default fetchProductByIdAndName;