import style from './Header.module.css';
import CartIcon from '../Icons/Cart';
import ProfileIcon from '../Icons/Profile';

import Link from 'next/link';

import { cookies } from 'next/headers';
import { AUTH_COOKIE_KEY } from '../constants';
import LogoutBtn from './LogoutBtn';

const Header = () => {

  const cookieStore = cookies();
  const flag = cookieStore.get(AUTH_COOKIE_KEY);


  return (
    <header className={style.wrapper}>
      <h1>Aurora Plants</h1>
      <nav className={style.links}>
        <Link href='/'>Home</Link>
        <Link href='/store'>Store</Link>
        <Link href='/about'>About Us</Link>
        <Link href='/contact'>Contact Us</Link>
        <Link href='/blogs'>Blogs</Link>
        <Link href='/cart'>
          <CartIcon className={style.cartIcon} />
        </Link>
        <Link href='/profile'>
          <ProfileIcon className={style.profileIcon} />
        </Link>
        <LogoutBtn />
      </nav>
    </header>
  )
}

export default Header;