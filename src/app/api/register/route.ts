// --- vercel/postgres
import { sql } from "@vercel/postgres";
// --- next api
import { NextRequest, NextResponse } from "next/server";
// --- dayjs
import dayjs from 'dayjs'
// --- types
import { ICustomApiResponse } from "@/src/lib/types/responses";
import { ISignUpFormData } from "@/src/lib/types/forms";

// *
// * Route handler for registering a new user 
// * 
export async function POST(request: NextRequest) {

  try {

    const formData: ISignUpFormData = await request.json();
    const existingEmails = await sql`SELECT * FROM users WHERE email=${formData.email}`

    if (existingEmails.rowCount !== 0) {
      return NextResponse.json(
        { message: 'Email is already used' },
        { status: 409 }
      )
    }

    const dateISOString = dayjs(formData.dobMilSecs).toDate().toISOString().split('T')[0]
    const queryResult = await sql`INSERT INTO users (
      firstname, 
      lastname, 
      dob, 
      gender, 
      mobile, 
      email, 
      password 
    ) VALUES (
      ${formData.firstname}, 
      ${formData.lastname}, 
      ${dateISOString}, 
      ${formData.gender}, 
      ${formData.mobile}, 
      ${formData.email}, 
      ${formData.password}                    
    )
      RETURNING id;`


    const userId = queryResult.rows[0].id

    await sql`
      INSERT INTO addresses(user_id, address, city, tag)
      VALUES (${userId}, ${formData.address}, ${formData.city}, 'Home')
    `
    
    return NextResponse.json(
      userId,
      { status: 200 }
    );

  } catch (error: any) {

    console.error("Error in API [POST]/login:", error);
    return NextResponse.json<ICustomApiResponse>(
      { message: 'Failed to register a new user' },
      { status: 500 }
    )
  }
}

