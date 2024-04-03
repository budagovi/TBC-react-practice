'use client'

import { useState } from 'react';
import style from './ChangePassForm.module.css';

const ChangePassForm = ({ password }) => {

  const iniContainer = {
    password: '',
    newPassword: '',
    confirmPassword: ''
  }

  const [passContainer, setPassContainer] = useState(iniContainer);

  const passChangeHandler = (e) => {
    //setPassContainer({ ...passContainer, password: e.target.value })
    setPassContainer(prevState => ({...prevState, password: e.target.value}))
  }

  const newPassChangeHandler = (e) => {
    setPassContainer(prevState => ({...prevState, newPassword: e.target.value}))
  }

  const confirmPassChangeHandler = (e) => {
    setPassContainer(prevState => ({...prevState, confirmPassword: e.target.value}))
  }

  return (
    <form className={style.wrapper}>
      <div className={style.formControl}>
        <label htmlFor="old-password">Old Password</label>
        <input
          type="password"
          id="old-password"
          placeholder='********'
          value={passContainer.password}
          onChange={passChangeHandler}
        />
      </div>
      <div className={style.formControl}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          placeholder='********'
          value={passContainer.newPassword}
          onChange={newPassChangeHandler}
        />
      </div>
      <div className={style.formControl}>
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          placeholder='********'
          value={passContainer.confirmPassword}
          onChange={confirmPassChangeHandler}
        />
      </div>
      <button type="submit">change</button>
    </form>
  )
}

export default ChangePassForm;