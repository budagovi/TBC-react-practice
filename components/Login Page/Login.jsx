import style from './Login.module.css';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {AUTH_COOKIE_KEY} from '../../constants';

const Login = ({ loginUser }) => {

  const cookieStore = cookies();

  if(cookieStore.get(AUTH_COOKIE_KEY)) {
    redirect('/store')
  }

  return (
    <form className={style.wrapper} action={loginUser}>
      <h1>Sign in to your account</h1>
      <input
        type="text"
        placeholder='username'
        name='username'
      />
      <input
        type="password"
        placeholder='password'
        name='password'
      />
      <button type="submit">Sign in</button>
    </form>
  )
}

export default Login;