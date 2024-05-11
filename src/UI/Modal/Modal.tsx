'use client'

// *
// * Custom overlay for wrapping around modals. covers entire screen
// *

// --- CSS
import style from './Modal.module.css';
// --- react api
import { createPortal } from 'react-dom';
import { ReactNode, useEffect, useRef } from 'react';

interface Props {
  children: ReactNode,
  show: boolean
}

const Modal = ({ children, show }: Props) => {

  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById('overlay');
  }, []);

  if (!show)
    return null

  return ref.current ? createPortal(<div className={style.wrapper}>{children}</div>, ref.current) : null;
}

export default Modal;