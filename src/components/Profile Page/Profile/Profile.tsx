'use client'
// --- style
import style from './Profile.module.css';
// --- types
import type { IUser } from '@/src/lib/types/entities';
// --- compoennts
import EditProfileForm from './EditProfileForm';
import ChangePasswordForm from './ChangePasswordForm';

interface IProps {
  user: IUser
}

/**
 * Contains Profile editor form and password change form
 * @param user 
 */
const EditProfile = ({ user }: IProps) => {

  return (
    <div className={style.wrapper}>
      <EditProfileForm user={user} />
      <ChangePasswordForm user={user} />
    </div>
  )
}

export default EditProfile;