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
import type { IAddress, IUser } from '@/src/lib/types/entities';
// --- server actions
import getAddresses from "@/src/server actions/getAddresses";
import ProfileAddresses from "@/src/components/Profile Page/Addresses/ProfileAddresses";

export function generateStaticParams() {
  return getStaticParams()
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {

  if (params.locale === 'en')
    return {
      title: "Profile - Aurora Plants",
      description: "User Profile - Manage your account on Aurora Plants",
    }

  return {
    title: "პროფილი - Aurora Plants",
    description: "მომხმარებლის ანგარიში - დაარედაქტირეთ ინდივიდუალური ინფორმაცია საჭიროებისამებრ ან/და გადახედეთ აქტივობის ისტორიას ჩვენს პლატფორმაზე"
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
  let addresses: IAddress[] = [];
  const addressesResponse = await getAddresses(user.id)
  if (addressesResponse.success) {
    addresses = addressesResponse.payload.data;
  }


  return <ProfileAddresses user={user} addresses={addresses} />
}

export default ProfileAddressesPage;