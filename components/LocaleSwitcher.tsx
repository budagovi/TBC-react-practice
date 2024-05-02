'use client'

import style from './LocaleSwitcher.module.css'
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { i18n, Locale } from "@/i18n.config"

const LocalSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();

  // const redirectedPathname = (locale: Locale) => {
  //   if(!pathname) 
  //     return '/';
    
  //   const segments = pathname.split('/');
  //   segments[1] = locale;
  //   return segments.join('/');
  // }

  const switchLocale = async (lang : Locale) => {
    const response = await fetch(`/api/locale`, {
      method: 'POST',
      body: JSON.stringify({ locale: lang }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    window.location.reload()
  }

  return (
    <ul className={style.wrapper}>
      {i18n.locales.map( locale => {
        return(
          <li key={locale}>
            <Link href={pathname} onClick={ () => switchLocale(locale)}>{locale}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default LocalSwitcher;