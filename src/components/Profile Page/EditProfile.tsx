import Reset from '@/src/UI/Input Fields/Reset';
import style from './EditProfile.module.css';
import Input from '@/src/UI/Input Fields/Input';
import Button from '@/src/UI/Button/Button';
const EditProfile = () => {

  // form submit logic

  return (
    <>
      <h3>Edit your profile</h3>
      <form className={style.wrapper}>
        {/*   -=-=-=- Fullname Credentials -=-=-=-   */}
        <div className={style.coupleInput}>
          <Input
            type='text'
            label='First Name'
            placeholder='John'
            name='firstname'
          />
          <Input
            type='text'
            label='Last Name'
            placeholder='Smit'
            name='lastname'
          />
        </div>
        {/*   -=-=-=- Email/Address Credentials -=-=-=-   */}
        <div className={style.coupleInput}>
          <Input
            type='email'
            label='Email'
            placeholder='example@gmail.com'
            name='email'
          />
          <Input
            type='text'
            label='Address'
            placeholder='City, Example Street'
            name='address'
          />
        </div>
        {/*   -=-=-=- Change Password -=-=-=-   */}
        <div className={style.columnInputs}>
          <Input
            type='password'
            label='Password Changes'
            placeholder='Current Password'
            name='password'
          />
          <Input
            type='password'
            placeholder='New Password'
            name='newPassword'
          />
          <Input
            type='password'
            placeholder='Confirm New Password'
            name='confirmPassword'
          />
        </div>
        {/*   -=-=-=- Buttons -=-=-=-   */}
        <div className={style.actions}>
          <Reset value='cancel' />
          <Button>Save Changes</Button>
        </div>
      </form>
    </>
  )
}

export default EditProfile;