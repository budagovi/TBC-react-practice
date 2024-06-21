'use client'
// --- style
import style from './ProductActions.module.css';
// --- react api
import { useState } from 'react';
// --- UI
import Button from '@/src/UI/Button/Button';
// --- next-internationalization
import { useScopedI18n } from '@/src/lib/next-internationalization/client';

/**
 * Component for Product page actions (add to cart)
 */
const ProductActions = () => {

  const t = useScopedI18n('/product');

  const [count, setCount] = useState(1);

  const clickHandler = (operand: number) => {

    setCount(prevState => {
      if (prevState + operand < 1)
        return prevState;

      else return prevState + operand
    })
  }

  return (
    <div className={style.wrapper}>
      <div className={style.counter}>
        <button
          className={style.btn}
          onClick={() => clickHandler(-1)}
        >-</button>
        <span>{count}</span>
        <button
          className={style.btn}
          onClick={() => clickHandler(1)}
        >+</button>
      </div>
      <Button>{t('add to cart')}</Button>
    </div>
  )
}

export default ProductActions;