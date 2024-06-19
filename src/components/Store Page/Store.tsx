// --- style
import style from './Store.module.css';
// --- components
import SortButton from './SortButton';
import FilterMenu from './FilterMenu';
import ProductsGrid from './ProductsGrid';
// --- types
import { IProduct } from '@/src/lib/types/entities';

interface IProps {
  products: IProduct[]
}

/**
 * Store Component containing grid of Product cards
 * @param products - array of type IProduct
 */
const Store = ({ products }: IProps) => {

  return (
    <section className={style.wrapper}>
      <FilterMenu />
      <div className={style.store}>
        <SortButton />
        <ProductsGrid products={products} />
      </div>
    </section>
  )
}

export default Store;