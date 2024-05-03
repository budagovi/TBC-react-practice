import Profile from '@/src/components/Profile Page/Profile';
import { getDictionary } from '@/src/dictionaries/dictionary';
import { Locale } from '@/i18n.config';
import { cookies } from 'next/headers';

const ProfilePage = async () => {

  const lang = cookies().get('locale')
  const dict = await getDictionary(lang)
  return <><Profile dict={dict.profilePage}/></>

}

export default ProfilePage;