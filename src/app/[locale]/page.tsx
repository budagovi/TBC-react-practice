// --- components
import FeaturedProducts from "@/src/components/Home Page/FeaturedProducts";
import PlantsCategories from "@/src/components/Home Page/PlantsCategories";
import Services from "@/src/components/Home Page/Services";
// --- helpers
import ScrollUp from "@/src/UI/ScrollUp";
// --- next-internationalization api
import { Locale } from "@/src/lib/next-internationalization/i18n.config";
import { setStaticParamsLocale } from "next-international/server";
import { getStaticParams } from '@/src/lib/next-internationalization/server'

export function generateStaticParams() {
  return getStaticParams()
}

interface IProps {
  params: {
    locale: Locale
  }
}

const App = ({ params: { locale } }: IProps) => {

  // static rendering for both languages on build-time
  setStaticParamsLocale(locale)

  return (
    <>
      <FeaturedProducts />
      <PlantsCategories />
      <Services />
      {/* <ScrollUp /> */}
    </>
  );
}

export default App;