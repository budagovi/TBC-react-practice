// --- next api
import { NextRequest, NextResponse } from "next/server";
// --- types
import type { ICustomApiResponse } from "@/src/lib/types/responses";
// --- vercel api
import { sql } from "@vercel/postgres";
import { IAddress } from "@/src/lib/types/entities";

/**
 * Route handler for fetching addresses for corresponding to user_id
 */
export async function GET(request: NextRequest) {

  try {
    const { searchParams } = new URL(request.nextUrl)
    const userId = searchParams.get('userId')

    const authUserId = request.headers.get('authUserId');


    if (!authUserId || authUserId != userId) {

      return NextResponse.json<ICustomApiResponse>(
        { message: "Unauthorized Access" },
        { status: 401 }
      );
    }

    const queryResult = await sql`
      SELECT 
        a.id,
        address,
        city,
        tag,
        mobile
      FROM 
        users u JOIN addresses a 
      ON 
        u.id = a.user_id
      WHERE
        u.id = ${userId}
    `;

    if (queryResult.rowCount < 1)
      return NextResponse.json<ICustomApiResponse>(
        { message: "No Active Address Found" },
        { status: 404 }
      );

    return NextResponse.json(queryResult.rows, { status: 200 });

  } catch (error: any) {

    console.error("Error in API [GET]/addresses:", error);

    return NextResponse.json<ICustomApiResponse>(
      { message: "Failed To Fetch Addresses From Database" },
      { status: 500 }
    );
  }
}


/**
 * Route handler for adding new address record
 */
export async function POST(request: NextRequest) {


  try {
    const data: IAddress = await request.json();

    const { userId, address, city, tag } = data;

    const queryResult = await sql`
      INSERT INTO addresses (user_id, address, city, tag)
      VALUES (${userId}, ${address}, ${city}, ${tag})
      RETURNING
        id,
        user_id as "userId",
        address,
        city,
        tag
      `
    const newAddress = queryResult.rows[0];

    return NextResponse.json({ ...newAddress, mobile: data.mobile }, { status: 200 })
  }
  catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 501 })
  }
}

export const revalidate = 0;