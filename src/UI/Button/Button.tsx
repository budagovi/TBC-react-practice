import { MouseEventHandler, ReactNode } from 'react';
import style from './Button.module.css';

interface Props {
  children: ReactNode,
  light?: boolean,
  onClick?: MouseEventHandler,
  className?: string | null
}

const Button = ({ children, light= false, onClick, className = null }: Props) => {
  return (
    <button 
      className={`${style.btn} ${light && style.light} ${className}`} 
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;