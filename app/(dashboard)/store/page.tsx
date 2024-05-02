import Store from '@/components/store/Store';
import { getDictionary } from '@/dictionaries/dictionary';
import { Locale } from '@/i18n.config';
import { cookies } from 'next/headers';

const StorePage = async () => {

  const lang = cookies().get('locale')
  const { storePage: dict } = await getDictionary(lang);
  
  return <><Store dict={dict}/></>

}

export default StorePage;