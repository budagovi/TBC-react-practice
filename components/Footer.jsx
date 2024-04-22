import EnvelopeIcon from '../Icons/Envelope';
import TelephoneIcon from '../Icons/Telephone';
import LocationIcon from '../Icons/Location';
import style from './Footer.module.css';

import Link from 'next/link';

import { getDictionary } from '@/app/[lang]/dictionaries';

const Footer = async ({lang}) => {

  const dict = await getDictionary(lang)
  return (
    <footer className={style.wrapper}>
      <section className={style.links}>
        <span>{dict.contact}</span>
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
        <span>{dict.fastLinks}</span>
        <Link href='/about'>{dict.about}</Link>
        <Link href='/contact'>{dict.contact}</Link>
        <Link href='/store'>{dict.store}</Link>
      </section>
      <section className={style.links}>
        <span>{dict.information}</span>
        <a href='#'>{dict.tac}</a>
        <a href='#'>{dict.pp}</a>
      </section>
    </footer>
  )
}

export default Footer;