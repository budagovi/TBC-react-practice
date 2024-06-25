// --- Compoents
import Contact from '@/src/components/Contact Page/Contact';
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
      title: "Contact - Aurora Plants",
      description: "Contact us. Get in touch with Aurora Plants Management",
    }

  return {
    title: "კონტაქტი - Aurora Plants",
    description: "დაგვიკავშირდით მეილის საშალებით, ან გვერდზე მითითებული საკონტაქტო ბმულებით"
  }
}

interface Props {
  params: {
    locale: Locale
  }
}
const ContactPage = ({ params: { locale } }: Props) => {

  // static rendering for both languages on build
  setStaticParamsLocale(locale)
  return <Contact />
}

export default ContactPage;