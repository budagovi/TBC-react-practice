// --- style
import style from '@/src/app/layouts.module.css';
import ProfileBanner from '@/src/components/Profile Page/ProfileBanner';
// --- components
import ProfileNav from '@/src/components/Profile Page/ProfileNav';
// --- jose-auth
import { getSession } from '@/src/lib/jose-auth/auth';
// --- types
import type { IUser } from '@/src/lib/types/entities';

interface IProps {
  children: React.ReactNode
}

const ProfileLayout = async({ children }: IProps) => {

  const { user }: { user: IUser } = await getSession();

  return (
    <div className={style.profile_layout} >
      <ProfileBanner user={user}/>
      <div className={style.profile_content}>
        <ProfileNav />
        <section>
          {children}
        </section>
      </div>
    </div>
  )
}

export default ProfileLayout;