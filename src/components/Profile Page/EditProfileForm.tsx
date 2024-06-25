// --- style
import style from './EditProfileForm.module.css';
// --types
import type { IUser } from '@/src/lib/types/entities';
import type { IProfileEditFormData } from '@/src/lib/types/forms';
// --- next-international
import { useCurrentLocale, useScopedI18n } from '@/src/lib/next-internationalization/client';
// --- dayjs
import dayjs from 'dayjs'
// --- antd
import { App } from 'antd';
// --- react api
import { ChangeEvent, FormEvent, useCallback, useState, useTransition } from 'react';
// --- utils
import formatPhoneNumber from '@/src/utilities/helpers/formatPhoneNumber';
import { dobValidator, genderValidator, mobileValidator, nameValidatorFn } from '@/src/lib/validators';
// --- UI
import Input from '@/src/UI/Input Fields/Input/Input';
import DateInput from '@/src/UI/Input Fields/Date/DateInput';
import CustomSelect from '@/src/UI/Input Fields/Select/CustomSelect';
import Button from '@/src/UI/Button/Button';
// --- server actions
import { updateUserSession } from '@/src/server actions/auth';

interface IProps {
  user: IUser
}

const EditProfileForm = ({ user }: IProps) => {

  const t = useScopedI18n('/profile.edit form')
  const locale = useCurrentLocale();

  const { message } = App.useApp();

  // form submit logic

  const initialValue: IProfileEditFormData = {
    firstname: user.firstname,
    lastname: user.lastname,
    gender: user.gender,
    dobMilSecs: dayjs(user.dob).toDate().getTime(),
    mobile: user.mobile
  }

  const [values, setValues] = useState<IProfileEditFormData>(initialValue)
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = (name === 'mobile') ? formatPhoneNumber(value) : value;

    setValues((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  }, []);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {

      // check fields validity and highlight invalid inputs
      if (
        nameValidatorFn('').validateFn(values.firstname) >= 0 ||
        nameValidatorFn('').validateFn(values.lastname) >= 0 ||
        dobValidator.validateFn(values.dobMilSecs) >= 0 ||
        genderValidator.validateFn(values.gender) >= 0 ||
        mobileValidator.validateFn(values.mobile) >= 0
      ) return;

      // valid form logic
      setIsSubmitting(true)
      const key = 'updatable';
      message.open({
        key,
        type: 'loading',
        content: t('loading message'),
        duration: 3600
      })

      setTimeout(async () => {
        try {
          const response = await fetch('/api/users/' + user.id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ...values
            })
          })

          if (response.ok) {
            const editedUser = await response.json();
            message.open({
              key,
              type: 'success',
              content: t('success message'),
              duration: 5
            })

            await updateUserSession(editedUser)
            return;
          }

          throw new Error('something went wrong')
        } catch (e) {
          message.open({
            key,
            type: 'error',
            content: t('failure message'),
            duration: 2
          })
          console.log(e) // "something went wrong"
        } finally {
          setIsSubmitting(false)
        }
      }, 1000)
    })
  }

  return (
    <form className={style.wrapper} onSubmit={submitHandler} data-state={`${isSubmitting ? 'pending' : ''}`}>
      <h3>{t('title')}</h3>
      {/* FirstName Field*/}
      <Input
        label={t('firstname')}
        placeholder={t('firstname')}
        type='text'
        name='firstname' // id
        // for controlling input
        value={values.firstname}
        onChange={changeHandler}
        // validations
        validate={nameValidatorFn(t('firstname')).validateFn}
        errorMsgs={nameValidatorFn(t('firstname')).errorMsgs(locale)}
        isRequired={true}
        formSubmitted={isPending}
      />

      {/* LastName Field */}
      <Input
        label={t('lastname')}
        type='text'
        name='lastname' // id
        placeholder={t('lastname')}
        // for controlling input
        value={values.lastname}
        onChange={changeHandler}
        // validations
        validate={nameValidatorFn(t('lastname')).validateFn}
        errorMsgs={nameValidatorFn(t('lastname')).errorMsgs(locale)}
        isRequired={true}
        formSubmitted={isPending}
      />

      {/*   -=-=-=- Mobile -=-=-=-   */}
      <Input
        label={t('mobile')}
        type='text'
        name='mobile'
        placeholder={t('mobile')}
        // for controlling the input
        value={values.mobile}
        onChange={changeHandler}
        // validations
        validate={mobileValidator.validateFn}
        errorMsgs={mobileValidator.errorMsgs(locale)}
        isRequired={true}
        formSubmitted={isPending}
      />

      <div className={style.coupleInput}>
        {/* Date of Birth Field */}
        <DateInput
          label={t('dob')}
          placeholder={t('dob')}
          name='dob'
          value={values.dobMilSecs}
          onChange={(dateNum) => {
            setValues((prevState) => (
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
          formSubmitted={isPending}
        />
        {/* Gender Field */}
        <CustomSelect
          label={t('gender')}
          placeholder={t('gender')}
          value={values.gender}
          options={[
            { value: 'male', label: <span>{t('male')}</span> },
            { value: 'female', label: <span>{t('female')}</span> }
          ]}
          onChange={(newGender) => {
            setValues((prevState) => (
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
          formSubmitted={isPending}
        />
      </div>
      <div className={style.actions}>
        <button
          type='button'
          className={style.cancel}
          onClick={() => setValues(initialValue)}
        >
          {t('cancel')}
        </button>
        <Button type='submit'>{t('save')}</Button>
      </div>
    </form>
  )
}

export default EditProfileForm;