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
import isContactFormValid from '@/src/utilities/checkers/isContactFormValid';
import formatPhoneNumber from '@/src/utilities/helpers/formatPhoneNumber';

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

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => (
      {
        ...prevState,
        [name]: value,
      }
    ));
  }, []);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {

      // check form validity
      if (!isContactFormValid(values))
        return;

      // open email client
    })

  }

  return (
    <form className={style.wrapper} onSubmit={submitHandler}>
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
          errorMsgs={isRequiredFieldString('Name').errorMsgs(currLocale)}
          formSubmitted={isPending}
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
        validate={isRequiredFieldString('Phone number').validateFn}
        errorMsgs={isRequiredFieldString('Phone number').errorMsgs(currLocale)}
        formSubmitted={isPending}
      />
      <Button type='submit'>{t('msg')}</Button>
    </form>
  )
}

export default ContactForm;