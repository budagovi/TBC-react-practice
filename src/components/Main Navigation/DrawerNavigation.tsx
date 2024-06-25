'use client'
// --- style
import style from './DrawerNavigation.module.css';
// --- react-icons
import { RxHamburgerMenu } from "react-icons/rx";
// --- react api
import { Suspense, useState } from 'react';
// --- antd
import { Drawer } from 'antd';
import { useScopedI18n } from '@/src/lib/next-internationalization/client';
import LocalSwitcher from './LocaleSwitcher';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle.util';

const DrawerNavigation = () => {

  const t = useScopedI18n('header');
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(prevState => !prevState);
  };

  return (
    <>
      <button
        className={style.burgerIcon}
        onClick={toggleDrawer}
      >
        <RxHamburgerMenu />
      </button>

      {/* -=-=-=-=- Drawer -=-=-=-=- */}
      <Drawer
        onClose={toggleDrawer}
        open={open}
      >
        <div className={style.modalContent}>
          <nav>
            <ThemeToggle />
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
          </nav>
          <Suspense>
            <LocalSwitcher currentPath={pathname} />
          </Suspense>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerNavigation;