import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

interface ISearchParams {
  params: {
    id: string
  }
}


export async function DELETE({ }: NextRequest, { params }: ISearchParams) {

  const { id } = params;

  try {
    await sql`DELETE FROM orders WHERE id = ${id}`;
    return NextResponse.json({ id }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}