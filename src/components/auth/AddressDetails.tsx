'use client'

import { ChangeEvent, memo } from 'react';
// *
// * Part of Sign-In Form (User's Address Information)
// *

// --- style
import style from './AuthForm.module.css';
// --- UI
import Input from '@/src/UI/Input Fields/Input/Input';
// --- next-internationalization api
import { useCurrentLocale, useScopedI18n } from '@/src/locales/client';
// --- utils/validators
import { addressValidator, mobileValidator } from '@/src/utilities/validators';


interface IProps {
  currSlide: number,
  mobileValue: string,
  addressValue: string,
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void,
  formSubmitted?: boolean
}

const AddressDetails = memo(function
  AddressDetails({
    currSlide,
    mobileValue,
    addressValue,
    changeHandler,
    formSubmitted
  }: IProps) {

  // -=-=-=- Internationalization -=-=-=-

  const t = useScopedI18n('/sign-up')
  const locale = useCurrentLocale();

  return (
    <div className={`
      ${style.slideShown} 
      ${currSlide === 1 ? style.slideHidden : null} 
      ${style.embla__slide}
    `}>

      {/* Mobile Field*/}
      <Input
        label={t('mobile')}
        type='text'
        name='mobile'
        placeholder={t('mobile')}
        // for controlling the input
        value={mobileValue}
        onChange={changeHandler}
        // validations
        validate={mobileValidator.validateFn}
        errorMsgs={mobileValidator.errorMsgs(locale)}
        isRequired={true}
        formSubmitted={formSubmitted}
      />

      {/* Address Field*/}
      <Input
        label={t('address')}
        type='text'
        name='address'
        placeholder={t('address')}
        // for controlling the input
        value={addressValue}
        onChange={changeHandler}
        // validations
        validate={addressValidator.validateFn}
        errorMsgs={addressValidator.errorMsgs(locale)}
        isRequired={true}
        formSubmitted={formSubmitted}
      />

    </div>
  )
})

export default AddressDetails