'use client'

// *
// * Sign-In Form Component
// *

// --- style
import style from './AuthForm.module.css';
// --- UI
import Input from '@/src/UI/Input Fields/Input/Input';
import PasswordInput from '@/src/UI/Input Fields/Password/Password';
import CheckBox from '@/src/UI/Input Fields/CheckBox/CheckBox';
import Button from '@/src/UI/Button/Button';
// --- nextjs/react api
import { ChangeEvent, FormEvent, useState, useCallback, useTransition } from 'react';
//import { useRouter } from 'next/navigation';
import Link from 'next/link';
// --- next-internationalization api
import { useCurrentLocale, useScopedI18n } from '@/src/locales/client';
// --- react-icons
import { FaFacebook, FaGoogle } from 'react-icons/fa6';
// --- utils
import { isRequiredFieldString } from '@/src/utilities/validators';

interface ISignInFormData {
  email: string,
  password: string,
  isRemembered: boolean
}

const initialFormValue: ISignInFormData = {
  email: '',
  password: '',
  isRemembered: true
}

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

  //const router = useRouter();

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {

    // cancel error feedback
    // setErrors((prevState) => (
    //   {
    //     // modifying property that corresponds to trigerring input field and copy the rest
    //     ...prevState,
    //     [name]: null,
    //   }
    // ))

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

    startTransition(() => { })
    // if (values.email === '')
    //   setErrors(prevState => ({ ...prevState, email: 'email is required' }))

    // if (values.password === '')
    //   setErrors(prevState => ({ ...prevState, password: 'password is required' }))

    // const response = await fetch('/api/SignInForm', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     ...credentials
    //   })
    // })

    // if(response.ok) {
    //   router.push('/store')
    // }

  }

  return (
    <form className={style.wrapper} onSubmit={submitHandler}>

      {/*   -=-=-=- Form Label -=-=-=-   */}

      <div className={style.formLabel}>
        <h1>{t('title')}</h1>
        <span>{t('Login to yo-')}</span>
      </div>

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


      <Button type='submit'>{t('btn text')}</Button>
      <div className={style.actions}>
        <span>{t('do not have and account?')}<Link href={'/sign-up'}>{' ' + t('sign up')}</Link></span>
      </div>

      {/*   -=-=-=- Socials -=-=-=-   */}

      <div className={style.socialsLabel}>
        <span>{t('continue')}</span>
      </div>

      <div className={style.socials}>
        <Button light>
          <FaFacebook className={style.socialsLogo} />
          <span>Facebook</span>
        </Button>
        <Button light>
          <FaGoogle className={style.socialsLogo} />
          <span>Google</span>
        </Button>
      </div>

    </form>
  )
}

export default SignInForm;