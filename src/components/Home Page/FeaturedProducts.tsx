'use client';
// -- style
import style from './FeaturedProducts.module.css';
// --- UI
import SliderSection from '@/src/UI/Slider Section/SliderSection';
import SectionLabel from '@/src/UI/Section Label/SectionLabel';
// --- react api
import { useState, useEffect } from "react";
// types
import { IProduct } from "@/src/lib/types/entities";
// --- components
import ProductCard from '../Store Page/ProductCard';
// --- next-internationalization
import { useScopedI18n } from '@/src/lib/next-internationalization/client';

// for filtering section
interface IProps { }

/**
 * Featured products component
 */
const FeaturedProducts = ({ }: IProps) => {

  const t = useScopedI18n('/');

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (err) {
        setProducts([]);
      }
    };

    fetchData();
  }, []);


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
              price={item.price}
              category={item.category}
              sale={item.salePercentage}
            />
          </div>
        ))
        }
      </SliderSection>
    </div>
  );
};

export default FeaturedProducts;
