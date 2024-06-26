// --- components

// --- next-internationalization api
import { Locale } from "@/src/lib/next-internationalization/i18n.config";
import { setStaticParamsLocale } from "next-international/server";
import { getStaticParams } from '@/src/lib/next-internationalization/server';
// --- next api
import { Metadata } from 'next';
// --- jose-auth
import { getSession } from '@/src/lib/jose-auth/auth';
// --- types
import type { IOrder, IUser } from '@/src/lib/types/entities';
// --- server actions
import getOrders from "@/src/server actions/getOrders";
import Orders from "@/src/components/Profile Page/Orders/Orders";

export function generateStaticParams() {
  return getStaticParams()
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {

  if (params.locale === 'en')
    return {
      title: "Orders - Aurora Plants",
      description: "Manage your orders, view orders history and cancel unwanted ones",
    }

  return {
    title: "შეკვეთები - Aurora Plants",
    description: "გადახედეთ შეკვეთების ისტორიას, ან გააუქმეთ დაუდასტურებელი შეკვეთა"
  }
}

interface Props {
  params: {
    locale: Locale
  }
}

const ProfileAddressesPage = async ({ params: { locale } }: Props) => {

  // static rendering for both languages on build
  setStaticParamsLocale(locale)

  const { user }: { user: IUser } = await getSession();

  // fetch addresses
  let orders: IOrder[] = [];
  const ordersResponse = await getOrders(user.id)
  if (ordersResponse.success) {
    orders = ordersResponse.payload.data;
  }

  return <Orders user={user} orders={orders} />
}

export default ProfileAddressesPage;