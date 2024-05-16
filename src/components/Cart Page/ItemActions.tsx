'use client'
// *
// * Actions for increasing and decreasing the cart item amount
// *

// --- CSS
import style from './ItemActions.module.css';
// --- next/react api
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode,
  increaseItem: () => void,
  decreaseItem: () => void
}
const ItemActions = ({ children, increaseItem, decreaseItem }: IProps) => {
  return (
    <div className={style.wrapper}>
      {children}
      <div className={style.actions}>
        <button onClick={() => increaseItem()}>
          <img src="./images/arrow-small.png" alt="arrow-up" />
        </button>
        <button onClick={() => decreaseItem()}>
          <img src="./images/arrow-small.png" alt="arrow-down" />
        </button>
      </div>
    </div >
  )

}

export default ItemActions;


