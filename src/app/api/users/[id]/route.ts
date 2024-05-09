import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

interface SearchParams {
  params: {
    id: string
  }
}

// get id-specified user
export async function GET({ }: NextRequest, { params }: SearchParams) {

  const { id } = params

  try {
    const query = await sql`SELECT * FROM users WHERE id = ${id}`;
    const { rows: data } = query;
    return NextResponse.json({ data }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

// edit id-specified user
export async function PUT(request: NextRequest) {

  const data = await request.json()

  const { id, firstname, lastname, dob, gender, email, password, mobile, address, role } = data;

  try {
    const query = await sql`UPDATE users
      SET
        firstname = ${firstname},
        lastname = ${lastname},
        dob = ${dob},
        gender = ${gender},
        email = ${email},
        password = ${password},
        mobile = ${mobile},
        address = ${address},
        role = ${role}
      WHERE id = ${id};`;
     
    return NextResponse.json({ data }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

// delete id-specified user
export async function DELETE({ }: NextRequest, { params }: SearchParams) {

  const { id } = params

  try {
    const query = await sql`DELETE FROM users WHERE id = ${id}`;
    return NextResponse.json({ id }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}