// -- style
import style from './ProductDetails.module.css';
// --- types
import { IProduct } from '@/src/lib/types/entities';
// --- react-icons
import { MdDone } from "react-icons/md";
// --- components
import ProductImage from './ProductImage';
import ProductActions from './ProductActions';
// --- next api
import Link from 'next/link';
// --- next-internationalization
import { getCurrentLocale, getScopedI18n } from '@/src/lib/next-internationalization/server';

interface IProps {
  product: IProduct
}

/**
 * Box containing main product information (image, price, tags)
 */
const Product = async ({ product }: IProps) => {

  const t = await getScopedI18n('/product');
  const locale = getCurrentLocale();

  let price = <span className={style.price}>${product.price}</span>
  if (product.salePercentage > 0)
    price = (
      <div className={style.salePrice}>
        <span className={style.price}>${(product.price * (1 - product.salePercentage)).toFixed(2)}</span>
        <span className={style.oldPrice}>${product.price}</span>
      </div>
    )

  return (
    <div className={style.wrapper}>
      <ProductImage
        imgUrl={product.imgUrl}
        name={product.name}
      />
      <div className={style.information}>
        <h2>{locale === 'en' ? product.name : product.nameGe}</h2>
        {price}
        <ProductActions />
        <hr className='light' />
        <table>
          <tbody>
            <tr>
              <th>{t('category')}:</th>
              <th> <Link href={'/store?category=' + product.category}> {t(product.category)}</Link></th>
            </tr>
            <tr>
              <th>{t('growth')}:</th>
              <th> <Link href={'/store?tags=' + product.category}>{t(product.growthRate)}</Link></th>
            </tr>
            <tr>
              <th>{t('flowering')}:</th>
              <th> <Link href={'/store?tags=' + product.flowering}>{t(product.flowering)}</Link></th>
            </tr>
          </tbody>
        </table>
        <div className={style.shippingWrapper}>
          <p>{t('free shipping')}</p>
          <span>
            <MdDone className={style.icon} />
            {t('money back')}
          </span>
          <span>
            <MdDone className={style.icon} />
            {t('refund')}
          </span>
          <span>
            <MdDone className={style.icon} />
            {t('payment')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Product;
