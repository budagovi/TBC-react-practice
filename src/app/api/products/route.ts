import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// *
// * Route handler for fetching all products
// * 

const sqlGetProducts = sql`
SELECT 
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

    console.log(products)
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
