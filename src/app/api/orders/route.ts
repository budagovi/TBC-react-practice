// --- vercel
import { IOrder } from "@/src/lib/types/entities";
import { ICustomApiResponse } from "@/src/lib/types/responses";
import { sql } from "@vercel/postgres";
// --- next api
import { NextRequest, NextResponse } from "next/server";

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
        id,
        user_id as "userId",
        total_amount as "totalAmount",
        total_price as "totalPrice",
        items,
        created_at as "created"
      FROM 
        orders 
      WHERE
        user_id = ${userId}
    `;

    if (queryResult.rowCount < 1)
      return NextResponse.json<ICustomApiResponse>(
        { message: "No Active Address Found" },
        { status: 404 }
      );

    const data = queryResult.rows as IOrder[];

    return NextResponse.json(data, { status: 200 });

  } catch (error: any) {

    console.error("Error in API [GET]/orders:", error);

    return NextResponse.json<ICustomApiResponse>(
      { message: "Failed To Fetch Orders From Database" },
      { status: 500 }
    );
  }
}

/**
 * Route handler for adding new order record on each checkout
 */
export async function POST(request: NextRequest) {


  try {
    const { userId, items, totalAmount, totalPrice }: IOrder = await request.json();

    const itemsJSON = JSON.stringify(items);
    const query = await sql`
      INSERT INTO orders (user_id, items, total_amount, total_price)
      VALUES (${userId}, ${itemsJSON}, ${totalAmount}, ${totalPrice})`;

    return NextResponse.json(query, { status: 200 })
  }
  catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 501 })
  }
}
export const revalidate = 0;