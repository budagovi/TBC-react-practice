// --- style
import style from './ProfileNav.module.css';
// --- next/react api
import Link from 'next/link';
// --- next-internationalization api
import { getScopedI18n } from '@/src/lib/next-internationalization/server';

/**
 * Navigation list for Profile route segment
 */
const ProfileNav = async () => {

  const t = await getScopedI18n('/profile.profile nav')

  return (
    <aside className={style.wrapper}>
      <span>{t('manage my accaunt')}</span>
      <ul>
        <li><Link href='/profile'>{t('my profile')}</Link></li>
        <li><Link href='/profile/addresses'>{t('address book')}</Link></li>
        <li><Link href='/profile/payments'>{t('my payment options')}</Link></li>
      </ul>
      <span>{t('my orders')}</span>
      <ul>
        <li><Link href='/profile/orders'>{t('my returns')}</Link></li>
        <li><Link href='/profile/cancelations'>{t('my cancelations')}</Link></li>
      </ul>
    </aside>
  )
}

export default ProfileNav;