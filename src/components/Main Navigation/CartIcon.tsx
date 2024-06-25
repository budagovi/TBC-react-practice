'use client'
import style from './CartIcon.module.css';
// --- react-icons
import { FaCartShopping } from "react-icons/fa6";
// --- antd
import { Drawer } from 'antd';
// --- react/next api
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// --- hooks
import useCartContext from '@/src/hooks/useCartContext';
import useIsClient from '@/src/hooks/useIsClient';
// --- UI
import Button from '@/src/UI/Button/Button';
// --- components
import DrawerItem from './DrawerItem';
import NavigateToCartButton from './NeedToLogInModal';
// --- next-international
import { useScopedI18n } from '@/src/lib/next-internationalization/client';

/**
 * Cart icon that shows total amoun of cart items and onClick opens drawer from right
 */
const CartIcon = ({ isLoggedIn }: { isLoggedIn: boolean }) => {

  const t = useScopedI18n('header');
  // get total amount of cart items and render with no SSR
  const ctx = useCartContext();
  const { totalAmount } = ctx;
  const router = useRouter();

  const isClient = useIsClient();

  const total = ctx.items.reduce((acc, curr) => acc + curr.price * curr.qty * (1 - curr.salePercentage), 0);

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(prevState => !prevState);
  };

  return (
    <>
      <button
        className={style.cartIconWrapper}
        onClick={toggleDrawer}
      >
        {isClient ? <div >{totalAmount}</div> : <div>0</div>}
        <FaCartShopping className={style.cartIcon} />
      </button>

      {/* -=-=-=-=- Drawer -=-=-=-=- */}
      <Drawer
        title={t('cart')}
        onClose={toggleDrawer}
        open={open}
      >
        <div className={style.modalContent}>
          <div className={style.products}>
            {ctx.items.length > 0 ? ctx.items.map(item =>
              <DrawerItem
                key={item.id}
                cartItem={item}
              />
            ) : <span className={style.empty}>{t('empty cart')}</span>}
          </div>
          <div className={style.priceHolder}>
            <span>{t('subtotal')}:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className={style.actions}>
            {ctx.items.length > 0 && <NavigateToCartButton closeDrawer={toggleDrawer} isLogged={isLoggedIn} />}
            {ctx.items.length === 0 && <Button onClick={() => { router.push('/store'); toggleDrawer() }}>{t('start shopping')}</Button>}
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default CartIcon