'use client'

import { useChangeLocale } from '@/src/lib/next-internationalization/client'
import style from './LocaleSwitcher.module.css'
import { i18n } from "@/src/lib/next-internationalization/i18n.config"

const LocalSwitcher = () => {

  const changeLocale = useChangeLocale({ preserveSearchParams: true });

  return (
    <ul className={style.wrapper}>
      {i18n.locales.map(locale => {
        return (
          <li
            key={locale}
            onClick={() => changeLocale(locale)}
          >
            {locale}
          </li>
        )
      })}
    </ul>
  )
}

export default LocalSwitcher;