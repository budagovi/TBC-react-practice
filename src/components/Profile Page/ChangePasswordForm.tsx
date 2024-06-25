// --- style
import style from './ChangePasswordForm.module.css';
// --- types
import { IUser } from '@/src/lib/types/entities';
// --- UI
import Input from '@/src/UI/Input Fields/Input/Input';
import Button from '@/src/UI/Button/Button';
// --- next-internationalization
import { useScopedI18n } from '@/src/lib/next-internationalization/client';

interface IProps {
  user: IUser
}

const ChangePasswordForm = ({ user }: IProps) => {

  const t = useScopedI18n('/profile.edit form');

  return (
    <form className={style.wrapper}>
      {false && user.id}
      <h3>{t('password.0')}</h3>
      {/*   -=-=-=- Change Password -=-=-=-   */}
      <Input
        type='password'
        label={t('password.1')}
        placeholder='********'
        name='password'
      />
      <Input
        type='password'
        label={t('password.2')}
        placeholder='********'
        name='newPassword'
      />
      <Input
        type='password'
        label={t('password.3')}
        placeholder='********'
        name='confirmPassword'
      />
      <Button>{t('password.4')}</Button>
    </form>
  )
}

export default ChangePasswordForm;