// --- Components
import Profile from '@/src/components/Profile Page/Profile';
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

const ProfilePage = ({ params: { locale } }: Props) => {

  // static rendering for both languages on build
  setStaticParamsLocale(locale)

  return <Profile />

}

export default ProfilePage;