'use client'

import { ChangeEvent, memo } from 'react';
// *
// * Part of Sign-In Form (User's Credentials)
// *

// --- style
import style from './AuthForm.module.css';
// --- UI
import Input from '@/src/UI/Input Fields/Input/Input';
import PasswordInput from '@/src/UI/Input Fields/Password/Password';
import CheckBox from '@/src/UI/Input Fields/CheckBox/CheckBox';
// --- next-internationalization api
import { useCurrentLocale, useScopedI18n } from '@/src/locales/client';
// --- react/nextjs api
import Link from 'next/link';
// --- utils/validators
import {
  emailValidator,
  passwordValidator,
  confirmPasswordValidator
} from '@/src/utilities/validators';

interface IProps {
  currSlide: number,
  emailValue: string,
  passwordValue: string,
  confirmValue: string,
  agreeValue: boolean,
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void,
  formSubmitted: boolean
}

const Credentials = memo(function
  Credentials({
    currSlide,
    emailValue,
    passwordValue,
    confirmValue,
    agreeValue,
    changeHandler,
    formSubmitted
  }: IProps) {

  // -=-=-=- Internationalization -=-=-=-

  const t = useScopedI18n('/sign-up')
  const locale = useCurrentLocale()

  return (
    <div className={`
      ${style.slideShown} 
      ${currSlide === 2 ? style.slideHidden : null} 
      ${style.embla__slide}
    `}>

      {/* Email Field */}
      <Input
        label={t('email')}
        type='text'
        name='email'
        placeholder={t('email')}
        value={emailValue}
        onChange={changeHandler}
        // validations
        validate={emailValidator.validateFn}
        errorMsgs={emailValidator.errorMsgs(locale)}
        isRequired={true}
        formSubmitted={formSubmitted}
      />

      {/* Password Field */}
      <PasswordInput
        label={t('password')}
        name='password'
        placeholder={t('password')}
        value={passwordValue}
        onChange={changeHandler}
        // validations
        validate={passwordValidator.validateFn}
        errorMsgs={passwordValidator.errorMsgs(locale)}
        isRequired={true}
        formSubmitted={formSubmitted}
      />

      {/* Confirm Password Field */}
      <PasswordInput
        label={t('confirm')}
        name='confirm'
        placeholder={t('confirm')}
        value={confirmValue}
        onChange={changeHandler}
        // validations
        validate={confirmPasswordValidator(passwordValue).validateFn}
        errorMsgs={confirmPasswordValidator(passwordValue).errorMsgs(locale)}
        isRequired={true}
        formSubmitted={formSubmitted}
      />

      {/* Terms and Conditions Checkbox */}
      <CheckBox
        label={<>{t('agree to terms')}<Link href={'/sign-up'}>{t('tac')}</Link></>}
        name='agree'
        checked={agreeValue}
        onChange={changeHandler}
      />

    </div>
  )
})

export default Credentials;