'use client'

import { useChangeLocale, useCurrentLocale, useScopedI18n } from '@/src/lib/next-internationalization/client'
import style from './LocaleSwitcher.module.css'
import { authRoutes } from '@/src/lib/jose-auth/routes';

interface IProps {
  currentPath: string;
}
/**
 * Locale switching component (collapsable horizontal select)
 */
const LocalSwitcher = ({ currentPath }: IProps) => {

  const t = useScopedI18n('header')

  // to set white border
  const isLight = currentPath === '/' || authRoutes.includes(currentPath)

  const changeLocale = useChangeLocale({ preserveSearchParams: true });
  const currLocale = useCurrentLocale();

  return (
    <div className={`${style.wrapper} ${isLight ? style.light : ''}`}>
      {currLocale === 'ka' && <button onClick={() => changeLocale('ka')}>{t('ge')}</button>}
      <button onClick={() => changeLocale('en')}>{t('en')}</button>
      {currLocale === 'en' && <button onClick={() => changeLocale('ka')}>{t('ge')}</button>}
    </div>
  )
}

export default LocalSwitcher;