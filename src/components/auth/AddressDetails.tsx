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
import { useScopedI18n } from '@/src/locales/client';

interface IProps {
  currSlide: number,
  mobileValue: string,
  addressValue: string,
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

const AddressDetails = memo(function
  AddressDetails({
    currSlide,
    mobileValue,
    addressValue,
    changeHandler
  }: IProps) {

  const t = useScopedI18n('register page')

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
        value={mobileValue}
        onChange={changeHandler}
      />

      {/* Address Field*/}
      <Input
        label={t('address')}
        type='text'
        name='address'
        placeholder={t('address')}
        value={addressValue}
        onChange={changeHandler}
      />

    </div>
  )
})

export default AddressDetails