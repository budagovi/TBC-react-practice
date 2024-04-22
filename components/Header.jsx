import style from './Header.module.css';
import CartIcon from '../Icons/Cart';
import ProfileIcon from '../Icons/Profile';

import Link from 'next/link';

import { cookies } from 'next/headers';
import { AUTH_COOKIE_KEY } from '../constants';
import LogoutBtn from './LogoutBtn';

import { getDictionary } from '../app/[lang]/dictionaries'

const Header = async ({lang}) => {

  const cookieStore = cookies();
  const flag = cookieStore.get(AUTH_COOKIE_KEY);

  const dict = await getDictionary(lang)

  return (
    <header className={style.wrapper}>
      <h1>Aurora Plants</h1>
      {
        flag && <nav className={style.links}>
          <Link href='/'>{dict.home}</Link>
          <Link href='/store'>{dict.store}</Link>
          <Link href='/about'>{dict.about}</Link>
          <Link href='/contact'>{dict.contact}</Link>
          <Link href='/blogs'>{dict.blogs}</Link>
          <Link href='/cart'>
            <CartIcon className={style.cartIcon} />
          </Link>
          <Link href='/profile'>
            <ProfileIcon className={style.profileIcon} />
          </Link>
          <LogoutBtn/>
        </nav>
      }
    </header>
  )
}

export default Header;