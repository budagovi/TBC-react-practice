// --- Components
import SignUpForm from "@/src/components/auth/SignUpForm";
// --- next-internationalization api
import { Locale } from "@/src/lib/next-internationalization/i18n.config";
import { setStaticParamsLocale } from "next-international/server";
import { getStaticParams } from '@/src/lib/next-internationalization/server';

// static rendering
export function generateStaticParams() {
  return getStaticParams()
}

interface Props {
  params: {
    locale: Locale
  }
}

const SignUpPage = ({ params: { locale } }: Props) => {

  // static rendering for both languages on build
  setStaticParamsLocale(locale)

  return <SignUpForm />
}

export default SignUpPage;