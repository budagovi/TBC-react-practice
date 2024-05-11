// *
// * Custom textarea element
// *

// --- CSS
import style from './Input.module.css'

interface Props {
  label?: string,
  name: string,
  placeholder: string,
  rows: number,
}

const TextArea = ({ label, name, placeholder, rows }: Props) => {

  return (
    <div className={style.wrapper}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea name={name} placeholder={placeholder} rows={rows}></textarea>
    </div>
  )
}

export default TextArea;