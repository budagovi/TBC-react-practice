import Contact from '@/src/components/Contact Page/Contact';
import { getDictionary } from '@/src/dictionaries/dictionary';
import { Locale } from '@/i18n.config';
import { cookies } from 'next/headers';

const ContactPage = async () => {

  const lang = cookies().get('locale')

  const { contactPage: dict } = await getDictionary(lang);
  
  return <><Contact dict={dict}/></>

}

export default ContactPage;