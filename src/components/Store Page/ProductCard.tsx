'use client'
// --- style
import style from './ProductCard.module.css';
// --- Hooks
import useCartContext from '@/src/hooks/useCartContext';
// --- react-icons
import { FaCartPlus } from "react-icons/fa6";
// --- next-internationalization
import { useCurrentLocale, useScopedI18n } from '@/src/lib/next-internationalization/client';
// --- next api
import Link from 'next/link';
// --- helpers
import formatProductPathSegment from '@/src/utilities/helpers/formatProductPathSegment';

interface IProps {
  src: string,
  name: string,
  nameGe: string,
  price: number,
  category: string,
  sale: number,
  id: number
}

/**
 * Product card component (Store grid item)
 * @param product - some properties of type IProduct
 */
const ProductCard = (props: IProps) => {

  const { src, name, nameGe, price, category, sale, id } = props;
  const ctx = useCartContext();

  // deal with languages
  const locale = useCurrentLocale();
  const t = useScopedI18n('/store');
  const isEng = locale === 'en';
  const productName = isEng ? name : nameGe;
  const productCategory = isEng ? category : t(category as 'plant' | 'bonsai' | 'cactus')

  let priceTag = <span>${(+price).toFixed(2)}</span>
  if (sale > 0) {
    priceTag = (
      <span>
        <span className={style.salePrice}>${(price * (1 - sale)).toFixed(2)}</span>
        <span className={style.oldPrice}>${(+price).toFixed(2)} </span>
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
    <Link href={'/store/' + formatProductPathSegment(name, id)} className={style.wrapper}>
      <div className={style.imgWrapper}>
        <img src={src} alt={name} />
      </div>
      <div className={style.description}>
        <span>{productCategory}</span>
        <span>{productName}</span>
        {priceTag}
      </div>
      {sale > 0 && <span className={style.saleTag}>-{100 * sale}%</span>}
      <button className={style.cartWrapper} onClick={addItemHandler}>
        <FaCartPlus className={style.cartIcon} />
      </button>
    </Link>
  )
}

export default ProductCard;