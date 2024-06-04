// *
// * Layout for "auth" segments
// *

// --- style
import style from './layout.module.css';

interface IAuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: IAuthLayoutProps) => {
  
  return (
    <div className={style.wrapper}>
      <img src="/images/auth gallery/image-4.jpg" alt="" />
      <div className={style.halfTransparentLayer}></div>
      {children}
    </div>
  )
}

export default AuthLayout;