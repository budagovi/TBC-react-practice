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
import Input from '@/src/UI/Input Fields/Input';
import DateInput from '@/src/UI/Input Fields/Date/DateInput';
// --- next-internationalization api
import { useScopedI18n } from '@/src/locales/client';

interface IProps {
  currSlide: number,
  firstnameValue: string,
  lastnameValue: string,
  dobValue: number | null,
  genderValue: string | null,
  stateDispatch: Dispatch<SetStateAction<ISignUpFormData>>,
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

const PersonalDetails = memo(function
  PersonalDetails({
    currSlide,
    firstnameValue,
    lastnameValue,
    dobValue,
    genderValue,
    stateDispatch,
    changeHandler
  }: IProps) {

  const t = useScopedI18n('register page')

  return (
    <div className={`
      ${style.slideShown} 
      ${currSlide === 0 ? style.slideHidden : null} 
      ${style.embla__slide}
    `}>

      {/* FirstName Field*/}
      <Input
        label={t('firstname')}
        type='text'
        name='firstname'
        placeholder={t('firstname')}
        value={firstnameValue}
        onChange={changeHandler}
        required
      />

      {/* LastName Field */}
      <Input
        label={t('lastname')}
        type='text'
        name='lastname'
        placeholder={t('lastname')}
        value={lastnameValue}
        onChange={changeHandler}
        required
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
        />

      </div>

    </div>
  )
})

export default PersonalDetails