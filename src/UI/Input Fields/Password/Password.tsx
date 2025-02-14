'use client'
// --- style
import style from './Password.module.css'
// --- react api
import { memo, InputHTMLAttributes, useState, useEffect } from 'react'
// --- react-icons
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
// --- antd
import { Tooltip } from 'antd';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  // other input attributes
  label?: string,
  validate?: (value: string) => number,
  errorMsgs?: string[],
  formSubmitted?: boolean,
  isRequired?: boolean,
}

/**
 * Custom password input element (can be validated and display error messages after touch)
 */
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
      errorMsgs,
      validate,
      formSubmitted,
      isRequired
    }: IProps
  ) {

    value = value as string
    const [show, setShow] = useState(false)
    const [wrapperClasses, setWrapperClasses] = useState(`${style.invalid} ${style.shaking}`);
    const [isTouched, setIsTouched] = useState(false);

    const isInvalid = validate && errorMsgs && validate(value) >= 0 && isTouched;
    // toggle eye icons
    const toggleShow = () => {
      setShow(prevState => !prevState)
    }

    // shake the component with invalid value on blur
    const shake = () => {
      !isTouched && setIsTouched(true)

      setWrapperClasses(`${style.invalid} ${style.shaking}`);
      const timer = setTimeout(() => {
        setWrapperClasses(`${style.invalid}`);
      }, 350);

      return () => {
        clearTimeout(timer);
      }
    }

    // validate on form submission (for required fields, to check if they are empty)
    useEffect(() => {
      if (!isRequired || formSubmitted === false)
        return

      shake()
    }, [formSubmitted])

    return (
      <div className={`${style.wrapper} ${isInvalid ? wrapperClasses : null}`}>
        {label && <label htmlFor={name}>{label}</label>}
        <Tooltip
          title={isInvalid ? errorMsgs[validate(value)] : null}
          placement="bottomLeft"
          color='#b92e2e'
          mouseEnterDelay={0.07}
        >
          <div className={style.passwordWrapper}>
            <input
              id={name}
              type={!show ? 'password' : 'text'}
              name={name}
              placeholder={placeholder}
              required={required}
              value={value}
              onChange={onChange}
              onBlur={(e) => {
                onBlur && onBlur(e)
                shake()
              }}
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