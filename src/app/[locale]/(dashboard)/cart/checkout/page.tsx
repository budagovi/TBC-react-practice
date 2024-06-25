// --- next-internationalization api
import { Locale } from "@/src/lib/next-internationalization/i18n.config";
import { setStaticParamsLocale } from "next-international/server";
import { getStaticParams } from '@/src/lib/next-internationalization/server';
// --- components
import CheckoutForm from "@/src/components/Checkout Page/CheckoutForm";
// --- jose-auth
import { getSession } from "@/src/lib/jose-auth/auth";
// --- types
import type { IAddress, ICreditCard, IUser } from "@/src/lib/types/entities";
// --- server actions
import getAddresses from "@/src/server actions/getAddresses";
import getCreditCards from "@/src/server actions/getCreditCards";
// --- next api
import { Metadata } from "next";


export function generateStaticParams() {
  return getStaticParams()
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {

  if (params.locale === 'en')
    return {
      title: "Checkout - Aurora Plants",
      description: "Complete your plant shopping experience at Aurora Plants. Choose shipping option, review your order, and proceed to secure payment.",
     }

  return {
    title: "შეკვეთის გაფორმება - Aurora Plants",
    description: "აირჩიეთ თქვენთვის სასურველი მიტანის სერვისი, გადახედეთ პროდუქტებს და შემდგომ დაასრულეთ შეკვეთა ავრორას უსაფრთხო ონლაინ ანგარიშწორებით"
  }
}

interface Props {
  params: {
    locale: Locale
  }
}
const CheckoutPage = async ({ params: { locale } }: Props) => {

  // get session information
  const { user }: { user: IUser } = await getSession();

  // fetch addresses
  let addresses: IAddress[] = [];
  const addressesResponse = await getAddresses(user.id)
  if (addressesResponse.success) {
    addresses = addressesResponse.payload.data;
  }

  // fetch credit cards
  let cards: ICreditCard[] = [];
  const cardsResponse = await getCreditCards(user.id)
  if (cardsResponse.success) {
    cards = cardsResponse.payload.data
  }

  // static rendering for both languages on build
  setStaticParamsLocale(locale)
  return (
    <CheckoutForm
      user={user}
      addresses={addresses}
      creditCards={cards}
    />
  )
}

export default CheckoutPage;