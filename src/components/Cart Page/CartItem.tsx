// *
// * Cart Item (as Table Row)
// *

// --- CSS
import style from './CartItem.module.css';
// --- Types
import { ICartItem } from '@/src/lib/types/cart-context';
// --- Hooks
import useCartContext from '@/src/hooks/useCartContext';
// -- Components
import ItemActions from './ItemActions';

interface IProps {
  item: ICartItem
}
const CartItem = ({ item }: IProps) => {

  const { name, price, salePercentage, qty } = item;
  const pr = (price / 100 * salePercentage).toFixed(2)

  const ctx = useCartContext();

  const addItemHandler = () => {
    ctx.addItem({ ...item, qty: 1 })
  }

  const removeItemHandler = () => {
    ctx.removeItem(item.id)
  }


  return (
    <tr className={style.wrapper}>
      <td>{name}</td>
      <td>${pr}</td>
      <td>
        <ItemActions
          increaseItem={addItemHandler}
          decreaseItem={removeItemHandler}
        >
          {qty}
        </ItemActions>
      </td>
      <td>{(+pr * qty).toFixed(2)}</td>
    </tr>
  )
}

export default CartItem