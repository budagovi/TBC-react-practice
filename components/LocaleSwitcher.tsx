'use client'

import style from './LocaleSwitcher.module.css'
import Link from "next/link"
import { usePathname } from "next/navigation"

import { i18n, Locale } from "@/i18n.config"

const LocalSwitcher = () => {
  const pathname = usePathname();

  const redirectedPathname = (locale: Locale) => {
    if(!pathname) 
      return '/';
    
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  }

  return (
    <ul className={style.wrapper}>
      {i18n.locales.map( locale => {
        return(
          <li key={locale}>
            <Link href={redirectedPathname(locale)}>{locale}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default LocalSwitcher;