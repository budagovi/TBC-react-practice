'use client'
import Button from '@/src/UI/Button/Button';
// --- style
import style from './CartSummary.module.css';
// --- hooks
import useCartContext from '@/src/hooks/useCartContext';
import useIsClient from '@/src/hooks/useIsClient';
// --- next api
import { usePathname, useRouter } from 'next/navigation';
// --- next-international
import { useScopedI18n } from '@/src/lib/next-internationalization/client';


/**
 * Cart items summmary form
 */
const CartSummary = () => {

  const t = useScopedI18n('/cart');

  const router = useRouter();
  const ctx = useCartContext();
  const pathname = usePathname();

  const total = ctx.items.reduce((acc, curr) => acc + curr.qty * curr.price, 0)
  const discount = ctx.items.reduce((acc, curr) => acc + curr.price * curr.salePercentage * curr.qty, 0)
  const isClient = useIsClient();

  if (!isClient)
    return null;

  return (
    <div className={style.wrapper}>
      <span>{t('summary')}</span>
      <div>
        <span>{t('price')}</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <div>
        <span>{t('discount')}</span>
        <span>${discount.toFixed(2)}</span>
      </div>

      <div>
        <span>{t('shipping')}</span>
        <span>{t('free')}</span>
      </div>

      <div>
        <span>{t('coupon applied')}</span>
        <span>$0.00</span>
      </div>

      <hr />

      <div>
        <span>{t('total')}</span>
        <span>${(total - discount).toFixed(2)}</span>
      </div>

      {pathname === '/cart' &&
        <Button
          disabled={ctx.items.length === 0}
          onClick={
            () => router.push('/cart/checkout')
          }
        >
          {t('proceed to checkout')}
        </Button>}
    </div>
  )
}

export default CartSummary;