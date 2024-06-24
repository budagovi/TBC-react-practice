// --- style
import style from '@/src/app/layouts.module.css';
// --- components
import CartSummary from '@/src/components/Cart Page/CartSummary';


interface IProps {
  children: React.ReactNode
}

const CartLayout = ({ children }: IProps) => {
  return (
    <main className={style.cart_layout} >
      <div>
        {children}
      </div>
      {/* -=-=-=-=- Pre-Order Summary -=-=-=-=- */}
      <CartSummary />
    </main>
  )
}

export default CartLayout;