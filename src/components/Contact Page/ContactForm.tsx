'use client'

// *
// * Contact Form
// *

// --- CSS
import style from './ContactForm.module.css';
// --- UI
import Input from '@/src/UI/Input Fields/Input';
import TextArea from '@/src/UI/Input Fields/TextArea';
import Button from '@/src/UI/Button/Button';
// --- next/react api

// --- next-internationalization api
import { useScopedI18n } from '@/src/locales/client';

const ContactForm = () => {

  const t = useScopedI18n('contact page.form')
  // submitHandler logic

  return (
    <form className={style.wrapper}>
      <div className={style.textInputs}>
        <Input
          type='text'
          placeholder={t('your name')}
          name='name'
          required
        />
        <Input
          type='email'
          placeholder={t('your email')}
          name='email'
          required
        />
        <Input
          type='text'
          placeholder={t('your phone')}
          name='mobile'
          required
        />
      </div>
      <TextArea
        name='message'
        placeholder={t('your msg')}
        rows={10}
      />
      <Button type='submit'>{t('send msg')}</Button>
    </form>
  )
}

export default ContactForm;