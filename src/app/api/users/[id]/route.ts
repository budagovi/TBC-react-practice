import { IUser } from "@/src/lib/types/entities";
import { IProfileEditFormData } from "@/src/lib/types/forms";
import { sql } from "@vercel/postgres";
import dayjs from 'dayjs'
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
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {

  const data: IProfileEditFormData = await request.json()

  const { firstname, lastname, dobMilSecs, gender, mobile } = data;

  const dateISOString = dayjs(dobMilSecs).add(1, 'day').toDate().toISOString().split('T')[0]
  try {
    const updatedRecord = await sql`
    UPDATE users
    SET
      firstname = ${firstname},
      lastname = ${lastname},
      dob = ${dateISOString},
      gender = ${gender},
      mobile = ${mobile}
    WHERE 
      id = ${params.id}
    RETURNING
      id,
      firstname,
      lastname,
      dob,
      gender,
      email,
      mobile,
      is_admin as "isAdmin",
      image
    ;
  `;

    const updatedUser = updatedRecord.rows[0] as IUser

    return NextResponse.json({ ...updatedUser }, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}

// delete id-specified user
export async function DELETE({ }: NextRequest, { params }: SearchParams) {

  const { id } = params

  try {
    await sql`DELETE FROM users WHERE id = ${id}`;
    return NextResponse.json({ id }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}