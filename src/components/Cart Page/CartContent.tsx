'use client'
// *
// * Content of Cart Page
// *

// --- CSS
import style from './CartContent.module.css';
// --- hooks
import useCartContext from '@/src/hooks/useCartContext';
// --- UI
import Button from '@/src/UI/Button/Button';
// --- Components
import CartItem from './CartItem';
// --- next/react api
import { useEffect, useState } from 'react';
import Link from 'next/link';

// --- next-internationalization api
//import { getScopedI18n } from '@/src/locales/server';

const CartContent = () => {
  //const t = await getScopedI18n('contact page.info')

  // get the list of cart items and render with no SSR
  const { items, clearCart } = useCartContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className={style.wrapper}>

      {/*   -=-=-=- Cart List -=-=-=-   */}
      <table className={style.cartList}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {isClient && items.map(item => <CartItem item={item} key={item.id} />)}
        </tbody>
      </table>

      {/*   -=-=-=- Buttons -=-=-=-   */}
      <div className={style.buttons}>
        <Link href={'/store'}>
          <Button light>
            Return To Shop
          </Button>
        </Link>
        <Button onClick={() => clearCart()}>Clear Cart</Button>
      </div>

      {/*   -=-=-=- Forms -=-=-=-   */}
    </div>
  )
}

export default CartContent;