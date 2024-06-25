// --- Components
import Profile from '@/src/components/Profile Page/Profile';
// --- next-internationalization api
import { Locale } from "@/src/lib/next-internationalization/i18n.config";
import { setStaticParamsLocale } from "next-international/server";
import { getStaticParams } from '@/src/lib/next-internationalization/server';
// --- next api
import { Metadata } from 'next';

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

const ProfilePage = ({ params: { locale } }: Props) => {

  // static rendering for both languages on build
  setStaticParamsLocale(locale)

  return <Profile />

}

export default ProfilePage;