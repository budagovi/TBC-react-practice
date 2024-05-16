// --- Compoents
import CartContent from "@/src/components/Cart Page/CartContent";
// --- next-internationalization api
import { Locale } from "@/i18n.config";
import { setStaticParamsLocale } from "next-international/server";
import { getStaticParams } from '@/src/locales/server';

export function generateStaticParams() {
  return getStaticParams()
}

interface IProps {
  params: {
    locale: Locale
  }
}
const CartPage = ({ params: { locale } }: IProps) => {

  // static rendering for both languages on build
  setStaticParamsLocale(locale)
  return <CartContent/>
}

export default CartPage;