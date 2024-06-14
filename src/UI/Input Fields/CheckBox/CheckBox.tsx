// *
// * Custom checkbox element
// *

// --- CSS
import { Tooltip } from 'antd';
import style from './CheckBox.module.css'
// --- react api
import { InputHTMLAttributes, ChangeEventHandler, ReactNode, useEffect, useState } from 'react'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  // other input attributes
  label: ReactNode,
  onChange: ChangeEventHandler<HTMLInputElement>,
  errorMsg?: string,
  isRequired?: boolean,
  formSubmitted?: boolean
}

const CheckBox = ({ name, label, checked, onChange, errorMsg, isRequired, formSubmitted }: IProps) => {

  const [isTouched, setIsTouched] = useState(false)

  // detect validity of value during onChange
  const isInvalid = !checked && isTouched;

  // validate on form submission (for required fields, to check if they are empty)
  useEffect(() => {

    if (!isRequired || formSubmitted === false)
      return;

    !isTouched && setIsTouched(true)
  }, [formSubmitted])

  return (
    <Tooltip
      title={isInvalid ? errorMsg : null}
      placement="topLeft"
      color='#b92e2eee'
      destroyTooltipOnHide={true}
      mouseEnterDelay={0.07}
    >
      <div className={`${style.wrapper} ${isInvalid ? style.invalid : null}`}>
        <input type='checkbox' name={name} id={name} checked={checked} onChange={onChange} />
        <label htmlFor={name}>{label}</label>
      </div>
    </Tooltip>
  )
}

export default CheckBox;