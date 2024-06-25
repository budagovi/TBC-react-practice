// --- style
import style from './ProfileBanner.module.css';
// --- types
import type { IUser } from '@/src/lib/types/entities';
// --- next api
import { redirect } from 'next/navigation';

interface IProps {
  user: IUser
}

const ProfileBanner = async ({ user }: IProps) => {

  if(!user)
    redirect('/sign-in')

  return (
    <div className={style.wrapper}>
      <div className={style.avatarWrapper}>
        <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg" alt="avatar" />
      </div>
      <div className={style.text}>
        <span>{user.lastname}  {user.firstname}</span>
        <p>Your account is ready, {user.email}</p>
      </div>
    </div>
  )
}

export default ProfileBanner;