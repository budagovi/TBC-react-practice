// *
// * Custom input element
// *

// --- CSS
import style from './Input.module.css'

interface Props {
  label?: string,
  name: string,
  type: 'text' | 'number' | 'password' | 'date' | 'email',
  placeholder: string,
  required?: boolean,
}

const Input = ({ label, name, type, placeholder, required = false }: Props) => {

  const placeholderText = required ? placeholder + ' *' : placeholder

  return (
    <div className={style.wrapper}>
      {label && <label htmlFor={name}>{label}</label>}
      <input type={type} placeholder={placeholderText} required={required}/>
    </div>
  )
}

export default Input;