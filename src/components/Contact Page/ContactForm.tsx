import style from './ContactForm.module.css';

const ContactForm = ({dict}: {dict:any}) => {
  return (
    <form action="#" className={style.wrapper}>
      <div className={style.formControl}>
        <label htmlFor="name">{dict.name}:</label>
        <input type="text" id="name" placeholder={dict.nameSpaceHolder}/>
      </div>
      <div className={style.formControl}>
        <label htmlFor="email">{dict.email}:</label>
        <input type="email" id="email" placeholder='my-email@example.com'/>
      </div>
      <div className={style.formControl}>
        <label htmlFor="subject">{dict.subject}:</label>
        <input type="text" id="subject" placeholder={dict.subjectSpaceHolder}/>
      </div>
      <div className={style.formControl}>
        <label htmlFor="msg">{dict.message}:</label>
        <textarea id="msg" cols={30} rows={8} placeholder={dict.messageSpaceHolder}/>
      </div>
      <button type="submit">{dict.btnText}</button>
    </form>
  )
}

export default ContactForm;