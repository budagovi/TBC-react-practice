import CartIcon from '../../icons/Cart';
import style from './StoreItem.module.css';
import Link from 'next/link';

const StoreItem = ({ src, name, price, category, sale, id }: {
  src: string,
  name: string,
  price: number,
  category: string,
  sale: number,
  id: number
}) => {
  let priceTag = <span>${price.toFixed(2)}</span>
  if (sale) {
    priceTag = (
      <span>
        <span className={style.salePrice}>${(price * (100 - sale) / 100).toFixed(2)}</span>
        <span className={style.oldPrice}>${price.toFixed(2)} </span>
      </span>
    )
  }

  return (
    <Link href={'./store/' + id}>
      <div className={style.wrapper}>
        <div className={style.imgWrapper}>
          <img src={src} alt={name} />
        </div>
        <div className={style.description}>
          <span>{category}</span>
          <span>{name}</span>
          {priceTag}
        </div>
        <span className={style.saleTag}>-{Math.ceil(sale)}%</span>
        <button className={style.cartWrapper}>
          <CartIcon className={style.cartIcon} />
        </button>
      </div>
    </Link>
  )
}

export default StoreItem;