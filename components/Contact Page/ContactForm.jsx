import style from './ContactForm.module.css';

const ContactForm = () => {
  return (
    <form action="#" className={style.wrapper}>
      <div className={style.formControl}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" placeholder='John'/>
      </div>
      <div className={style.formControl}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder='my-email@example.com'/>
      </div>
      <div className={style.formControl}>
        <label htmlFor="subject">Subject:</label>
        <input type="text" id="subject" placeholder='Purchase Status'/>
      </div>
      <div className={style.formControl}>
        <label htmlFor="msg">Message:</label>
        <textarea id="msg" cols="30" rows="8" placeholder='Your message'/>
      </div>
      <button type="submit">send message</button>
    </form>
  )
}

export default ContactForm;