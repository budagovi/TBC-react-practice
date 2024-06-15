// --- vercel/postgres
import { sql } from "@vercel/postgres";
// --- next api
import { NextRequest, NextResponse } from "next/server";
// --- dayjs
import dayjs from 'dayjs'
// --- types
import { ISignUpFormData, ICustomApiResponse } from "@/src/lib/types";

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
    await sql`INSERT INTO users (
      firstname, 
      lastname, 
      dob, 
      gender, 
      mobile, 
      address,
      email, 
      password 
    ) VALUES (
      ${formData.firstname}, 
      ${formData.lastname}, 
      ${dateISOString}, 
      ${formData.gender}, 
      ${formData.mobile}, 
      ${formData.address}, 
      ${formData.email}, 
      ${formData.password}                    
    );`

    return NextResponse.json<ICustomApiResponse>(
      { message: "User Registered successfully" },
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

