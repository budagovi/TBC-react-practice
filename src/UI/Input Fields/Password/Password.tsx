// *
// * Custom password input element
// *

// --- CSS
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
  errorMsg?: string,
  validate?: (value: string) => boolean,
  formSubmitted?: boolean,
  requiredField?: boolean,
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
      errorMsg,
      validate,
      formSubmitted,
      requiredField,
    }: IProps
  ) {

    const [show, setShow] = useState(false)
    const [wrapperClasses, setWrapperClasses] = useState(`${style.invalid} ${style.shaking}`);
    const [isTouched, setIsTouched] = useState(false);

    const isInvalid = validate && !validate(value as string) && isTouched;
    // toggle eye icons
    const toggleShow = () => {
      setShow(prevState => !prevState)
    }

    // shake the component with invalid value on blur
    const shake = () => {
      if (!`${style.invalid} ${style.shaking}`.includes(`${style.shaking}`))
        return;

      setWrapperClasses(`${style.invalid} ${style.shaking}`);
      const timer = setTimeout(() => {
        setWrapperClasses(`${style.invalid}`);
      }, 350);

      return () => {
        clearTimeout(timer);
      }
    }

    // validate on form submission (for required fields, to check if they are empty)
    requiredField && useEffect(() => {
      if (formSubmitted === false)
        return;

      shake()
      !isTouched && setIsTouched(true)
    }, [formSubmitted])

    return (
      <div className={`${style.wrapper} ${isInvalid ? wrapperClasses : null}`}>
        {label && <label htmlFor={name}>{label}</label>}
        <Tooltip title={isInvalid ? errorMsg : null} placement="bottomLeft" color='#b92e2e'>
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
                !isTouched && setIsTouched(true)
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