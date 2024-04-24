import 'server-only'
import type { Locale } from '@/i18n.config'

const dictionaries = {
  en: () => import('./en.json').then(module => module.default),
  ge: () => import('./ge.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()