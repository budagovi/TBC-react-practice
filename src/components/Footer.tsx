import EnvelopeIcon from '../icons/Envelope';
import TelephoneIcon from '../icons/Telephone';
import LocationIcon from '../icons/Location';
import style from './Footer.module.css';

import Link from 'next/link';
import { getDictionary } from '@/src/dictionaries/dictionary';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const Footer = async ({ lang }: { lang: RequestCookie | undefined }) => {

  const { footer: dict } = await getDictionary(lang);

  return (
    <footer className={style.wrapper}>
      <section className={style.links}>
        <span>{dict.contactTitle}</span>
        <div className={style.contactLine}>
          <EnvelopeIcon className={style.icon} />
          <a href='#'>aurora-store@example.com</a>
        </div>
        <div className={style.contactLine}>
          <TelephoneIcon className={style.icon} />
          <a href='#'>+123 45 67 89</a>
        </div>
        <div className={style.contactLine}>
          <LocationIcon className={style.icon} />
          <a href='#'>{dict.address}</a>
        </div>
      </section>
      <section className={style.links}>
        <span>{dict.linksTitle}</span>
        <Link href={`/about`} >{dict.about}</Link>
        <Link href={`/contact`}>{dict.contact}</Link>
        <Link href={`/store`}>{dict.store}</Link>
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