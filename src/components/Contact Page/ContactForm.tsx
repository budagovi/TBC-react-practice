'use client'
// --- style
import style from './ContactForm.module.css';
// --- UI
import Input from '@/src/UI/Input Fields/Input/Input';
import TextArea from '@/src/UI/Input Fields/Input/TextArea';
import Button from '@/src/UI/Button/Button';
// --- next-internationalization api
import { useCurrentLocale, useScopedI18n } from '@/src/lib/next-internationalization/client';
// --- react api
import { ChangeEvent, FormEvent, useCallback, useState, useTransition } from 'react';
// --- validators
import { emailValidator, isRequiredFieldString, mobileValidator } from '@/src/lib/validators';
// --- types
import { IContactFormData } from '@/src/lib/types/forms';
// --- utils
import isContactFormValid from '@/src/utilities/checkers/isContactFormValid';
import formatPhoneNumber from '@/src/utilities/helpers/formatPhoneNumber';
// --- antd
import { App } from 'antd';

const initialFormValue: IContactFormData = {
  name: '',
  email: '',
  mobile: '',
  message: ''
}

/**
 * Form for sending email on Contact page
 */
const ContactForm = () => {

  const t = useScopedI18n('/contact.form')
  const currLocale = useCurrentLocale();

  const [values, setValues] = useState(initialFormValue);
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reset, setReset] = useState(false);

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => (
      {
        ...prevState,
        [name]: value,
      }
    ));
  }, []);

  const { message } = App.useApp();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {

      // check form validity
      if (!isContactFormValid(values))
        return;
      setIsSubmitting(true)
      const key = 'random key';
      message.open({
        type: 'loading',
        content: 'proceccing',
        duration: 3,
        key
      })

      setTimeout(() => {
        message.open({
          type: 'success',
          content: 'email received',
          duration: 2,
          key
        })
        setIsSubmitting(false)
        setValues(initialFormValue)
        setReset(true);
        setTimeout(() => setReset(false), 1);
      }, 3000)
    })
  }

  return (
    <form className={`${style.wrapper} ${isSubmitting ? style.loading : ''}`} onSubmit={submitHandler}>

      <div className={style.textInputs}>
        <Input
          label={t('name')}
          type='text'
          placeholder={t('name')}
          name='name'
          value={values.name}
          onChange={changeHandler}
          isRequired={true}
          validate={isRequiredFieldString('Name').validateFn}
          errorMsgs={isRequiredFieldString(t('name')).errorMsgs(currLocale)}
          formSubmitted={isPending}
          reset={reset}
        />
        <Input
          label={t('email')}
          type='text'
          placeholder={t('email')}
          name='email'
          value={values.email}
          onChange={changeHandler}
          isRequired={true}
          validate={emailValidator.validateFn}
          errorMsgs={emailValidator.errorMsgs(currLocale)}
          formSubmitted={isPending}
          reset={reset}
        />
        <Input
          label={t('phone')}
          type='text'
          placeholder='+995 5XX XX XX '
          name='mobile'
          value={formatPhoneNumber(values.mobile)}
          onChange={changeHandler}
          isRequired={true}
          validate={mobileValidator.validateFn}
          errorMsgs={mobileValidator.errorMsgs(currLocale)}
          formSubmitted={isPending}
          reset={reset}
        />
      </div>
      <TextArea
        label={t('msg')}
        name='message'
        placeholder={t('msg')}
        rows={10}
        value={values.message}
        onChange={changeHandler}
        isRequired={true}
        validate={isRequiredFieldString('text').validateFn}
        errorMsgs={isRequiredFieldString('text').errorMsgs(currLocale)}
        formSubmitted={isPending}
        reset={reset}
      />
      <Button type='submit'>{t('msg')}</Button>
    </form>
  )
}

export default ContactForm;