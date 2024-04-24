import 'server-only'
 
const dictionaries = {
  en: () => import('../../dictionaries/en.json').then((m) => m.default),
  ge: () => import('../../dictionaries/ge.json').then((m) => m.default),
}
 
export const getDictionary = async (locale) => dictionaries[locale]()