// --- CSS
import style from './Button.module.css';
// --- next.js/react api
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode,
  light?: boolean
}

/**  
 * Custom button component
 */
const Button = ({ children, light = false, onClick, className, type = 'button', disabled, style: styleInline }: IProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${style.btn} ${className} ${light && style.light}`}
      style={styleInline}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;