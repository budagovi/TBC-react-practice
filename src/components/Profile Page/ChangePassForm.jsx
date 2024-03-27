import style from './ChangePassForm.module.css';

const ChangePassForm = () => {
  return (
    <form className={style.wrapper}>
      <div className={style.formControl}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" placeholder='********' />
      </div>
      <div className={style.formControl}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" placeholder='********' />
      </div>
      <div className={style.formControl}>
        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" placeholder='********' />
      </div>
      <button type="submit">change</button>
    </form>
  )
}

export default ChangePassForm;