import { ICartItem } from '@/src/context/cart';
import fetchProductsByIds from '@/src/lib/db-queries/fetchProductsByIds';
import { NextResponse } from 'next/server';

// *
// * route handler for non-authorized users' (which do not have cart instances on db) cart
// *
export async function POST(request: Request) {
  try {
    const items: ICartItem[] = await request.json();
    const ids = items.map(item => item.id)

    if (!Array.isArray(ids) || !ids.every(id => typeof id === 'number')) {
      return NextResponse.json({ message: "Invalid IDs" }, { status: 400 });
    }
    const products = await fetchProductsByIds(items);

    if (!products) {
      return NextResponse.json({ message: "Products not found" }, { status: 404 });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json({ message: error.message || "Failed to fetch products from database" }, { status: 500 });
  }
}
