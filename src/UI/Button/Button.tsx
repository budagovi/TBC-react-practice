// *
// * Custom button component
// *

// --- CSS
import style from './Button.module.css';
// --- next.js/react api
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode,
  light?: boolean,
}

const Button = ({ children, light = false, onClick, className, type = 'button', disabled }: Props) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${style.btn} ${light && style.light} ${className}`}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;