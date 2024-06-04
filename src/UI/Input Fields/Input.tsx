// *
// * Custom input element
// *

// --- CSS
import style from './Input.module.css'
// --- react api
import { memo, InputHTMLAttributes } from 'react'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  // other input attributes
  label?: string
}

const Input = memo(
  function Input(
    {
      label,
      type,
      name,
      placeholder,
      required = false,
      value,
      onChange,
      onBlur,
    }: IProps
  ) {

    return (
      <div className={style.wrapper}>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    )

  }
)

export default Input;