// --- vercel/postgres
import { sql } from '@vercel/postgres';
// --- nextjs api
import { NextRequest, NextResponse } from 'next/server';
// --- types
import { ISignInFormData } from '@/src/lib/types/forms';
import { IUser } from '@/src/lib/types/entities';
import { ICustomApiResponse } from '@/src/lib/types/responses';

// *
// * Route handler for loggin the user in
// * 
export async function POST(request: NextRequest) {

  try {
    const reqBody: ISignInFormData = await request.json();
    const { email, password } = reqBody;

    // check if user exists
    const userExists = await sql`SELECT 
      id, 
      firstname, 
      lastname, 
      dob, 
      gender, 
      email, 
      password,
      mobile, 
      is_admin as "isAdmin", 
      image 
    FROM users WHERE email=${email}`

    if (userExists.rowCount === 0) {
      return NextResponse.json<ICustomApiResponse>(
        { message: "user not found" },
        { status: 404 }
      )
    }

    // extract password from user object
    const { password: passwordFromDb, ...userWithoutPassword } = userExists.rows[0]
    const user = userWithoutPassword as IUser

    // check if passwrods match
    if (password !== passwordFromDb) {
      return NextResponse.json<ICustomApiResponse>(
        { message: "incorrect credentials" },
        { status: 401 }
      )
    }

    // return user if all checks are passed
    return NextResponse.json<IUser>(
      { ...user },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Error in API [POST]/login:", error);
    return NextResponse.json<ICustomApiResponse>(
      { message: 'Failed to log the user in' },
      { status: 500 }
    )
  }
}