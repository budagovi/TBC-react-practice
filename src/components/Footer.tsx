// *
// * Footer of page
// *

// --- CSS
import style from './Footer.module.css';
// --- Icon Components
import EnvelopeIcon from './icons/Envelope';
import TelephoneIcon from './icons/Telephone';
import LocationIcon from './icons/Location';
// --- next.js/react api
import Link from 'next/link';
// --- next-internationalization api
import { getScopedI18n } from '@/src/locales/server'

const Footer = async () => {

  const t = await getScopedI18n('footer')

  return (
    <footer className={style.wrapper}>

      {/*   -=-=-=- Contact -=-=-=-   */}
      <section className={style.links}>
        <span>{t('contact title')}</span>
        <div className={style.contactLine}>
          <EnvelopeIcon />
          <a href='#'>aurora-store@example.com</a>
        </div>
        <div className={style.contactLine}>
          <TelephoneIcon />
          <a href='#'>+123 45 67 89</a>
        </div>
        <div className={style.contactLine}>
          <LocationIcon />
          <a href='#'>{t('address')}</a>
        </div>
      </section>

      {/*   -=-=-=- Fast Section -=-=-=-   */}
      <section className={style.links}>
        <span>{t('links title')}</span>
        <Link href={`/about`} >{t('about')}</Link>
        <Link href={`/contact`}>{t('about')}</Link>
        <Link href={`/store`}>{t('store')}</Link>
      </section>

      {/*   -=-=-=- Information -=-=-=-   */}
      <section className={style.links}>
        <span>{t('info title')}</span>
        <a href='#'>{t('terms & conditions')}</a>
        <a href='#'>{t('privacy policy')}</a>
      </section>
    </footer>
  )
}

export default Footer;