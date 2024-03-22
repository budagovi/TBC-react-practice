import EnvelopeIcon from '../../Icons/Envelope';
import TelephoneIcon from '../../Icons/Telephone';
import LocationIcon from '../../Icons/Location';
import ContactForm from './ContactForm';
import style from './Contact.module.css';

const Contact = () => {
  return (
    <div className={style.wrapper}>
      <h2>Send us a message</h2>
      <h2>How to reach us</h2>
      <ContactForm />
      <section className={style.contactStatic}>
        <div className={style.contactItem}>
          <EnvelopeIcon className={style.icon} />
          <div className={style.contactItemText}>
            <span>Email:</span>
            <span>aurora-store@example.com</span>
            <span>aurora-support@example.com</span>
          </div>
        </div>
        <div className={style.contactItem}>
          <TelephoneIcon className={style.icon} />
          <div className={style.contactItemText}>
            <span>Telephone:</span>
            <span>+123 45 67 89</span>
          </div>
        </div>
        <div className={style.contactItem}>
          <LocationIcon className={style.icon} />
          <div className={style.contactItemText}>
            <span>Location:</span>
            <span>City, Example Street</span>
            <span>Country</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact;