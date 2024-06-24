// --- Compoents
import CartList from "@/src/components/Cart Page/CartList";
// --- next-internationalization api
import { Locale } from "@/src/lib/next-internationalization/i18n.config";
import { setStaticParamsLocale } from "next-international/server";
import { getStaticParams } from '@/src/lib/next-internationalization/server';

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
  return (
    <CartList />
  )
}

export default CartPage;