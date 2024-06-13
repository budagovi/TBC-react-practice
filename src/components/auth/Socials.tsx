// -- style
import style from './Socials.module.css';
// --- UI
import Button from '@/src/UI/Button/Button';
// --- react-icons
import { FaFacebook, FaGoogle } from 'react-icons/fa6';
// --- next-internationalization api
import { useScopedI18n } from '@/src/lib/next-internationalization/client';

// interface IProps {
//   onFbClick: string,
//   onGtClick: string
// }

/**
 * Social media's section for SignInForm and SignUpForm
 */
const Socials = () => {

  const t = useScopedI18n('/sign-up')

  return (
    <>
      <div className={style.socialsLabel}>
        <span>{t('or continue')}</span>
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
    </>
  )
}

export default Socials;