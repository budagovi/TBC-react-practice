// *
// * Custom password input element
// *

// --- CSS
import style from './Password.module.css'
// --- react api
import { memo, InputHTMLAttributes, useState } from 'react'
// --- react-icons
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
// --- antd
import { Tooltip } from 'antd';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  // other input attributes
  label?: string,
  error?: string
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
      error
    }: IProps
  ) {

    const [show, setShow] = useState(false)

    const toggleShow = () => {
      setShow(prevState => !prevState)
    }

    return (
      <div className={`${style.wrapper} ${error ? style.invalid : null}`}>
        {label && <label htmlFor={name}>{label}</label>}
        <Tooltip title={error ? error : null} placement="bottomLeft" color='#b92e2e'>
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
        </Tooltip>
      </div >
    )
  }
)

export default PasswordInput;