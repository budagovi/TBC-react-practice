import { ICartState } from "@/src/interfaces/cart-context";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

interface SearchParams {
  params: {
    id: string
  }
}

class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserDoesNotExist';
  }
}

export async function GET({ }: NextRequest, { params }: SearchParams) {

  const { id } = params

  try {
    const query = await sql`SELECT * FROM carts WHERE user_id = ${id}`;
    const { rows: data } = query;
    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: SearchParams) {

  const { id } = params;
  const { items, totalAmount } = await request.json() as ICartState;
  const jsonData = JSON.stringify(items)

  try {

    const query = await sql`UPDATE carts SET data = ${jsonData}, totalamount = ${totalAmount} WHERE user_id = ${+id}`;
    if (query.rowCount === 0) {
      throw new CustomError('user does not exist');
    }
    else {
      const state = await sql`SELECT * from carts where user_id = ${+id}`
      console.log(state)
      return NextResponse.json({ state }, { status: 200 });
    }
  } catch (error) {
    if (error instanceof CustomError)
      return NextResponse.json({ error }, { status: 404 });
    else
      return NextResponse.json({ error }, { status: 500 });
  }
}