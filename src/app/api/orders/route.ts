// --- vercel
import { IOrder } from "@/src/lib/types/entities";
import { sql } from "@vercel/postgres";
// --- next api
import { NextRequest, NextResponse } from "next/server";

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