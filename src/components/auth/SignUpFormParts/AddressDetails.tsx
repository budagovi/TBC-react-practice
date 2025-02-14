'use client'
// --- style
import style from '../SignInUpForm.module.css';
// --- UI
import Input from '@/src/UI/Input Fields/Input/Input';
// --- next-internationalization api
import { useCurrentLocale, useScopedI18n } from '@/src/lib/next-internationalization/client';
// --- utils/validators
import { addressValidator, cityValidator, mobileValidator } from '@/src/lib/validators';
// --- react api
import { ChangeEvent, memo } from 'react';

interface IProps {
  currSlide: number,
  mobileValue: string,
  cityValue: string,
  addressValue: string,
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void,
  formSubmitted?: boolean
}

/**
 * Part of Sign-In form component ( should not be used in other components! )
 * - mobile
 * - address
 */
const AddressDetails = memo(function
  AddressDetails({
    currSlide,
    mobileValue,
    cityValue,
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

      {/* City Field*/}
      <Input
        label={t('city')}
        type='text'
        name='city'
        placeholder={t('city')}
        // for controlling the input
        value={cityValue}
        onChange={changeHandler}
        // validations
        validate={cityValidator.validateFn}
        errorMsgs={cityValidator.errorMsgs(locale)}
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