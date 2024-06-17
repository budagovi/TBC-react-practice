'use client'
// --- style
import style from '../SignInUpForm.module.css'
// --- interfaces
import { ISignUpFormData } from '@/src/lib/types/forms';
// --- UI
import CustomSelect from '@/src/UI/Input Fields/Select/CustomSelect';
import Input from '@/src/UI/Input Fields/Input/Input';
import DateInput from '@/src/UI/Input Fields/Date/DateInput';
// --- next-internationalization api
import { useCurrentLocale, useScopedI18n } from '@/src/lib/next-internationalization/client';
// --- utils/validators
import { nameValidatorFn, genderValidator, dobValidator } from '@/src/lib/validators';
// --- react api
import { ChangeEvent, Dispatch, SetStateAction, memo } from 'react';

interface IProps {
  currSlide: number,
  firstnameValue: string,
  lastnameValue: string,
  dobValue: number | null,
  genderValue: string | null,
  stateDispatch: Dispatch<SetStateAction<ISignUpFormData>>,
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void,
  formSubmitted?: boolean
}

/**
 * Part of Sign-In form component ( should not be used in other components! )
 * - first name
 * - last name
 * - date of birth
 * - gender
 */
const PersonalDetails = memo(function
  PersonalDetails({
    currSlide,
    firstnameValue,
    lastnameValue,
    dobValue,
    genderValue,
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
        validate={nameValidatorFn(t('firstname')).validateFn}
        errorMsgs={nameValidatorFn(t('firstname')).errorMsgs(locale)}
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
        validate={nameValidatorFn(t('lastname')).validateFn}
        errorMsgs={nameValidatorFn(t('lastname')).errorMsgs(locale)}
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