import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest) {
  const { items, totalAmount, id } = await request.json();
  const jsonData = JSON.stringify(items)

  try {
    const query = await sql`INSERT INTO carts (user_id, data, totalamount)
    VALUES (${id}, ${jsonData}, ${totalAmount})`;

    return NextResponse.json(query, { status: 200 })
  }
  catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 })
  }

}