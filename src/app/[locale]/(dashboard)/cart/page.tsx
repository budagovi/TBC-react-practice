// --- Compoents
import CartList from "@/src/components/Cart Page/CartList";
// --- next-internationalization api
import { Locale } from "@/src/lib/next-internationalization/i18n.config";
import { setStaticParamsLocale } from "next-international/server";
import { getStaticParams } from '@/src/lib/next-internationalization/server';
// --- next api
import { Metadata } from "next";

export function generateStaticParams() {
  return getStaticParams()
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {

  if (params.locale === 'en')
    return {
      title: "Cart - Aurora Plants",
      description: "Review and manage your shopping cart at Aurora Plants. Add or remove plants, update quantities, and proceed to checkout with ease.",
    }

  return {
    title: "კალათა - Aurora Plants",
    description: "განათავსეთ და გადახედეთ თქვენს მიერ არჩეულ პროდუქტებს კალათაში. ჩაამატეთ, გამოაკელით ან შეცვალეთ რაოდენობა, ხოლო შემდგომ გააგრძელეთ შეკვეთა"
  }
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