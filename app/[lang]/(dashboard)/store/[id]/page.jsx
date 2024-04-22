import Product from "@/components/Product Page/Product"

export async function generateStaticParams() {

  const response = await fetch('https://dummyjson.com/products');
  let data;
  if(response.ok) {
    data = await response.json();
  }
 
  console.log(data.products);
  return data.products.map((post) => ({
    id: post.id.toString(),
  }))
}

const ProductPage = ({params}) => {

  return<><Product id={params.id}/></>
  
}

export default ProductPage;
