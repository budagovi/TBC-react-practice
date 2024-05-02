import Product from "@/components/Product Page/Product"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import product from "@/interfaces/product";


export async function generateStaticParams(): Promise<string[]> {
  const response = await fetch('https://dummyjson.com/products')

  let data: any | undefined
  if (response.ok) {
    data = await response.json();
  }

  return data.products.map((item: product) => ({
    id: item.id.toString()
  }))
}

const ProductPage = ({ params }: { params: Params }) => {

  return <><Product id={params.id} /></>

}

export default ProductPage;
