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
// --- next api
import { Metadata } from "next";


export async function generateMetadata({ params }: { params: { slug: string, locale: Locale } }): Promise<Metadata> {

  const productsResponse = await getProduct(params.slug);

  if (productsResponse.success) {
    const product = productsResponse.payload.data;

    if (params.locale === 'en') {

      return {
        title: product.name + ' - Aurora Plants',
        description: 'Explore and buy ' + product.name + ' at Aurora Plants'
      }
    }
    else {
      return {
        title: product.nameGe + ' - Aurora Plants',
        description: 'შეიძინეთ ' + product.nameGe + ' ავრორას ყვავილებში'
      }
    }
  }
  else
    return {
      title: 'Aurora Plants',
      description: 'Explore and purchase high-quality plants at Aurora Plants'
    };
}

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
        slug: segment
      });
    }
  }

  return params;
}

export const dynamic = 'force-static';
export const dynamicParams = false;

interface IProps {
  params: {
    slug: string,
    locale: Locale
  }
}

const ProductPage = async ({ params: { slug, locale } }: IProps) => {

  // static rendering for both languages on build-time
  setStaticParamsLocale(locale)

  const response = await getProduct(slug);
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