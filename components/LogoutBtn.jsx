'use client'

import { logout } from '@/app/login/actions';
import { useRouter } from 'next/navigation';

const LogoutBtn = () => {

  const router = useRouter();
  return <span onClick={async () => {
    await logout();
    router.push('/login');
    window.location.reload();
  }
  }>Log Out</span>
}

export default LogoutBtn;