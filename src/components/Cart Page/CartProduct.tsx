'use client'
// --- style
import style from './CartProduct.module.css';
// --- types
import type { ICartItem } from '@/src/lib/types/cart-context';
// --- hooks
import useCartContext from '@/src/hooks/useCartContext';
// -- react api
import { useRouter } from 'next/navigation';
// --- next-internationalization
import { useCurrentLocale } from '@/src/lib/next-internationalization/client';
// --- utils
import formatProductPathSegment from '@/src/utilities/helpers/formatProductPathSegment';

interface IProps {
  item: ICartItem
}

/**
 * Cart product
 */
const CartProduct = ({ item }: IProps) => {

  const locale = useCurrentLocale();
  const router = useRouter();

  const { id, name, price, salePercentage, qty, nameGe, imgUrl } = item;
  const pr = price * (1 - salePercentage)

  // context
  const ctx = useCartContext();

  const addItemHandler = () => {
    ctx.addItem({ ...item, qty: 1 })
  }

  const removeItemHandler = () => {
    ctx.removeItem(item.id)
  }

  const clearItemHandler = () => {
    ctx.clearItem(item.id)
  }


  let total = pr * qty;
  if (salePercentage > 0)
    total *= (1 - salePercentage);

  return (
    <div className={style.wrapper}>
      <div className={style.imgWrapper} onClick={() => router.push('/store/' + formatProductPathSegment(name, id))}>
        <img src={imgUrl} alt={name} />
      </div>
      <div className={style.nameHolder}>
        <span>{locale === 'en' ? name : nameGe}</span>
        <div className={style.actionsWrapper}>
          <div className={style.actions}>
            <button onClick={removeItemHandler}>-</button>
            <span>{qty}</span>
            <button onClick={addItemHandler}>+</button>
          </div>
          <button onClick={clearItemHandler}>Remove</button>
        </div>
      </div>
      <div className={style.priceHolder}>
        <span className={style.price}>${total.toFixed(2)}</span>
        {salePercentage > 0 && <span className={style.oldprice}>${price * qty}</span>}
      </div>
    </div >
  )
}

export default CartProduct;