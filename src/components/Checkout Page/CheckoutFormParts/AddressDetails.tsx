'use client'
import { ChangeEvent, memo } from 'react';
import style from '../CheckoutForm.module.css';
import Input from '@/src/UI/Input Fields/Input/Input';
import { isRequiredFieldString, mobileValidator } from '@/src/lib/validators';
import { useCurrentLocale } from '@/src/lib/next-internationalization/client';

interface IProps {
  currSlide: number,
  mobileValue: string,
  addressValue: string,
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void,
  formSubmitted?: boolean
}

/**
 * Part of checkout form component ( should not be used in other components! )
 * - mobile
 * - address
 */
const AddressDetails = memo(function
  AddressDetails({
    currSlide,
    mobileValue,
    addressValue,
    changeHandler,
    formSubmitted
  }: IProps) {

    const locale = useCurrentLocale();
    const addressIsRequired = isRequiredFieldString('address');

  return (
    <div className={`
      ${style.slideShown} 
      ${currSlide === 0 ? style.slideHidden : null} 
      ${style.embla__slide}
    `}>
      {/* Mobile Field*/}
      <Input
        label='mobile'
        type='text'
        name='mobile'
        placeholder='mobile'
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
        label='address'
        type='text'
        name='address'
        placeholder='address'
        // for controlling the input
        value={addressValue}
        onChange={changeHandler}
        // validations
        validate={addressIsRequired.validateFn}
        errorMsgs={addressIsRequired.errorMsgs(locale)}
        isRequired={true}
        formSubmitted={formSubmitted}
      />
    </div>
  )
})

export default AddressDetails;