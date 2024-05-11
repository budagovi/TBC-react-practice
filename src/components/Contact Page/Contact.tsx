// *
// * Content of Contact page
// *

// --- CSS
import style from './Contact.module.css';
// --- Components
import ContactForm from './ContactForm';
import EnvelopeIcon from '../../icons/Envelope';
import TelephoneIcon from '../../icons/Telephone';

const Contact = ({ dict }: { dict: any }) => {

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
              <span>call to us</span>
            </div>
            <span>We are available 24/7, 7 days a week.</span>
            <span>Phone: +123 45 67 89</span>
          </section>
          <hr />
          <section>
            <div className={style.iconDetail}>
              <div className={style.iconWrapper}>
                <EnvelopeIcon />
              </div>
              <span>write to us</span>
            </div>
            <span>Fill out our form and we will contact you within 24 hours.</span>
            <span>Emails: aurora-store@example.com</span>
            <span>Emails: aurora-support@example.com</span>
          </section>
        </aside>
      </div>

      {/*   -=-=-=- Contact Form -=-=-=-   */}
      <div className={style.gridCell}>
        <ContactForm dict={dict} />
      </div>

    </div>
  )
}

export default Contact;