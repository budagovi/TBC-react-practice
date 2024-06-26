// --- style
import style from './ProfileBanner.module.css';
// --- types
import type { IUser } from '@/src/lib/types/entities';
// --- next api
import { redirect } from 'next/navigation';

interface IProps {
  user: IUser
}

/**
 * Banner of the all Profile route segments (image and fullname)
 */
const ProfileBanner = async ({ user }: IProps) => {

  const imgPlaceholder = user.image ? user.image : "https://st3.depositphotos.com/13159112/17145/v/450/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg"
  if(!user)
    redirect('/sign-in')

  return (
    <div className={style.wrapper}>
      <div className={style.avatarWrapper}>
        <img src={imgPlaceholder} alt="avatar" />
      </div>
      <div className={style.text}>
        <span>{user.lastname}  {user.firstname}</span>
        <p>Your account is ready, {user.email}</p>
      </div>
    </div>
  )
}

export default ProfileBanner;