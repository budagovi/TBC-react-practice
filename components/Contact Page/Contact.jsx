import EnvelopeIcon from '../../Icons/Envelope';
import TelephoneIcon from '../../Icons/Telephone';
import LocationIcon from '../../Icons/Location';
import ContactForm from './ContactForm';
import style from './Contact.module.css';
import { getDictionary } from '@/app/[lang]/dictionaries';

const Contact = async ({lang}) => {

  const dict = await getDictionary(lang)
  return (
    <div className={style.wrapper}>
      <h2>{dict.c_title}</h2>
      <h2>{dict.c_reach}</h2>
      <ContactForm lang={lang}/>
      <section className={style.contactStatic}>
        <div className={style.contactItem}>
          <EnvelopeIcon className={style.icon} />
          <div className={style.contactItemText}>
            <span>{dict.p_email}:</span>
            <span>aurora-store@example.com</span>
            <span>aurora-support@example.com</span>
          </div>
        </div>
        <div className={style.contactItem}>
          <TelephoneIcon className={style.icon} />
          <div className={style.contactItemText}>
            <span>{dict.c_telephone}:</span>
            <span>+123 45 67 89</span>
          </div>
        </div>
        <div className={style.contactItem}>
          <LocationIcon className={style.icon} />
          <div className={style.contactItemText}>
            <span>{dict.c_location}:</span>
            <span>{dict.address}</span>
            <span>{dict.c_country}</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact;