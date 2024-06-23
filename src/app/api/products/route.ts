// *
// * Route handler for fetching all products from database
// * 

// --- next api
import { NextResponse } from "next/server";
// --- query
import fetchAllProcuts from "../_queries/fetchAllProducts";

export async function GET() {

  try {
    const products = await fetchAllProcuts();

    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {

    console.error("Error in API [GET]/products:", error);

    return NextResponse.json(
      { message: "Failed to fetch products from database" },
      { status: 500 }
    );
  }
}

export const revalidate = 0;