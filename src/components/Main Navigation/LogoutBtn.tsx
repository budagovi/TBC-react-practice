'use client'

import ExitIcon from '@/src/components/icons/Exit';
import { usePathname, useRouter } from 'next/navigation';

const LogoutBtn = () => {

  const router = useRouter();
  const pathname = usePathname();

  const logoutHandler = async () => {
    const res = await fetch('/api/logout');

    if (res.ok) {
      router.push('/login')
    }
  }

  if (pathname.includes('/login'))
    return null
  return <li onClick={logoutHandler}><ExitIcon /> Logout</li>
}

export default LogoutBtn;