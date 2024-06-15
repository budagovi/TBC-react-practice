'use client'
// --- style
import style from './LocaleSwitcher.module.css'
// --- next-internationalization
import { useChangeLocale, useCurrentLocale, useScopedI18n } from '@/src/lib/next-internationalization/client';
// --- auth routes
import { authRoutes } from '@/src/lib/jose-auth/routes';

interface IProps {
  currentPath: string;
}

/**
 * Locale switching component (collapsable horizontal select)
 */
const LocalSwitcher = ({ currentPath }: IProps) => {

  const t = useScopedI18n('header')
  const changeLocale = useChangeLocale({ preserveSearchParams: true });
  const currLocale = useCurrentLocale();
  
  // to set white border
  const isLight = currentPath === '/' || authRoutes.includes(currentPath)

  return (
    <div className={`${style.wrapper} ${isLight ? style.light : ''}`}>
      {currLocale === 'ka' && <button onClick={() => changeLocale('ka')}>{t('ge')}</button>}
      <button onClick={() => changeLocale('en')}>{t('en')}</button>
      {currLocale === 'en' && <button onClick={() => changeLocale('ka')}>{t('ge')}</button>}
    </div>
  )
}

export default LocalSwitcher;