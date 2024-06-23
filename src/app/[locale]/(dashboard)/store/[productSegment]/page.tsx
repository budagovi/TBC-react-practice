// --- actions
import getProduct from "@/src/server actions/getProduct";
// --- types
import type { IProduct } from "@/src/lib/types/entities";
// --- next-internationalization
import { getStaticParams } from "@/src/lib/next-internationalization/server";
import { setStaticParamsLocale } from "next-international/server";
import { Locale } from "@/src/lib/next-internationalization/i18n.config";
// --- helpers
import formatProductPathSegment from "@/src/utilities/helpers/formatProductPathSegment";
// --- actions
import fetchAllProductIdAndNames from "@/src/app/api/_queries/fetchAllProductIdAndNames";
// --- components
import ProductDetails from "@/src/components/Product Page/ProductDetails";
import ProductNav from "@/src/components/Product Page/ProductNav";

export async function generateStaticParams() {
  const params = [];

  const productNameAndIds = await fetchAllProductIdAndNames();
  let segments: string[] = [];
  if (productNameAndIds) {
    segments = productNameAndIds.map(record => formatProductPathSegment(record.name, record.id))
  }

  const localeParams = getStaticParams();


  for (const localeParam of localeParams) {
    for (const segment of segments) {
      params.push({
        ...localeParam,
        productSegment: segment
      });
    }
  }

  return params;
}

interface IProps {
  params: {
    productSegment: string,
    locale: Locale
  }
}

const ProductPage = async ({ params: { productSegment, locale } }: IProps) => {

  // static rendering for both languages on build-time
  setStaticParamsLocale(locale)

  const response = await getProduct(productSegment);
  let product = {} as IProduct;
  if (response.success) {
    product = response.payload.data;
  }

  return (
    <>
      <ProductDetails product={product} />
      <ProductNav
        descriptionText={product.description}
        descriptionTextGe={product.descriptionGe}
      />
    </>
  )
}

export default ProductPage;