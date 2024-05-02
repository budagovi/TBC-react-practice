import 'server-only'
import type { Locale } from '@/i18n.config'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

const dictionaries = {
  en: () => import('./en.json').then(module => module.default),
  ge: () => import('./ge.json').then(module => module.default)
}

export const getDictionary = async (locale: RequestCookie | undefined) => {
  if (locale)
    return dictionaries[locale.value as Locale]()
  else
    return dictionaries['en']()
}