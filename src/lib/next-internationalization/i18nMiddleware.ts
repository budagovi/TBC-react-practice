import { createI18nMiddleware } from "next-international/middleware";

/**
 * Configures i18n middleware with specified locales, default locale and URL mapping strategy.
 */
const i18nMiddleware = createI18nMiddleware({
  locales: ['en', 'ka'],
  defaultLocale: 'en',
  urlMappingStrategy: 'rewrite'
})

export default i18nMiddleware;