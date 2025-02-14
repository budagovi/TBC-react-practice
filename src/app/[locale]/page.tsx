// --- components
import FeaturedProducts from "@/src/components/Home Page/FeaturedProducts";
import PlantsCategories from "@/src/components/Home Page/PlantsCategories";
import Services from "@/src/components/Home Page/Services";
// --- helpers
import ScrollUp from "@/src/UI/ScrollUp";
// --- next-internationalization api
import { Locale } from "@/src/lib/next-internationalization/i18n.config";
import { setStaticParamsLocale } from "next-international/server";
import { getStaticParams } from '@/src/lib/next-internationalization/server';
// --- next api
import { Metadata } from "next";
// --- types
import type { IProduct } from "@/src/lib/types/entities";
// --- server actions
import getProducts from "@/src/server actions/getProducts";

export function generateStaticParams() {
  return getStaticParams()
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {

  if (params.locale === 'en')
    return {
      title: "Home - Aurora Plants",
      description: "Discover a wide variety of indoor and outdoor plants at Aurora Plants. Shop for high-quality products here."
    }


  return {
    title: "მთავარი - Aurora Plants",
    description: "აღმოაჩინეთ სხვადასხვა უნიკალური მცენარე ავრორას გალერეაში. შეიძინეთ მხოლოდ მაღალი ხარისხის პროდუქტები აქ."
  }
}




interface IProps {
  params: {
    locale: Locale
  }
}

const App = async ({ params: { locale } }: IProps) => {

  // static rendering for both languages on build-time
  setStaticParamsLocale(locale)

  // get data
  const response = await getProducts();
  let products: IProduct[] = [];
  if (response.success) {
    products = response.payload.data;
  }

  return (
    <>
      <FeaturedProducts products={products} />
      <PlantsCategories />
      <Services />
      <ScrollUp />
    </>
  );
}

export default App;