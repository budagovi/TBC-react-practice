'use client'
import style from './CartIcon.module.css';
// --- react-icons
import { FaCartShopping } from "react-icons/fa6";
// --- antd
import { Drawer } from 'antd';
// --- react/next api
//import Link from 'next/link';
import { useState, useEffect } from 'react';
// --- hooks
import useCartContext from '@/src/hooks/useCartContext';
import DrawerItem from './DrawerItem';
import Button from '@/src/UI/Button/Button';
import { useRouter } from 'next/navigation';

/**
 * Cart icon that shows total amoun of cart items and onClick opens drawer from right
 */
const CartIcon = () => {

  // get total amount of cart items and render with no SSR
  const ctx = useCartContext();
  const { totalAmount } = ctx;
  const router = useRouter();


  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])


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

      {/* -=-=-=-=- Modal -=-=-=-=- */}
      <Drawer
        title="Cart"
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
            ) : <span className={style.empty}>Cart is empty</span>}
          </div>
          <div className={style.actions}>
            {ctx.items.length > 0 && <Button>view cart</Button>}
            {ctx.items.length === 0 && <Button onClick={() => router.push('/store')}>start shopping</Button>}
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default CartIcon