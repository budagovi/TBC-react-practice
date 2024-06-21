'use client'

// *
// * Profile Edit Form
// *

// --- style
import style from './EditProfile.module.css';
// --- UI

import Input from '@/src/UI/Input Fields/Input/Input';
import Button from '@/src/UI/Button/Button';
// --- next.react api
// --- next-internationalization api
import { useScopedI18n } from '@/src/lib/next-internationalization/client';

const EditProfile = () => {

  const t = useScopedI18n('profile page.edit form')
  // form submit logic

  return (
    <>
      <h3>{t('title')}</h3>
      <form className={style.wrapper}>
        {/*   -=-=-=- Fullname Credentials -=-=-=-   */}
        <div className={style.coupleInput}>
          <Input
            type='text'
            label={t('firstname.0')}
            placeholder={t('firstname.1')}
            name='firstname'
          />
          <Input
            type='text'
            label={t('lastname.0')}
            placeholder={t('lastname.1')}
            name='lastname'
          />
        </div>
        {/*   -=-=-=- Email/Address Credentials -=-=-=-   */}
        <div className={style.coupleInput}>
          <Input
            type='email'
            label={t('email')}
            placeholder='example@gmail.com'
            name='email'
          />
          <Input
            type='text'
            label={t('address.0')}
            placeholder={t('address.1')}
            name='address'
          />
        </div>
        {/*   -=-=-=- Change Password -=-=-=-   */}
        <div className={style.columnInputs}>
          <Input
            type='password'
            label={t('password.0')}
            placeholder={t('address.1')}
            name='password'
          />
          <Input
            type='password'
            placeholder={t('password.2')}
            name='newPassword'
          />
          <Input
            type='password'
            placeholder={t('password.3')}
            name='confirmPassword'
          />
        </div>
        {/*   -=-=-=- Buttons -=-=-=-   */}
        <div className={style.actions}>
          {/* reset btn */}
          <Button>{t('save')}</Button>
        </div>
      </form>
    </>
  )
}

export default EditProfile;