// --- Components
import Store from '@/src/components/Store Page/Store';
// --- next-internationalization api
import { Locale } from "@/src/lib/next-internationalization/i18n.config";
import { setStaticParamsLocale } from "next-international/server";
import { getStaticParams } from '@/src/lib/next-internationalization/server';

export function generateStaticParams() {
  return getStaticParams()
}

interface Props {
  params: {
    locale: Locale
  }
}

const StorePage = ({ params: { locale } }: Props) => {

  // static rendering for both languages on build
  setStaticParamsLocale(locale)

  return <>
    <Store />
  </>

}

export default StorePage;