// *
// * Contact Form
// *

// --- CSS
import style from './ContactForm.module.css';
// --- UI
import Input from '@/src/UI/Input Fields/Input';
import TextArea from '@/src/UI/Input Fields/TextArea';
import Button from '@/src/UI/Button/Button';

const ContactForm = ({ }: { dict: any }) => {

  // submitHandler logic

  return (
    <form className={style.wrapper}>
      <div className={style.textInputs}>
        <Input
          type='text'
          placeholder='Your Name'
          name='name'
          required
        />
        <Input
          type='email'
          placeholder='Your Email'
          name='email'
          required
        />
        <Input
          type='text'
          placeholder='Your Phone'
          name='mobile'
          required
        />
      </div>
      <TextArea
        name='message'
        placeholder='Your Message'
        rows={10}
      />
      <Button type='submit'>Send Message</Button>
    </form>
  )
}

export default ContactForm;