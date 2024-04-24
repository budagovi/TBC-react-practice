import { getDictionary } from '@/app/[lang]/dictionaries';
import style from './ContactForm.module.css';
const ContactForm = async ({ lang }) => {

  const dict = await getDictionary(lang)

  return (
    <form action="#" className={style.wrapper}>
      <div className={style.formControl}>
        <label htmlFor="name">{dict.c_name}:</label>
        <input type="text" id="name" placeholder='John' />
      </div>
      <div className={style.formControl}>
        <label htmlFor="email">{dict.p_email}:</label>
        <input type="email" id="email" placeholder='my-email@example.com' />
      </div>
      <div className={style.formControl}>
        <label htmlFor="subject">{dict.c_subject}:</label>
        <input type="text" id="subject" placeholder='Purchase Status' />
      </div>
      <div className={style.formControl}>
        <label htmlFor="msg">{dict.c_message}:</label>
        <textarea id="msg" cols="30" rows="8" placeholder='Your message' />
      </div>
      <button type="submit">{dict.c_button}</button>
    </form>
  )
}

export default ContactForm;
