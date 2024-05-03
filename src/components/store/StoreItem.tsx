import { useRouter } from 'next/navigation';
import CartIcon from '../../icons/Cart';
import style from './StoreItem.module.css';

// const StoreItem = ({ src, name, price, category, sale }) => {

//   let priceTag = <span>${price.toFixed(2)}</span>
//   if (sale) {
//     priceTag = (
//       <span>
//         <span className={style.oldPrice}>${price.toFixed(2)} </span>
//         <span className={style.salePrice}>${sale.toFixed(2)}</span>
//       </span>
//     )
//   }

//   return (
//     <div className={style.wrapper}>
//       <img src={src} alt={name} />
//       <div className={style.description}>
//         <span>{category}</span>
//         <span>{name}</span>
//         {priceTag}
//       </div>
//       <button className={style.cartWrapper}>
//         <CartIcon className={style.cartIcon} />
//       </button>
//     </div>
//   )
// }


const StoreItem = ({ src, name, price, category, sale, id }: {
  src: string,
  name: string,
  price: number,
  category: string,
  sale: number,
  id:number
}) => {

  const router = useRouter()

  const clickHandler = () => {
    router.push('./store/' + id)
  }

  let priceTag = <span>${price.toFixed(2)}</span>
  if (sale) {
    priceTag = (
      <span>
        <span className={style.oldPrice}>${price.toFixed(2)} </span>
        <span className={style.salePrice}>${(price * (100-sale)/100).toFixed(2)}</span>
      </span>
    )
  }

  return (
    <div className={style.wrapper} onClick={clickHandler}>
      <div className={style.imgWrapper}>
        <img src={src} alt={name} />
      </div>
      <div className={style.description}>
        <span>{category}</span>
        <span>{name}</span>
        {priceTag}
      </div>
      <button className={style.cartWrapper}>
        <CartIcon className={style.cartIcon} />
      </button>
    </div>
  )
}

export default StoreItem;