// --- Compoents

// --- next-internationalization api
import { Locale } from "@/src/lib/next-internationalization/i18n.config";
import { setStaticParamsLocale } from "next-international/server";
import { getStaticParams } from '@/src/lib/next-internationalization/server';
import CheckoutForm from "@/src/components/Checkout Page/CheckoutForm";
import { getSession } from "@/src/lib/jose-auth/auth";
import { IAddress, ICreditCard, IUser } from "@/src/lib/types/entities";
import getAddresses from "@/src/server actions/getAddresses";
import getCreditCards from "@/src/server actions/getCreditCards";


export function generateStaticParams() {
  return getStaticParams()
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