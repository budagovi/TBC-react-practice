// --- style
import style from './Links.module.css';
// --- react-icons
import { RxHamburgerMenu } from 'react-icons/rx';
// --- next-intenationalization
import { useScopedI18n } from '@/src/lib/next-internationalization/client';
// --- components
import ThemeToggle from './ThemeToggle.util';
import LocalSwitcher from './LocaleSwitcher';
// --- react/next api 
import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Links = () => {

  const t = useScopedI18n('header');
  const pathname = usePathname();
  return (
    <>
      <RxHamburgerMenu className={style.burger} />
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
        <div className={style.localeSwitcherWrapper}>
          <ThemeToggle />
        </div>
      </nav>
    </>
  )
}

export default Links;