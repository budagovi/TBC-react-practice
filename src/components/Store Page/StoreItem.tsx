// *
// * Store Item (Grid Element)
// *

// --- CSS
import style from './StoreItem.module.css';
// --- Hooks
import useCartContext from '@/src/hooks/useCartContext';

interface IProps {
  src: string,
  name: string,
  price: number,
  category: string,
  sale: number,
  id: number
}

const StoreItem = (props: IProps) => {

  const { src, name, price, category, sale, id } = props;
  const ctx = useCartContext();

  let priceTag = <span>${price}</span>
  if (sale) {
    priceTag = (
      <span>
        <span className={style.salePrice}>${(price * (100 - sale) / 100)}</span>
        <span className={style.oldPrice}>${+price} </span>
      </span>
    )
  }

  const addItemHandler = () => {
    ctx.addItem({
      id: id,
      title: name,
      price: +((price * (100 - sale) / 100)),
      discountPercentage: sale,
      category: category,
      amount: 1
    })
  }

  return (
    <div className={style.wrapper}>
      <div className={style.imgWrapper}>
        <img src={src} alt={name} />
      </div>
      <div className={style.description}>
        <span>{category}</span>
        <span>{name}</span>
        {priceTag}
      </div>
      {sale > 0 && <span className={style.saleTag}>-{100*sale}%</span> }
      <button className={style.cartWrapper} onClick={addItemHandler}>
        <img src="./icons/heart.svg" alt="" />
      </button>
    </div>
  )
}

export default StoreItem;