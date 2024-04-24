import EnvelopeIcon from '../Icons/Envelope';
import TelephoneIcon from '../Icons/Telephone';
import LocationIcon from '../Icons/Location';
import style from './Footer.module.css';

import Link from 'next/link';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/dictionaries/dictionary';

const Footer = async ({lang}: {lang:Locale}) => {

  const {footer: dict} = await getDictionary(lang);

  return (
    <footer className={style.wrapper}>
      <section className={style.links}>
        <span>{dict.contactTitle}</span>
        <div className={style.contactLine}>
          <EnvelopeIcon className={style.icon}/>
          <a href='#'>aurora-store@example.com</a>
        </div>
        <div className={style.contactLine}>
          <TelephoneIcon className={style.icon}/>
          <a href='#'>+123 45 67 89</a>
        </div>
        <div className={style.contactLine}>
          <LocationIcon className={style.icon}/>
          <a href='#'>{dict.address}</a>
        </div>
      </section>
      <section className={style.links}>
        <span>{dict.linksTitle}</span>
        <Link href={`/${lang}/about`} >{dict.about}</Link>
        <Link href={`/${lang}/contact`}>{dict.contact}</Link>
        <Link href={`/${lang}/store`}>{dict.store}</Link>
      </section>
      <section className={style.links}>
        <span>{dict.infoTitle}</span>
        <a href='#'>{dict['terms&conditions']}</a>
        <a href='#'>{dict.privacyPolicy}</a>
      </section>
    </footer>
  )
}

export default Footer;