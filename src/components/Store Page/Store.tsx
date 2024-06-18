'use client'
// --- style
import style from './Store.module.css';
// --- components
import SortButton from './SortButton';
import StoreItem from './StoreItem';
// --- tyoes
import { IProduct } from '@/src/lib/types/entities';

interface IProps {
  products: IProduct[]
}
/**
 * Store Component containing grid of Product cards
 */
const Store = ({ products }: IProps) => {

  return (
    <section className={style.wrapper}>
      {/* -=-=-=-=- Sort Button -=-=-=-=- */}
      <div className={style.sortWrapper}>
        <span>Sort By:</span>
        <SortButton />
      </div>

      {/* -=-=-=-=- Store Grid -=-=-=-=- */}
      <div className={style.storeWrapper}>
        {products.length !== 0 && products.map((item) =>
          <StoreItem
            key={item.id}
            id={item.id}
            src={item.imgUrl}
            name={item.name}
            price={item.price}
            category={item.category}
            sale={item.salePercentage} />
        )}
      </div>
    </section>
  )
}

export default Store;