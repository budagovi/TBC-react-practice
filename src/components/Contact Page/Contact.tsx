// *
// * Content of Contact Page
// *

// --- CSS
import style from './Contact.module.css';
// --- Components
import ContactForm from './ContactForm';
import EnvelopeIcon from '../icons/Envelope';
import TelephoneIcon from '../icons/Telephone';
// --- next-internationalization api
import { getScopedI18n } from '@/src/lib/next-internationalization/server';

const Contact = async () => {

  const t = await getScopedI18n('contact page.info')

  return (
    <div className={style.wrapper}>

      {/*   -=-=-=- Contact Details -=-=-=-   */}
      <div className={style.gridCell}>
        <aside className={style.details}>
          <section>
            <div className={style.iconDetail}>
              <div className={style.iconWrapper}>
                <TelephoneIcon />
              </div>
              <span>{t('call to us')}</span>
            </div>
            <span>{t('we are avail-')}</span>
            <span>{t('phone')}: +123 45 67 89</span>
          </section>
          <hr />
          <section>
            <div className={style.iconDetail}>
              <div className={style.iconWrapper}>
                <EnvelopeIcon />
              </div>
              <span>{t('write to us')}</span>
            </div>
            <span>{t('fill out our for-')}</span>
            <span>{t('emails')}: aurora-store@example.com</span>
            <span>{t('emails')}: aurora-support@example.com</span>
          </section>
        </aside>
      </div>

      {/*   -=-=-=- Contact Form -=-=-=-   */}
      <div className={style.gridCell}>
        <ContactForm />
      </div>

    </div>
  )
}

export default Contact;