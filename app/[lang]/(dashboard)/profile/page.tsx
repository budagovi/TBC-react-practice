import Profile from '@/components/Profile Page/Profile';
import { getDictionary } from '@/dictionaries/dictionary';
import { Locale } from '@/i18n.config';

const ProfilePage = async ({params: {lang}}: {params: {lang: Locale}}) => {

  const dict = await getDictionary(lang)
  return <><Profile dict={dict.profilePage}/></>

}

export default ProfilePage;