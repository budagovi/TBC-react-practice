// *
// * Custom button component
// *

import style from './Button.module.css';

//  next.js/react api
import { MouseEventHandler, ReactNode } from 'react';

interface Props {
  children: ReactNode,
  light?: boolean,
  onClick?: MouseEventHandler,
  className?: string | null,
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({ children, light= false, onClick, className = null, type= 'button' }: Props) => {
  return (
    <button 
      type={type}
      className={`${style.btn} ${light && style.light} ${className}`} 
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;