'use client'
// --- style
import style from './DrawerItem.module.css';
// --- hooks
import useCartContext from '@/src/hooks/useCartContext';
import { useCurrentLocale } from '@/src/lib/next-internationalization/client';
// --- react-icons
import { IoCloseOutline } from "react-icons/io5";
// --- types
import type { ICartItem } from '@/src/lib/types/cart-context';

interface IProps {
  cartItem: ICartItem;
}

/**
 * Product Item of Drawer cart 
 */
const DrawerItem = ({ cartItem }: IProps) => {

  const { name, nameGe, price, salePercentage, id, imgUrl, qty } = cartItem;
  const ctx = useCartContext();
  const locale = useCurrentLocale();

  let total = price * qty;
  if (salePercentage > 0)
    total *= (1 - salePercentage);

  return (
    <div className={style.wrapper}>
      <div className={style.imgWrapper}>
        <img src={imgUrl} alt={name} />
      </div>
      <div className={style.nameHolder}>
        <span>{locale === 'en' ? name : nameGe}</span>
        <div className={style.actions}>
          <button onClick={() => ctx.removeItem(id)}>-</button>
          <span>{qty}</span>
          <button onClick={() => ctx.addItem({ ...cartItem, qty: 1 })}>+</button>
        </div>
      </div>
      <div className={style.priceHolder}>
        <IoCloseOutline onClick={() => ctx.clearItem(id)} className={style.icon} />
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  )
}

export default DrawerItem;