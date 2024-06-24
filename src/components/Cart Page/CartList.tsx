'use client'
// --- style
import style from './CartList.module.css';
// --- hooks
import useCartContext from '@/src/hooks/useCartContext';
// --- Components
import CartProduct from './CartProduct';
// --- react api
import useIsClient from '@/src/hooks/useIsClient';
// --- next-international
import { useScopedI18n } from '@/src/lib/next-internationalization/client';

/**
 * Containts Cart list and Pre-order summary of selected items
 */
const Cart = () => {

  const t = useScopedI18n('/cart')
  const ctx = useCartContext();
  const isClient = useIsClient();

  if (!isClient)
    return null;

  return (
    <div className={style.wrapper}>
      {isClient && ctx.items.length > 0 ? ctx.items.map(item =>
        <CartProduct
          key={item.id}
          item={item}
        />
      ) : <span className={style.empty}>{t('empty cart')}</span>}
    </div>
  )
}

export default Cart;