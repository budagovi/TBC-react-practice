// *
// * Route handler for fetching all blogs from database
// * 

// --- next api
import { NextResponse } from "next/server";
// --- query
import { sql } from "@vercel/postgres";
import { IBlog } from "@/src/lib/types/entities";

export async function GET() {

  try {
    const queryResult = await sql<IBlog>`
      SELECT 
        id,
        user_id as "userId", 
        created, 
        thumbnail,
        title,
        text
      FROM 
        blogs
      ORDER BY
        id
    `;

    return NextResponse.json(queryResult.rows, { status: 200 });
  } catch (error: any) {

    console.error("Error in API [GET]/products:", error);

    return NextResponse.json(
      { message: "Failed to fetch products from database" },
      { status: 500 }
    );
  }
}

export const revalidate = 0;