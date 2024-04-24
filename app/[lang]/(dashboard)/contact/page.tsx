import Contact from '@/components/Contact Page/Contact';
import { getDictionary } from '@/dictionaries/dictionary';
import { Locale } from '@/i18n.config';

const ContactPage = async ({ params: { lang } }: { params: { lang: Locale } }) => {

  const { contactPage: dict } = await getDictionary(lang);
  
  return <><Contact dict={dict}/></>

}

export default ContactPage;