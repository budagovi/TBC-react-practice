// -- style
import style from './FormLabel.module.css';

interface IProps {
  title: string,
  subtitle: string
}

/**
 * Label Component for SignInForm and SignUpForm
 */
const FormLabel = ({ title, subtitle }: IProps) => {
  return (
    <div className={style.formLabel}>
      <h1>{title}</h1>
      <span>{subtitle}</span>
    </div>
  )
}

export default FormLabel;