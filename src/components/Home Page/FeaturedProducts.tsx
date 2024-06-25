// -- style
import style from './FeaturedProducts.module.css';
// --- UI
import SliderSection from '@/src/UI/Slider Section/SliderSection';
import SectionLabel from '@/src/UI/Section Label/SectionLabel';
// types
import { IProduct } from "@/src/lib/types/entities";
// --- components
import ProductCard from '../Store Page/ProductCard';
// --- next-internationalization
import { getScopedI18n } from '@/src/lib/next-internationalization/server';

// for filtering section
interface IProps {
  products: IProduct[]
}

/**
 * Featured products component
 */
const FeaturedProducts = async ({ products }: IProps) => {

  const t = await getScopedI18n('/');

  return (
    <div className={style.wrapper}>
      <SectionLabel>{t('todays')}</SectionLabel>
      <SliderSection
        title={t('flah sales')}
        btnText={t('view all')}
        linkTo='/store'
      >
        {products.filter(item => item.salePercentage > 0).map(item => (
          <div key={item.id}>
            <ProductCard
              id={item.id}
              src={item.imgUrl}
              name={item.name}
              nameGe={item.nameGe}
              price={item.price}
              category={item.category}
              sale={item.salePercentage}
              imgUrl={item.imgUrl}
            />
          </div>
        ))
        }
      </SliderSection>
    </div>
  );
};

export default FeaturedProducts;
