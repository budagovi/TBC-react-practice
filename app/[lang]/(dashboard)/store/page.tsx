import Store from '@/components/store/Store';
import { getDictionary } from '@/dictionaries/dictionary';
import { Locale } from '@/i18n.config';

const StorePage = async ({ params: { lang } }: { params: { lang: Locale } }) => {

  const { storePage: dict } = await getDictionary(lang);
  
  return <><Store dict={dict}/></>

}

export default StorePage;