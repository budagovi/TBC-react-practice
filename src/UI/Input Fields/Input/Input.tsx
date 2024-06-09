// *
// * Custom input element
// *

// --- CSS
import style from './Input.module.css'
// --- react api
import { memo, InputHTMLAttributes, useState, useEffect } from 'react'
// --- antd
import { Tooltip } from 'antd'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  // other input attributes
  label?: string,
  errorMsgs?: string[],
  validate?: (value: string) => number,
  formSubmitted?: boolean,
  isRequired?: boolean,
}

const Input = memo(
  function Input(
    {
      label,
      type,
      name,
      placeholder,
      value,
      onChange,
      onBlur,
      pattern,
      errorMsgs,
      validate,
      formSubmitted,
      isRequired
    }: IProps
  ) {

    value = value as string
    const [wrapperClasses, setWrapperClasses] = useState(`${style.invalid} ${style.shaking}`);
    const [isTouched, setIsTouched] = useState(false)

    // detect validity of value during onChange
    const isInvalid = validate && errorMsgs && validate(value) >= 0 && isTouched;

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
        return;

      shake()
    }, [formSubmitted])

    return (
      <div className={`${style.wrapper} ${isInvalid ? wrapperClasses : null}`}>
        {label && <label htmlFor={name}>{label}</label>}
        <Tooltip
          title={isInvalid ? errorMsgs[validate(value)] : null}
          placement="bottomLeft"
          color='#b92e2e'
          destroyTooltipOnHide={true}
          mouseEnterDelay={0.07}
        >
          <input
            id={name}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={(e) => {
              onBlur && onBlur(e)
              shake()
            }}
            {...(pattern ? { pattern } : {})}
          />
        </Tooltip >
      </div>
    )

  }
)

export default Input;