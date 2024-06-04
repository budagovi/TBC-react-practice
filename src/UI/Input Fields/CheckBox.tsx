// *
// * Custom checkbox element
// *

// --- CSS
import style from './Input.module.css'
// --- react api
import { InputHTMLAttributes, ChangeEventHandler, ReactNode } from 'react'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  // other input attributes
  label: ReactNode,
  onChange: ChangeEventHandler<HTMLInputElement>
}

const CheckBox = ({ name, label, checked, onChange }: IProps) => {
  return (
    <div className={style.checkboxWrapper}>
      <input type='checkbox' name={name} id={name} checked={checked} onChange={onChange} />
      <label htmlFor={name}>{label}</label>
    </div>
  )
}

export default CheckBox;