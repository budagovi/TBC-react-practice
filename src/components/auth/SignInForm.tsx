'use client'
// --- style
import style from './SignInUpForm.module.css';
// --- UI
import Input from '@/src/UI/Input Fields/Input/Input';
import PasswordInput from '@/src/UI/Input Fields/Password/Password';
import CheckBox from '@/src/UI/Input Fields/CheckBox/CheckBox';
import Button from '@/src/UI/Button/Button';
// --- nextjs/react api
import { ChangeEvent, FormEvent, useState, useCallback, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// --- next-internationalization api
import { useCurrentLocale, useScopedI18n } from '@/src/lib/next-internationalization/client';
// --- validators
import { isRequiredFieldString } from '@/src/lib/validators';
// --- antd
import { App } from 'antd';
// --- components
import Socials from './Socials';
import FormLabel from './FormLabel';
// --- types
import { ISignInFormData } from '@/src/lib/types/forms';
/// --- actions
import { login } from '@/src/server actions/auth';


const initialFormValue: ISignInFormData = {
  email: '',
  password: '',
  isRemembered: true
}

/**
 * Sign in form custom component
 */
const SignInForm = () => {

  // -=-=-=- Internationalization -=-=-=-

  const t = useScopedI18n('/sign-in')
  const locale = useCurrentLocale()

  // -=-=-=- Form Input Validators -=-=-=-

  const EmailValidator = isRequiredFieldString(t('email'))
  const PasswordValidator = isRequiredFieldString(t('password'))

  // -=-=-=- Form State -=-=-=-

  const [values, setValues] = useState(initialFormValue)
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { message } = App.useApp();
  const router = useRouter();


  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {

    const { name, value, type, checked } = e.target;
    setValues((prevState) => (
      {
        // modifying property that corresponds to trigerring input field and copy the rest
        ...prevState,
        [name]: type === 'checkbox' ? checked : value,
      }
    ));
  }, []);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {

      // check fields validity
      if (!values.email || !values.password)
        return;

      // if form is valid POST data to db
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

          const loginStatus = await login({
            email: values.email,
            password: values.password,
            isRemembered: values.isRemembered
          })

          if (loginStatus.success) {
            message.open({
              key,
              type: 'success',
              content: t('successfull login'),
              duration: 2
            })
            router.replace('/profile')
            window.location.reload();
            return;
          }

          let errorMsg = t('failed login')
          if (loginStatus.status === 401 || loginStatus.status === 404) {
            errorMsg = t('incorrect credentials')
          }

          message.open({
            key,
            type: 'error',
            content: errorMsg,
            duration: 2
          })

        } catch (e) {
          console.log(e)
        } finally {
          setIsSubmitting(false)
        }
      }, 1000)

    })
  }

  return (
    <form className={style.wrapper} onSubmit={submitHandler}>

      {/*   -=-=-=- Form Overlay (on pending) -=-=-=-   */}

      {isSubmitting && <div className={style.overlay}></div>}

      {/*   -=-=-=- Form Label -=-=-=-   */}

      <FormLabel
        title={t('title')}
        subtitle={t('Login to yo-')}
      />

      {/*   -=-=-=- Form Inputs -=-=-=-   */}

      <div className={style.inputs}>

        {/* Email */}
        <Input
          label={t('email')}
          type='text'
          name='email' // id
          placeholder={t('email')}
          value={values.email}
          onChange={changeHandler}
          validate={EmailValidator.validateFn}
          errorMsgs={EmailValidator.errorMsgs(locale)}
          isRequired={true}
          formSubmitted={isPending}
        />

        {/* Password */}
        <PasswordInput
          label={t('password')}
          type='password'
          name='password' // id
          placeholder={t('password')}
          value={values.password}
          onChange={changeHandler}
          validate={PasswordValidator.validateFn}
          errorMsgs={PasswordValidator.errorMsgs(locale)}
          isRequired={true}
          formSubmitted={isPending}
        />
      </div>

      {/*   -=-=-=- Form Actions -=-=-=-   */}

      <div className={style.actions}>
        <CheckBox
          label={t('remember')}
          name='isRemembered'
          checked={values.isRemembered}
          onChange={changeHandler}
        />
        <Link href={'#'}>{t('forgot?')}</Link>
      </div>


      <Button type='submit' disabled={isSubmitting}>{t('btn text')}</Button>
      <div className={style.actions}>
        <span>{t('do not have and account?')}<Link href={'/sign-up'}>{' ' + t('sign up')}</Link></span>
      </div>

      {/*   -=-=-=- Form Socials -=-=-=-   */}

      <Socials />

    </form>
  )
}

export default SignInForm;