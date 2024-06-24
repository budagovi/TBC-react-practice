'use server'

import { BASE_URL } from "../lib/constants";
import { getSession } from "../lib/jose-auth/auth";


interface IProps {
  city: string,
  address: string,
  tag: string
}
const addNewAddress = async ({ city, address, tag }: IProps) => {

  const session = await getSession();
  const id = session ? session.user.id : null

  try {
    const response = await fetch(`${BASE_URL}/api/addresses`, {
      method: 'POST',
      body: JSON.stringify({ city, address, tag, userId: id }),
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 }
    })
    if (response.ok) {
      return {
        success: true
      }
    }

    throw {
      message: 'Failed To Add new Address',
      status: response.status
    };

  } catch (error: any) {

    console.error("[Error in addNewAddress()]:", error);
    return {
      success: false,
      message: error.message || 'Failed To Add New Address',
      status: error.status
    };
  }
}

export default addNewAddress;