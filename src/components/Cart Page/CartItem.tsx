// *
// * Cart Item (as Table Row)
// *

// --- CSS
import style from './CartItem.module.css';
// --- Types
import { ICartItem } from '@/src/interfaces/cart-context';
// --- Hooks
import useCartContext from '@/src/hooks/useCartContext';
// -- Components
import ItemActions from './ItemActions';

interface IProps {
  item: ICartItem
}
const CartItem = ({ item }: IProps) => {

  const { title, price, discountPercentage, amount } = item;
  const pr = (price / 100 * discountPercentage).toFixed(2)

  const ctx = useCartContext();

  const addItemHandler = () => {
    ctx.addItem({ ...item, amount: 1 })
  }

  const removeItemHandler = () => {
    ctx.removeItem(item.id)
  }


  return (
    <tr className={style.wrapper}>
      <td>{title}</td>
      <td>${pr}</td>
      <td>
        <ItemActions
          increaseItem={addItemHandler}
          decreaseItem={removeItemHandler}
        >
          {amount}
        </ItemActions>
      </td>
      <td>{(+pr * amount).toFixed(2)}</td>
    </tr>
  )
}

export default CartItem