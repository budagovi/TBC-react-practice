// *
// * Custom input[type='reset'] element
// *

// --- CSS
import style from './Input.module.css'

interface Props {
  value: string,
}

const Reset = ({ value }: Props) => {

  return <input type='reset' value={value} className={style.reset}/>
}

export default Reset;