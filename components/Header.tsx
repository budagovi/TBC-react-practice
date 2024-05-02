import style from './Header.module.css';
import CartIcon from '../icons/Cart';
import ProfileIcon from '../icons/Profile';
import Link from 'next/link';

import LogoutBtn from './LogoutBtn';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/dictionaries/dictionary';
import LocalSwitcher from './LocaleSwitcher';
import ThemeToggle from './ThemeToggle';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const Header = async ({lang}: {lang:RequestCookie | undefined}) => {

  
  const {navLinks: dict} = await getDictionary(lang)

  return (
    <header className={style.wrapper}>
      <h1>Aurora Plants</h1>
      <nav className={style.links}>
        <Link href={`/`}>{dict.home}</Link>
        <Link href={`/store`}>{dict.store}</Link>
        <Link href={`/about`}>{dict.about}</Link>
        <Link href={`/contact`}>{dict.contact}</Link>
        <Link href={`/blogs`}>{dict.blogs}</Link>
        <Link href={`/cart`}>
          <CartIcon className={style.cartIcon} />
        </Link>
        <Link href={`/profile`}>
          <ProfileIcon className={style.profileIcon} />
        </Link>
        <LogoutBtn dict={dict}/>
        <LocalSwitcher/>
        <ThemeToggle />
      </nav>
    </header>
  )
}

export default Header;