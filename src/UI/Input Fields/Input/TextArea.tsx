// --- style
import style from './Input.module.css'
// --- react-icons
import { TextareaHTMLAttributes, useEffect, useState } from 'react';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string,
  errorMsgs?: string[],
  validate?: (value: string) => number,
  formSubmitted?: boolean,
  isRequired?: boolean,
  reset?: boolean
}

/**
 * Custom textarea element (can be validated and display error messages after touch)
 */
const TextArea = ({ label, name, placeholder, rows, errorMsgs, validate, formSubmitted, isRequired, value, onChange, onBlur, reset }: Props) => {

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

  useEffect(() => {
    if (reset) {
      console.log('reset')
      setIsTouched(false);
    }
  }, [reset])


  // validate on form submission (for required fields, to check if they are empty)
  useEffect(() => {

    if (!isRequired || formSubmitted === false)
      return;

    shake()
  }, [formSubmitted])

  return (
    <div className={`${style.wrapper} ${isInvalid ? wrapperClasses : null}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        name={name}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange}
        onBlur={(e) => {
          onBlur && onBlur(e)
          shake()
        }}
      ></textarea>
    </div>
  )
}

export default TextArea;