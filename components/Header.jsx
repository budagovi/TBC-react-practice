import style from './Header.module.css';
import CartIcon from '../Icons/Cart';
import ProfileIcon from '../Icons/Profile';

import Link from 'next/link';

const Header = () => {
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
      </nav>
    </header>
  )
}

export default Header;