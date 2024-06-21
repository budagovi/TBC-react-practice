// --- Components
import Store from '@/src/components/Store Page/Store';
// --- next-internationalization api
import { Locale } from "@/src/lib/next-internationalization/i18n.config";
import { setStaticParamsLocale } from "next-international/server";
import { getStaticParams } from '@/src/lib/next-internationalization/server';
// --- actions
import { getProducts } from '@/src/lib/actions/getProducts';
// --- types
import { IProduct } from '@/src/lib/types/entities';
import { IStoreTag } from '@/src/hooks/useStoreQueryParams';
// --- utils/checkers
import isStoreTag from '@/src/utilities/checkers/isStoreTag';

export function generateStaticParams() {
  return getStaticParams()
}

interface IProps {
  params: {
    locale: Locale
  },
  searchParams: { [key: string]: string | string[] | undefined }
}

const StorePage = async ({ params: { locale }, searchParams }: IProps) => {

  // static rendering for both languages on build-time
  setStaticParamsLocale(locale)

  // get data
  const response = await getProducts();
  let products: IProduct[] = [];
  if (response.success) {
    products = response.payload.data;
  }

  // extract query parameters
  const { q, category, minPrice, maxPrice, tags, sortBy } = searchParams;
  let filteredProducts = [...products];

  // Filter by query search
  if (typeof q === 'string' && q.trim() !== '') {
    filteredProducts = filteredProducts.filter(item => {
      if (locale === 'ka') {
        return item.nameGe?.toLowerCase().includes(q.toLowerCase());
      }

      return item.name?.toLowerCase().includes(q.toLowerCase());

    });
  }

  // Filter by category
  if (typeof category === 'string' && category.trim() !== '') {
    filteredProducts = filteredProducts.filter(item =>
      item.category === category
    )
  }

  //Filter by price
  if (typeof minPrice === 'string' && minPrice.trim() !== '') {
    filteredProducts = filteredProducts.filter(item =>
      item.price >= +minPrice
    )
  }
  if (typeof maxPrice === 'string' && maxPrice.trim() !== '') {
    filteredProducts = filteredProducts.filter(item =>
      item.price <= +maxPrice
    )
  }

  // Filter by tags
  if (typeof tags === 'string' && tags.split(',').every(tag => isStoreTag(tag))) {
    const tagsList = tags.split(',');

    filteredProducts = filteredProducts.filter((item) => {
      const itemTags: IStoreTag[] = [item.size, item.flowering, item.growthRate]
      if (item.salePercentage > 0) itemTags.push('sale')
      return tagsList.every(tag => itemTags.includes(tag as IStoreTag))
    })
  }

  //Sort
  if (typeof sortBy === 'string' && sortBy.trim() !== '') {
    if (sortBy === 'price') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  return <div>
    <Store products={filteredProducts} />
  </div>

}

export default StorePage;