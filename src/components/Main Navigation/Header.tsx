'use client'
// --- style
import style from './Header.module.css';
// --- Components
import LocalSwitcher from './LocaleSwitcher';
import ProfileDropDown from './ProfileDropDown';
// import ThemeToggle from './ThemeToggle';
// --- UI
import Button from '@/src/UI/Button/Button';
// --- next/react api
import { usePathname, useRouter } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
// --- next-internationalization api
import { useScopedI18n } from '@/src/lib/next-internationalization/client';
// --- hooks
import useCartContext from '@/src/hooks/useCartContext';
// --- react-icons
import { IoCartOutline } from "react-icons/io5"

interface IProps {
  isLoggedIn: boolean
}

/**
 * Header with main navigation links
 */
const Header = ({ isLoggedIn }: IProps) => {

  // -=-=-=- Internationalization -=-=-=-

  const t = useScopedI18n('header')

  const pathname = usePathname();

  // expnad banner with image if user is on home route
  const isRootPage = pathname === '/';

  // make font white if user is on any auth route
  const isAuth = pathname === '/sign-in' || pathname === '/sign-up';

  const router = useRouter();

  // get total amount of cart items and render with no SSR
  const ctx = useCartContext();
  const { totalAmount } = ctx;
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <header className={`${isRootPage ? style.banner : style.wrapper} ${isAuth ? style.lightFont : null}`}>

      {/*   -=-=-=- Head -=-=-=-   */}

      <div className={style.head}>
        <section className='gl-max-width'>
          <span>{t('summer sal-')}</span>
        </section>
      </div>

      {/*   -=-=-=- Navigation Bar -=-=-=-   */}

      <div className={`${style.navWrapper} gl-max-width`}>
        {!isRootPage ? <Link href={'/'}><h1>Aurora Plants</h1></Link> : <h1>Aurora Plants</h1>}
        <nav className={style.links}>
          <Suspense>
            <LocalSwitcher currentPath={pathname} />
          </Suspense>
          <Link
            href={`/store`}
            className={style.textLink}>
            {t('store')}
          </Link>
          <Link
            href={`/blogs`}
            className={style.textLink}>
            {t('blogs')}
          </Link>
          <Link
            href={`/contact`}
            className={style.textLink}>
            {t('contact')}
          </Link>

          <Link href={`/cart`} className={style.cartIcon}>
            {isClient ? <div >{totalAmount}</div> : <div>0</div>}
            <IoCartOutline className={style.cartIcon} />
          </Link>
          {isLoggedIn ?
            <ProfileDropDown currentPath={pathname} /> :
            <Button
              light={isAuth || isRootPage ? true : undefined}
              style={{ padding: "0.5rem 0.8rem" }}
              onClick={() => router.push('/sign-in')}
            >
              {t('sign in')}
            </Button>
          }
        </nav>
      </div>

      {/*   -=-=-=- Banner (visible only on home route) -=-=-=-   */}

      <div className={style.bannerText}>
        <p>{t('welcome')}</p>
        <span>{t('intro text')}</span>
        <Button
          light={true}
          onClick={() => router.push('/store')}
        >
          {t('shop now')}
        </Button>
      </div>

    </header>
  )
}

export default Header;