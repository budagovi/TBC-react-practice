'use client'

// *
// * Sign-In Form Component
// *

// --- style
import style from './AuthForm.module.css';
// --- UI
import Input from '@/src/UI/Input Fields/Input';
import PasswordInput from '@/src/UI/Input Fields/Password';
import CheckBox from '@/src/UI/Input Fields/CheckBox';
import Button from '@/src/UI/Button/Button';
// --- nextjs/react api
import { ChangeEvent, FormEvent, useState, useCallback } from 'react';
//import { useRouter } from 'next/navigation';
import Link from 'next/link';
// --- next-internationalization api
import { useScopedI18n } from '@/src/locales/client';
// --- react-icons
import { FaFacebook, FaGoogle } from 'react-icons/fa6';

interface ISignInFormData {
  username: string,
  password: string,
  isRemembered: boolean
}

const Login = () => {

  const initialFormValue: ISignInFormData = { username: '', password: '', isRemembered: true }
  const [customFormData, setCustomFormData] = useState(initialFormValue)
  //const router = useRouter();

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {

    const { name, value, type, checked } = e.target;
    setCustomFormData((prevState) => (
      {
        // modifying property that corresponds to trigerring input field and copy the rest
        ...prevState,
        [name]: type === 'checkbox' ? checked : value,
      }
    ));
  }, []);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     ...credentials
    //   })
    // })

    // if(response.ok) {
    //   router.push('/store')
    // }

    setCustomFormData(initialFormValue)
  }

  const t = useScopedI18n('login page')

  return (
    <form className={style.wrapper} onSubmit={submitHandler}>

      {/*   -=-=-=- Form Label -=-=-=-   */}

      <div className={style.formLabel}>
        <h1>{t('title')}</h1>
        <span>{t('Login to yo-')}</span>
      </div>

      {/*   -=-=-=- Form Inputs -=-=-=-   */}

      <div className={style.inputs}>

        {/*Username*/}
        <Input
          label={t('email')}
          type='text'
          name='username'
          placeholder={t('email')}
          value={customFormData.username}
          onChange={changeHandler}
          required
        />

        {/*Password*/}
        <PasswordInput
          label={t('password')}
          type='password'
          name='password'
          placeholder={t('password')}
          value={customFormData.password}
          onChange={changeHandler}
          required
        />
      </div>

      {/*   -=-=-=- Form Actions -=-=-=-   */}

      <div className={style.actions}>
        <CheckBox
          label={t('remember')}
          name='isRemembered'
          checked={customFormData.isRemembered}
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

export default Login;