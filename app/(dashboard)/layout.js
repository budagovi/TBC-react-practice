import style from './layout.module.css';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE_KEY } from '../../constants';

const layout = ({ children }) => {

  const cookieStore = cookies();

  if (!cookieStore.get(AUTH_COOKIE_KEY)) {
    redirect('/login')
  }

  return (
    <main className={style.mainContent}>
      {children}
    </main>
  )
}

export default layout;