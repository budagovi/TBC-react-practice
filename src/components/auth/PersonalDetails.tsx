'use client'

import { ChangeEvent, Dispatch, SetStateAction, memo } from 'react';
// *
// * Part of Sign-In Form (User's Personal Information)
// *

// --- style
import style from './AuthForm.module.css';
// --- interfaces
import { ISignUpFormData } from './SignUpForm';
// --- UI
import CustomSelect from '@/src/UI/Input Fields/Select/CustomSelect';
import Input from '@/src/UI/Input Fields/Input/Input';
import DateInput from '@/src/UI/Input Fields/Date/DateInput';
// --- next-internationalization api
import { useCurrentLocale, useScopedI18n } from '@/src/locales/client';
import { IValidator } from '@/src/utilities/validators';

interface IProps {
  currSlide: number,
  firstnameValue: string,
  firstnameValidator: IValidator<string>
  lastnameValue: string,
  lastnameValidator: IValidator<string>
  dobValue: number | null,
  dobValidator: IValidator<number>,
  genderValue: string | null,
  genderValidator: IValidator<string>,
  stateDispatch: Dispatch<SetStateAction<ISignUpFormData>>,
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void,
  formSubmitted?: boolean
}

const PersonalDetails = memo(function
  PersonalDetails({
    currSlide,
    firstnameValue,
    firstnameValidator,
    lastnameValue,
    lastnameValidator,
    dobValue,
    dobValidator,
    genderValue,
    genderValidator,
    stateDispatch,
    changeHandler,
    formSubmitted
  }: IProps) {

  // -=-=-=- Internationalization -=-=-=-

  const t = useScopedI18n('/sign-up')
  const locale = useCurrentLocale()

  return (
    <div className={`
      ${style.slideShown} 
      ${currSlide === 0 ? style.slideHidden : null} 
      ${style.embla__slide}
    `}>

      {/* FirstName Field*/}
      <Input
        label={t('firstname')}
        placeholder={t('firstname')}
        type='text'
        name='firstname' // id
        // for controlling input
        value={firstnameValue}
        onChange={changeHandler}
        // validations
        validate={firstnameValidator.validateFn}
        errorMsgs={firstnameValidator.errorMsgs(locale)}
        isRequired={true}
        formSubmitted={formSubmitted}
      />

      {/* LastName Field */}
      <Input
        label={t('lastname')}
        type='text'
        name='lastname' // id
        placeholder={t('lastname')}
        // for controlling input
        value={lastnameValue}
        onChange={changeHandler}
        // validations
        validate={lastnameValidator.validateFn}
        errorMsgs={lastnameValidator.errorMsgs(locale)}
        isRequired={true}
        formSubmitted={formSubmitted}
      />

      <div className={style.twoInputs}>

        {/* Date of Birth Field */}
        <DateInput
          label={t('dob')}
          placeholder={t('dob')}
          name='dob'
          value={dobValue}
          onChange={(dateNum) => {
            stateDispatch((prevState) => (
              {
                // modifying property that corresponds to trigerring input field and copy the rest
                ...prevState,
                dobMilSecs: dateNum,
              }
            ));
          }}
          validate={dobValidator.validateFn}
          errorMsgs={dobValidator.errorMsgs(locale)}
          isRequired={true}
          formSubmitted={formSubmitted}
        />

        {/* Gender Field */}
        <CustomSelect
          label={t('gender')}
          placeholder={t('gender')}
          value={genderValue}
          options={[
            { value: 'male', label: <span>{t('male')}</span> },
            { value: 'female', label: <span>{t('female')}</span> }
          ]}
          onChange={(newGender) => {
            stateDispatch((prevState) => (
              {
                // modifying property that corresponds to trigerring input field and copy the rest
                ...prevState,
                gender: newGender
              }
            ));
          }}
          validate={genderValidator.validateFn}
          errorMsgs={genderValidator.errorMsgs(locale)}
          isRequired={true}
          formSubmitted={formSubmitted}
        />

      </div>

    </div>
  )
})

export default PersonalDetails