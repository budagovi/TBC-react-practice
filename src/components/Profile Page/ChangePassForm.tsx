'use client'

import { ChangeEvent, useState } from 'react';
import style from './ChangePassForm.module.css';

const ChangePassForm = ({ dict }: { dict:any}) => {

  const iniContainer = {
    password: '',
    newPassword: '',
    confirmPassword: ''
  }

  const [passContainer, setPassContainer] = useState(iniContainer);

  const passChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    //setPassContainer({ ...passContainer, password: e.target.value })
    setPassContainer(prevState => ({...prevState, password: e.target.value}))
  }

  const newPassChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setPassContainer(prevState => ({...prevState, newPassword: e.target.value}))
  }

  const confirmPassChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setPassContainer(prevState => ({...prevState, confirmPassword: e.target.value}))
  }

  return (
    <form className={style.wrapper}>
      <div className={style.formControl}>
        <label htmlFor="old-password">{dict.old}</label>
        <input
          type="password"
          id="old-password"
          placeholder='********'
          value={passContainer.password}
          onChange={passChangeHandler}
        />
      </div>
      <div className={style.formControl}>
        <label htmlFor="new-password">{dict.new}</label>
        <input
          type="password"
          id="new-password"
          placeholder='********'
          value={passContainer.newPassword}
          onChange={newPassChangeHandler}
        />
      </div>
      <div className={style.formControl}>
        <label htmlFor="confirm-password">{dict.confirm}</label>
        <input
          type="password"
          id="confirm-password"
          placeholder='********'
          value={passContainer.confirmPassword}
          onChange={confirmPassChangeHandler}
        />
      </div>
      <button type="submit">{dict.btnText}</button>
    </form>
  )
}

export default ChangePassForm;