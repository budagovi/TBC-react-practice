import EnvelopeIcon from '../Icons/Envelope';
import TelephoneIcon from '../Icons/Telephone';
import LocationIcon from '../Icons/Location';
import style from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={style.wrapper}>
      <section className={style.links}>
        <span>Contact</span>
        <div className={style.contactLine}>
          <EnvelopeIcon className={style.icon}/>
          <a href='#'>aurora-store@example.com</a>
        </div>
        <div className={style.contactLine}>
          <TelephoneIcon className={style.icon}/>
          <a href='#'>+123 45 67 89</a>
        </div>
        <div className={style.contactLine}>
          <LocationIcon className={style.icon}/>
          <a href='#'>City, Example Street</a>
        </div>
      </section>
      <section className={style.links}>
        <span>Fast Links</span>
        <a href='#'>About Us</a>
        <a href='#'>Contact Us</a>
        <a href='#'>Plants Store</a>
      </section>
      <section className={style.links}>
        <span>Information</span>
        <a href='#'>Terms and Conditions</a>
        <a href='#'>Privacy Policy</a>
      </section>
    </footer>
  )
}

export default Footer;