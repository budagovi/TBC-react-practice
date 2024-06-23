'use client'
import Button from '@/src/UI/Button/Button';
// --- style
import style from './CartSummary.module.css';
// --- hooks
import useCartContext from '@/src/hooks/useCartContext';
import { useRouter } from 'next/navigation';


/**
 * Cart items summmary form
 */
const CartSummary = () => {

  const router = useRouter();
  const ctx = useCartContext();

  const total = ctx.items.reduce((acc, curr) => acc + curr.qty * curr.price, 0)
  const discount = ctx.items.reduce((acc, curr) => acc + curr.price * curr.salePercentage * curr.qty, 0)
  return (
    <div className={style.wrapper}>
      <span>Order Summary</span>
      <div>
        <span>Price</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <div>
        <span>Discount</span>
        <span>${discount.toFixed(2)}</span>
      </div>

      <div>
        <span>Shipping</span>
        <span>Free</span>
      </div>

      <div>
        <span>Coupon Applied</span>
        <span>$0.00</span>
      </div>

      <hr />

      <div>
        <span>total</span>
        <span>${(total - discount).toFixed(2)}</span>
      </div>

      <Button onClick={() => router.push('/checkout')}>Proceed to Checkout</Button>
    </div>
  )
}

export default CartSummary;