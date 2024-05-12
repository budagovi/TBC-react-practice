'use client'

// *
// * Header with main navigation 
// *

// --- CSS
import style from './Header.module.css';
// --- Components
import CartIcon from '@/src/icons/Cart';
import ProfileIcon from '@/src/icons/Profile';
import NotebookIcon from '@/src/icons/Notebook';
import LogoutBtn from './LogoutBtn';
import LocalSwitcher from './LocaleSwitcher';
// import ThemeToggle from './ThemeToggle';
// --- UI
import Button from '@/src/UI/Button/Button';
import DropDown from '@/src/UI/DropDown/DropDown';
// --- next/react api
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useScopedI18n } from '@/src/locales/client';
import { Suspense } from 'react';

const Header = () => {

  const t = useScopedI18n('header')

  const pathname = usePathname();
  const isRoot = pathname === '/';

  const router = useRouter();

  return (
    <header className={`${isRoot ? style.banner : style.wrapper}`}>

      {/*   -=-=-=- Head -=-=-=-   */}
      <div className={style.head}>
        <section className='gl-max-width'>
          <span></span>
          <span>{t('summer sal-')}</span>
          <Suspense>
            <LocalSwitcher />
          </Suspense>
        </section>
      </div>

      {/*   -=-=-=- Navigation Bar -=-=-=-   */}
      <div className={`${style.navWrapper} gl-max-width`}>
        <h1>Aurora Plants</h1>
        <nav className={style.links}>
          {/* <ThemeToggle /> */}
          {!isRoot ? <Link href={'/'}>{t('home')}</Link> : <span>{t('home')}</span>}
          <Link href={`/store`}>{t('store')}</Link>
          <Link href={`/about`}>{t('about')}</Link>
          <Link href={`/contact`}>{t('contact')}</Link>
          <Link href={`/admin`}>admin panel</Link>
          <Link href={`/cart`}>
            <CartIcon className={style.cartIcon} />
          </Link>
          <DropDown
            trigger={<ProfileIcon className={style.profileIcon} />}
          >
            <Link href='/profile'><li><ProfileIcon />Account</li></Link>
            <li><NotebookIcon />My Orders</li>
            <LogoutBtn />
          </DropDown>
        </nav>
      </div>

      {/*   -=-=-=- Banner (visible only on home route) -=-=-=-   */}
      <div className={style.bannerText}>
        <p>welcome to the aurora plants</p>
        <span>let&apos;s bring the spring to your home</span>
        <Button
          light={true}
          onClick={() => router.push('/store')}
        >
          shop now
        </Button>
      </div>

    </header>
  )
}

export default Header;