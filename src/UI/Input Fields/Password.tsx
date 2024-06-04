// *
// * Custom password input element
// *

// --- CSS
import style from './Input.module.css'
// --- react api
import { memo, InputHTMLAttributes, useState } from 'react'
// --- react-icons
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  // other input attributes
  label?: string
}

const PasswordInput = memo(
  function PasswordInput(
    {
      label,
      name,
      placeholder,
      required = false,
      value,
      onChange,
      onBlur,
    }: IProps
  ) {

    const [show, setShow] = useState(false)

    const toggleShow = () => {
      setShow(prevState => !prevState)
    }

    return (
      <div className={style.wrapper}>
        {label && <label htmlFor={name}>{label}</label>}
        <div className={style.passwordWrapper}>
          <input
            id={name}
            type={!show ? 'password' : 'text'}
            name={name}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
          {!show ?
            <PiEyeBold
              className={style.eye}
              onClick={toggleShow}
            /> :
            <PiEyeClosedBold
              className={style.eye}
              onClick={toggleShow}
            />
          }
        </div>
      </div>
    )
  }
)

export default PasswordInput;