import Cart from '../../Icons/Cart';
import style from './StoreItem.module.css';

const StoreItem = ({ src, name, price, category, description }) => {

  return (
    <div className={style.wrapper}>
      <img src={src} alt={name} />
      <div className={style.description}>
        <span>{category}</span>
        <span>{name}</span>
        <span>{description}</span>
        <span>${price.toFixed(2)}</span>
      </div>
      <button className={style.cartWrapper}>
        <Cart className={style.cartIcon} />
      </button>
    </div>
  )
}

export default StoreItem;