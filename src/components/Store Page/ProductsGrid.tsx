// --- style
import style from './ProductsGrid.module.css'
// --- compoennts
import ProductCard from './ProductCard'
// --- types
import { IProduct } from "@/src/lib/types/entities"
import { getScopedI18n } from '@/src/lib/next-internationalization/server'

interface IProps {
  products: IProduct[]
}

/**
 * Store Grid, that displays product cards
 * @param products array of type IProduct
 */
const ProductsGrid = async ({ products }: IProps) => {

  const t = await getScopedI18n('/store');

  return (
    <div className={style.wrapper} >
      {
        products.length > 0 ? products.map((item) =>
          <ProductCard
            key={item.id}
            id={item.id}
            src={item.imgUrl}
            name={item.name}
            nameGe={item.nameGe}
            price={item.price}
            category={item.category}
            sale={item.salePercentage} 
            imgUrl={item.imgUrl}
            />
        ) : <span>{t('no products')}</span>
      }
    </div>
  )
}

export default ProductsGrid;