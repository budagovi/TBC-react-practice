// --- next api
import { NextRequest, NextResponse } from "next/server";
// --- types
import type { ICustomApiResponse } from "@/src/lib/types/responses";
// --- vercel api
import { sql } from "@vercel/postgres";

/**
 * Route handler for fetching credit cards for corresponding user_ids
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
        card_id as "cardId",
        expiration_time as "expires"
      FROM 
        credit_cards
      WHERE
        user_id = ${userId}
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
