import ScrollUp from '@/src/UI/ScrollUp';
import Store from '@/src/components/store/Store';
import { getDictionary } from '@/src/dictionaries/dictionary';
import { cookies } from 'next/headers';

const StorePage = async () => {

  const lang = cookies().get('locale')
  const { storePage: dict } = await getDictionary(lang);

  return <>
    <Store dict={dict} />
    <ScrollUp />
  </>

}

export default StorePage;