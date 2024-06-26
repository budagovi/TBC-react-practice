// --- next-internationalization api
import { Locale } from "@/src/lib/next-internationalization/i18n.config";
import { setStaticParamsLocale } from "next-international/server";
import { getStaticParams } from '@/src/lib/next-internationalization/server';
// --- types
import type { IBlog } from '@/src/lib/types/entities';
// --- next api
import { Metadata } from 'next';
import getBlogs from '@/src/server actions/getBlogs';
import Blogs from '@/src/components/Blogs Page/Blogs';

export function generateStaticParams() {
  return getStaticParams()
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {

  if (params.locale === 'en')
    return {
      title: "Blogs - Aurora Plants",
      description: "Browse and view interestin articles about plant caring",
    }

  return {
    title: "სტატიები - Aurora Plants",
    description: "აღმოაჩინეთ საინტერესო სტატიები ყვავილების მოვლის შესახებ"
  }
}

interface IProps {
  params: {
    locale: Locale
  },
  searchParams: { [key: string]: string | string[] | undefined }
}

const BlogsPage = async ({ params: { locale }, searchParams }: IProps) => {

  // static rendering for both languages on build-time
  setStaticParamsLocale(locale)

  // get data
  const response = await getBlogs();
  let blogs: IBlog[] = [];
  if (response.success) {
    blogs = response.payload.data;
  }

  // extract query parameters
  const { q } = searchParams;
  let filteredBlogs = [...blogs];

  // Filter by query search
  if (typeof q === 'string' && q.trim() !== '') {
    filteredBlogs = filteredBlogs.filter(item => {
      if (locale === 'ka') {
        return item.title?.toLowerCase().includes(q.toLowerCase());
      }

      return item.title?.toLowerCase().includes(q.toLowerCase());

    });
  }

  return <div>
    <Blogs blogs={filteredBlogs}/>
  </div>

}

export default BlogsPage;