// --- vercel
import { sql } from "@vercel/postgres";
// --- types
import { ICartProduct } from "../types/entities";
import { ICartItem } from "@/src/context/cart";

/**
 * Fetch products by an array of IDs. (used for getting items for non-authorized user's cart)
 * @param ids Array of product IDs.
 * @returns Array of products or null if query fails.
 */
const fetchProductsByIds = async (items: ICartItem[]): Promise<ICartProduct[] | null> => {

  try {
    const queryResult = await sql.query(`
WITH cart_items AS (
  SELECT * FROM jsonb_to_recordset($1::jsonb) AS r(id int, qty int)
)
SELECT 
  p.id,
  p.name, 
  p.name_ge AS "nameGe",
  p.price,  
  p.sale_percentage AS "salePercentage", 
  p.imgUrl AS "imgUrl",
  ci.qty
FROM 
  cart_items ci
JOIN 
  products p 
ON 
  p.id = ci.id;
    `, [JSON.stringify(items)])
    console.log(queryResult.rows)
    return queryResult.rows || null;

  } catch (error) {

    console.error("Error fetching products by IDs:", error);
    throw new Error("Failed to fetch products from the database");

  }
};

export default fetchProductsByIds;
