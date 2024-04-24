'use client'

import { usePathname, useRouter } from "next/navigation";

const LogoutBtn = () => {

  const router = useRouter();
  const path = usePathname();

  const switchLang = (lang) => {
    const newPath = `/${lang}${path.slice(3)}`;
    router.push(newPath);
  }

  return (
    <>
      <span onClick={async () => {
        const res = await fetch('/api/logout');

        if (res.ok) {
          router.push('/login')
          window.location.reload();
        }

      }
      }>Log Out</span>
      |
      <span onClick={() => switchLang('ge')}>geo</span>|
      <span onClick={() => switchLang('en')}>eng</span>
    </>
  )
}

export default LogoutBtn;
