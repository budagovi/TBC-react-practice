// *
// * Profile Page Content
// *

// --- CSS
import style from './Profile.module.css';
// --- Components
import EditProfile from './EditProfile';
// --- next/react api
// --- next-internationalization api
import { getScopedI18n } from '@/src/lib/next-internationalization/server';

const Profile = async () => {

  const t = await getScopedI18n('profile page.profile nav')

  return (
    <div className={style.wrapper}>
      {/*   -=-=-=- Profile Page Navigation -=-=-=-   */}
      <aside>
        <span>{t('manage my accaunt')}</span>
        <ul>
          <li>{t('my profile')}</li>
          <li>{t('address book')}</li>
          <li>{t('my payment options')}</li>
        </ul>
        <span>{t('my orders')}</span>
        <ul>
          <li>{t('my returns')}</li>
          <li>{t('my cancelations')}</li>
        </ul>
      </aside>
      <section>
        <EditProfile />
      </section>
    </div>
  )
}

export default Profile;