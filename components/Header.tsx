import style from './Header.module.css';
import CartIcon from '../Icons/Cart';
import ProfileIcon from '../Icons/Profile';
import Link from 'next/link';

import LogoutBtn from './LogoutBtn';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/dictionaries/dictionary';
import LocalSwitcher from './LocaleSwitcher';

const Header = async ({lang}: {lang:Locale}) => {

  
  const {navLinks: dict} = await getDictionary(lang)
  return (
    <header className={style.wrapper}>
      <h1>Aurora Plants</h1>
      <nav className={style.links}>
        <Link href={`/${lang}/`}>{dict.home}</Link>
        <Link href={`/${lang}/store`}>{dict.store}</Link>
        <Link href={`/${lang}/about`}>{dict.about}</Link>
        <Link href={`/${lang}/contact`}>{dict.contact}</Link>
        <Link href={`/${lang}/blogs`}>{dict.blogs}</Link>
        <Link href={`/${lang}/cart`}>
          <CartIcon className={style.cartIcon} />
        </Link>
        <Link href={`/${lang}/profile`}>
          <ProfileIcon className={style.profileIcon} />
        </Link>
        <LogoutBtn dict={dict}/>
        <LocalSwitcher/>
      </nav>
    </header>
  )
}

export default Header;