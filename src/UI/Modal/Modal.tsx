'use client'

import { createPortal } from 'react-dom';
import { ReactNode, useEffect, useRef } from 'react';
import style from './Modal.module.css';
const Modal = ({ children, show }: { children: ReactNode, show: boolean }) => {

  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById('overlay');
  }, []);
  if (!show) return null

  return ref.current ? createPortal(<div className={style.wrapper}>{children}</div>, ref.current) : null;
}

export default Modal;