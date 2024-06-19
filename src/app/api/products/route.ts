import { sql } from "@vercel/postgres";
//import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
// --- types
import { IProduct } from "@/src/lib/types/entities";

// *
// * Route handler for fetching all products from database
// * 

const sqlGetProducts = sql<IProduct[]>`
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
`

export async function GET() {

  try {
    const response = await sqlGetProducts;
    const products = response.rows;

    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {

    console.error("Error in API [GET]/products:", error);

    return NextResponse.json(
      { message: "Failed to fetch products from database" },
      { status: 500 }
    );
  }
}
