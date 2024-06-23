// --- next api
import { NextRequest, NextResponse } from "next/server";
// --- types
import type { ICartState } from "@/src/lib/types/cart-context";
import type { ICustomApiResponse } from "@/src/lib/types/responses";
// --- vercel api
import { sql } from "@vercel/postgres";

/**
 * Route handler for fetching cart record for corresponding to user_id
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
        items,
        total_amount  AS "totalAmount"
      FROM 
        carts
      WHERE
        user_id = ${userId}
    `;

    const { totalAmount, items } = queryResult.rows[0];

    if (!totalAmount || !items)
      return NextResponse.json<ICustomApiResponse>(
        { message: "Cart Instance Not Found" },
        { status: 404 }
      );

    return NextResponse.json({ totalAmount, items }, { status: 200 });

  } catch (error: any) {

    console.error("Error in API [GET]/cart:", error);

    return NextResponse.json<ICustomApiResponse>(
      { message: "Failed To Fetch Products From Database" },
      { status: 500 }
    );
  }
}

/**
 * Route handler for updating cart record
 */
export async function PUT(request: NextRequest) {

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

    const { items, totalAmount }: ICartState = await request.json();

    const arrItems = JSON.stringify(items);

    const queryResult = await sql`
      UPDATE 
        carts
      SET 
        items = ${arrItems},
        total_amount = ${totalAmount}
      WHERE 
        user_id = ${userId}
      RETURNING
        *
    `;

    if (queryResult.rowCount > 0) {
      return NextResponse.json<ICustomApiResponse>(
        { message: "Updated Cart State Successfully" },
        { status: 200 }
      )
    }

    throw {
      message: 'Failed To Update Cart Database Instance',
      status: 500
    };
  } catch (error: any) {

    console.error("Error in API [PUT]/cart:", error);
    return NextResponse.json<ICustomApiResponse>(
      { message: error.message ?? 'Failed to update cart items' },
      { status: error.status ?? 500 }
    )
  }

}

/**
 * Route handler for adding new cart record (executed on user sign-up)
 */
export async function POST(request: NextRequest) {


  try {
    const id = await request.json();

    const query = await sql`
      INSERT INTO carts (user_id, items, total_amount)
      VALUES (${id}, '[]'::jsonb, 0)`;

    return NextResponse.json(query, { status: 200 })
  }
  catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 501 })
  }
}
export const revalidate = 0;