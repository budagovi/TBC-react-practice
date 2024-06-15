// --- style
import style from './Footer.module.css';
// --- react-icons
import { MdOutlineMailOutline } from "react-icons/md";
import { TbHeadset } from "react-icons/tb";
import { GrLocation } from "react-icons/gr";
import { MdOutlineCopyright } from "react-icons/md";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa6';
// --- next.js/react api
import Link from 'next/link';
// --- next-internationalization api
import { getScopedI18n } from '@/src/lib/next-internationalization/server';

/**
 * Footer of the page
 */
const Footer = async () => {

  const t = await getScopedI18n('footer')

  return (
    <footer className={style.footer}>
      <div className={`${style.wrapper} gl-max-width`}>

        {/*   -=-=-=- Support -=-=-=-   */}
        <section className={style.links}>
          <span>{t('support')}</span>
          <div className={style.contactLine}>
            <MdOutlineMailOutline className={style.icon} />
            <a href='#'>aurora-store@example.com</a>
          </div>
          <div className={style.contactLine}>
            <TbHeadset className={style.icon} />
            <a href='#'>+123 45 67 89</a>
          </div>
          <div className={style.contactLine}>
            <GrLocation className={style.icon} />
            <a href='#'>{t('address')}</a>
          </div>
        </section>

        {/*   -=-=-=- Fast Links -=-=-=-   */}
        <section className={style.links}>
          <span>{t('links title')}</span>
          <Link href={`/about`} >{t('about')}</Link>
          <Link href={`/contact`}>{t('contact')}</Link>
          <Link href={`/store`}>{t('store')}</Link>
          <Link href={`/store`}>{t('sign in')}</Link>
        </section>

        {/*   -=-=-=- Information -=-=-=-   */}
        <section className={style.links}>
          <span>{t('info title')}</span>
          <a href='#'>{t('terms & conditions')}</a>
          <a href='#'>{t('privacy policy')}</a>
        </section>

        {/*   -=-=-=- Download the App -=-=-=-   */}
        <section className={style.links}>
          <span>{t('follow')}</span>
          <div className={style.logos}>
            <FaFacebook className={style.logo} />
            <FaInstagram className={style.logo} />
            <FaYoutube className={style.logo} />
            <FaTwitter className={style.logo} />
          </div>
        </section>
      </div>
      <div className={style.copyRightWrapper}>
        <MdOutlineCopyright className={style.copyRightIcon} />
        <p>{t('copy right text')}</p>
      </div>
    </footer>
  )
}

export default Footer;