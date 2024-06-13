import { i18n, Locale } from "@/src/lib/next-internationalization/i18n.config";

/**
 * Checks the pathname for the existence of locale
 * 
 * @param {string} pathname
 * @returns boolean depending if locale is in the pathanme
 */
const includesLocale = (pathname: string): boolean => {
  const firstSegment = pathname.split('/')[1];
  return !!i18n.locales.includes(firstSegment as Locale);
};

export default includesLocale;