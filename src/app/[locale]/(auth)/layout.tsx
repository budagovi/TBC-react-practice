// --- style
import style from '@/src/app/layouts.module.css';

interface IProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: IProps) => {

  return (
    <div className={style.auth_layout}>
      <img src="./images/auth-background.jpg" alt="authorization page background" />
      <div className={style.halfTransparentLayer}></div>
      {children}
    </div>
  )
}

export default AuthLayout;