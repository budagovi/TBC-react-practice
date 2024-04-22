'use client'

import { useRouter } from 'next/navigation';

const LogoutBtn = () => {

  const router = useRouter();

  const logoutHandler = async () => {
    const res = await fetch('/api/logout');

    if (res.ok) {
      router.push('/login')
    }
  }

  return <span onClick={logoutHandler}>Log Out</span>
}

export default LogoutBtn;