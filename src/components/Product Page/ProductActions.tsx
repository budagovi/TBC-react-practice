'use client'
// --- style
import style from './ProductActions.module.css';
// --- react api
import { useState } from 'react';
// --- UI
import Button from '@/src/UI/Button/Button';
// --- next-internationalization
import { useScopedI18n } from '@/src/lib/next-internationalization/client';
import useCartContext from '@/src/hooks/useCartContext';
import { IProduct } from '@/src/lib/types/entities';

interface IProps {
  product: IProduct
}
/**
 * Component for Product page actions (add to cart)
 */
const ProductActions = ({ product: { name, nameGe, price, salePercentage, imgUrl, id } }: IProps) => {

  const t = useScopedI18n('/product');

  const [count, setCount] = useState(1);
  const ctx = useCartContext();

  const clickHandler = (operand: number) => {
    setCount(prevState => prevState + operand)
  }

  const addToCartHandler = () => {
    ctx.addItem({id, name, nameGe, price, salePercentage, imgUrl, qty: count})
    setCount(1)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.counter}>
        <button
          className={style.btn}
          onClick={() => !(count <= 1) && clickHandler(-1)}
        >-</button>
        <span>{count}</span>
        <button
          className={style.btn}
          onClick={() => !(count >= 15) && clickHandler(1)}
        >+</button>
      </div>
      <Button onClick={addToCartHandler}>{t('add to cart')}</Button>
    </div>
  )
}

export default ProductActions;