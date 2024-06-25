// *
// * Route handler for fetching a product by name and id
// * 

// --- next api
import { NextRequest, NextResponse } from "next/server";
// --- types
import { IProduct } from "@/src/lib/types/entities";
import { ICustomApiResponse } from "@/src/lib/types/responses";
// --- query
import fetchProductByIdAndName from "../../_queries/fetchProductByIdAndName";

interface IProps {
  params: {
    nameAndId: string
  }
}

export async function GET(_: NextRequest, { params: { nameAndId } }: IProps) {

  const id = getID(nameAndId)
  const name = getName(nameAndId)

  try {
    const product = await fetchProductByIdAndName(id, name);

    if (!product) {
      return NextResponse.json<ICustomApiResponse>(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json<IProduct>(product, { status: 200 });

  } catch (error: any) {

    return NextResponse.json<ICustomApiResponse>(
      { message: error.message || "Failed to fetch product from database" },
      { status: 500 }
    );
  }
}

export const revalidate = 0;

const getID = (segment: string) => {
  return parseInt(segment.slice(-3))
}

const getName = (segment: string) => {
  return segment.slice(0, -4).replace('-', ' ')
}