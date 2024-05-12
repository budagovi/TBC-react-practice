'use client'
import { ChangeEvent, FormEvent, useState } from 'react';
import style from './Login.module.css';
import { useRouter } from 'next/navigation';
import { useScopedI18n } from '@/src/locales/client';

const Login = () => {

  const t = useScopedI18n('login page')

  const [credentials, setCredentials] = useState( () => {return {username: '', password: '0lelplR'}})
  const router = useRouter();

  const usernameChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCredentials(prevState => { return {...prevState, username: value}})
    //console.log(value)
  }

  const passwordChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCredentials(prevState => { return {...prevState, password: value}})
    //console.log(value)
  }

  const submitHandler = async (e:FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...credentials
      })
    })
    
    if(response.ok) {
      router.push('/store')
    }

  }

  return (
    <form className={style.wrapper} onSubmit={submitHandler}>
      <h1>{t('title')}</h1>
      <input
        type="text"
        placeholder='username'
        name='username'
        value={credentials.username}
        onChange={usernameChangeHandler}
      />
      <input
        type="password"
        placeholder='password'
        name='password'
        value={credentials.password}
        onChange={passwordChangeHandler}
      />
      <button type="submit">{t('btn text')}</button>
    </form>
  )
}

export default Login;