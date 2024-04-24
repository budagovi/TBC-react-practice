'use client'

import style from './LogoutBtn.module.css';
import { usePathname, useRouter } from 'next/navigation';

const LogoutBtn = ({ dict }: { dict: any }) => {

  const router = useRouter();
  const pathname = usePathname();

  const logoutHandler = async () => {
    const res = await fetch('/api/logout');

    if (res.ok) {
      router.push('/login')
    }
  }

  if(pathname.includes('/login'))
    return null
  return <span className={style.wrapper} onClick={logoutHandler}>{dict.logout}</span>
}

export default LogoutBtn;