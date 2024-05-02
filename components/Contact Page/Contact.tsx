import EnvelopeIcon from '../../icons/Envelope';
import TelephoneIcon from '../../icons/Telephone';
import LocationIcon from '../../icons/Location';
import ContactForm from './ContactForm';
import style from './Contact.module.css';

const Contact = ({ dict }: { dict: any }) => {

  return (
    <div className={style.wrapper}>
      <h2>{dict.form.title}</h2>
      <h2>{dict.info.title}</h2>
      <ContactForm dict={dict.form}/>
      <section className={style.contactStatic}>
        <div className={style.contactItem}>
          <EnvelopeIcon className={style.icon} />
          <div className={style.contactItemText}>
            <span>{dict.info.email}:</span>
            <span>aurora-store@example.com</span>
            <span>aurora-support@example.com</span>
          </div>
        </div>
        <div className={style.contactItem}>
          <TelephoneIcon className={style.icon} />
          <div className={style.contactItemText}>
            <span>{dict.info.telephone}:</span>
            <span>+123 45 67 89</span>
          </div>
        </div>
        <div className={style.contactItem}>
          <LocationIcon className={style.icon} />
          <div className={style.contactItemText}>
            <span>{dict.info.location}:</span>
            <span>{dict.info.address}</span>
            <span>{dict.info.country}</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact;