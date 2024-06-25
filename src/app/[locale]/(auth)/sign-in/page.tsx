// --- Components
import SignInForm from "@/src/components/auth/SignInForm";
// --- next-internationalization api
import { getStaticParams } from '@/src/lib/next-internationalization/server';
import { Locale } from "@/src/lib/next-internationalization/i18n.config";
import { setStaticParamsLocale } from "next-international/server";
// --- next api
import { Metadata } from "next";

// static rendering
export function generateStaticParams() {
  return getStaticParams()
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {

  if (params.locale === 'en')
    return {
      title: "Sign in - Aurora Plants",
      description: "Sign in to explore more features of the Aurora Plants platform and get in touch easily"
    }


  return {
    title: "ავტორიზაცია - Aurora Plants",
    description: "გაიარეთ ავტორიზაცია რომ გქონდეთ წვდომა პლატფორმის უფრო მეტ ფუნქციონალთან"
  }
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