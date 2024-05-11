import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

// get all users
export async function GET() {
  try {
    const query = await sql`SELECT * FROM users ORDER BY id ASC;`;
    const { rows: users } = query;
    return NextResponse.json(users, { status: 200 })

  }
  catch (error) {
    return NextResponse.json({ error }, { status: 500 })

  }
}

// add new user
export async function POST(request: NextRequest) {

  const data = await request.json();

  const firstname = data.firstname as string
  const lastname = data.lastname as string
  const dob = data.dob as string
  const gender = data.gender as string
  const mobile = data.mobile as string
  const address = data.address as string
  const email = data.email as string
  const password = data.password as string
  const role = data.role as string

  console.log(data)
  try {
    const query = await sql`INSERT INTO users (firstname, lastname, email, password, dob, mobile, address, gender, role)
    VALUES (${firstname}, ${lastname}, ${email}, ${password}, ${dob}, ${mobile}, ${address}, ${gender}, ${role})
    RETURNING id;`;  

    return NextResponse.json(query, { status: 200 })

  }
  catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}