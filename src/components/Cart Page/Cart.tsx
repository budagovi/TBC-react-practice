'use client'
// --- style
import style from './Cart.module.css';
// --- hooks
import useCartContext from '@/src/hooks/useCartContext';
// --- Components
import CartProduct from './CartProduct';
import CartSummary from './CartSummary';
// --- react api
import { useEffect, useState } from 'react';

/**
 * Containts Cart list and Pre-order summary of selected items
 */
const Cart = () => {

  const ctx = useCartContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient)
    return null;


  return (
    <div className={style.wrapper}>

      {/* -=-=-=-=- Cart List -=-=-=-=- */}
      <div className={style.cartList}>
        {ctx && ctx.items.length > 0 ? ctx.items.map(item =>
          <CartProduct
            key={item.id}
            item={item}
          />
        ) : <span className={style.empty}>Cart is empty</span>}
      </div>

      {/* -=-=-=-=- Pre-Order Summary -=-=-=-=- */}
      <CartSummary />
    </div>
  )
}

export default Cart;