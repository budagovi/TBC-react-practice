// --- Components
import SignUpForm from "@/src/components/auth/SignUpForm";
// --- next-internationalization api
import { Locale } from "@/src/lib/next-internationalization/i18n.config";
import { setStaticParamsLocale } from "next-international/server";
import { getStaticParams } from '@/src/lib/next-internationalization/server';
// --- next api
import { Metadata } from "next";

// static rendering
export function generateStaticParams() {
  return getStaticParams()
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {

  if (params.locale === 'en')
    return {
      title: "Sign up - Aurora Plants",
      description: "Create an account to explore more features of the Aurora Plants platform"
    }

  return {
    title: "რეგისტრაცია - Aurora Plants",
    description: "გაიარეთ რეგისტრაცია და შექმენით ანგარიში, რომ გქონდეთ წვდომა პლატფორმის უფრო მეტ ფუნქციონალთან"
  }
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