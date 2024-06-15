// --- Components
import SignInForm from "@/src/components/auth/SignInForm";
// --- next-internationalization api
import { getStaticParams } from '@/src/lib/next-internationalization/server';
import { Locale } from "@/src/lib/next-internationalization/i18n.config";
import { setStaticParamsLocale } from "next-international/server";

// static rendering
export function generateStaticParams() {
  return getStaticParams()
}

interface IProps {
  params: {
    locale: Locale
  }
}

const SignInPage = ({ params: { locale } }: IProps) => {

  // static rendering for both languages on build
  setStaticParamsLocale(locale)

  return <SignInForm />
}

export default SignInPage;