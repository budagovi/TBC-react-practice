// --- style
import style from './ProfileDropDown.module.css';
// --- react-icons
import { SlNotebook } from "react-icons/sl";
import { IoPersonOutline } from "react-icons/io5";
import { RxExit } from "react-icons/rx";
// --- react/nextjs api
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// --- antd
import { App, Dropdown } from "antd"
// --- next-internationalization
import { useScopedI18n } from '@/src/lib/next-internationalization/client';
// --- jose-auth lib
import { logout } from '@/src/lib/jose-auth/actions';
import { publicRoutes } from '@/src/lib/jose-auth/routes';

interface IProps {
  currentPath: string
}

/**
 * Profile icon, with dropdown menu of account-specific links
 */
const ProfileDropDown = async ({ currentPath }: IProps) => {

  const t = useScopedI18n('header')
  
  const { message } = App.useApp();
  const router = useRouter();
  
  const clickHandler = async () => {
    message.open({
      key: 'logout',
      content: t('logging out'),
      duration: 60000,
      type: 'loading'
    })

    await logout()

    message.open({
      key: 'logout',
      content: t('logged out'),
      duration: 2,
      type: 'success'
    })

    if (!publicRoutes.includes(currentPath))
      router.push('/')
  }

  const items = [
    {
      key: 1, label:
        <div className={style.itemWrapper}>
          <Link href={'/profile'}>Profile</Link>
          <IoPersonOutline className={style.itemIcon} />
        </div>
    },
    {
      key: 2, label:
        <div className={style.itemWrapper}>
          <Link href={'/profile'}>My Orders</Link>
          <SlNotebook className={style.itemIcon} />
        </div>
    },
    {
      key: 3, label:
        <div className={style.itemWrapper}>
          <button onClick={clickHandler}>Log out</button>
          <RxExit className={style.itemIcon} />
        </div >
    },
  ]

  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomRight"
      arrow={false}
      overlayClassName={style.overlay}
      overlayStyle={{ paddingBlock: 7 }}
    >
      <IoPersonOutline className={style.icon} />
    </Dropdown>
  )
}

export default ProfileDropDown;