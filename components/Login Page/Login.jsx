'use client'

import { useState } from 'react';
import style from './Login.module.css';
import { useRouter } from 'next/navigation';

const Login = () => {

  const [credentials, setCredentials] = useState( () => { return {username: '', password: '0lelplR'}})
  const router = useRouter();

  const usernameChangeHandler = (e) => {
    const value = e.target.value
    setCredentials(prevState => { return {...prevState, username: value}})
    //console.log(value)
  }

  const passwordChangeHandler = (e) => {
    const value = e.target.value
    setCredentials(prevState => { return {...prevState, password: value}})
    //console.log(value)
  }

  const submitHandler = async (e) => {
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
      window.location.reload();  // for navlinks
    }
  }

  return (
    <form className={style.wrapper} onSubmit={submitHandler}>
      <h1>Sign in to your account</h1>
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
      <button type="submit">Sign in</button>
    </form>
  )
}

export default Login;