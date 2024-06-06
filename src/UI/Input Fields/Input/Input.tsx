// *
// * Custom input element
// *

// --- CSS
import style from './Input.module.css'
// --- react api
import { memo, InputHTMLAttributes } from 'react'
// --- antd
import { Tooltip } from 'antd'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  // other input attributes
  label?: string,
  error?: string
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
      error
    }: IProps
  ) {
    
    return (
      <div className={`${style.wrapper} ${error ? style.invalid : null}`}>
        {label && <label htmlFor={name}>{label}</label>}
        <Tooltip
          title={error ? error : null}
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
            onBlur={onBlur}
            {...(pattern ? { pattern } : {})}
          />
        </Tooltip >
      </div>
    )

  }
)

export default Input;