'use client'
import { useState } from 'react';
// --- style 
import style from './ProductNav.module.css';
import ProductReviews from './Reviews';
import { useCurrentLocale, useScopedI18n } from '@/src/lib/next-internationalization/client';

interface IProps {
  descriptionText: string,
  descriptionTextGe: string,
}
const ProductNav = ({ descriptionText, descriptionTextGe }: IProps) => {
  const t = useScopedI18n('/product')
  const locale = useCurrentLocale();

  const [currSlide, setCurrSlide] = useState(0);

  const description = (
    <div className={style.description} key={'description'}>
      {locale === 'en' ? descriptionText : descriptionTextGe}
    </div>
  )

  const slides = [description, <ProductReviews key={'reviews'} />]

  return (
    <div className={style.wrapper}>
      <ul>
        <button onClick={() => setCurrSlide(0)}>
          <li className={currSlide === 0 ? style.active : ''}>{t('description')}</li>
        </button>
        <button onClick={() => setCurrSlide(1)}>
          <li className={currSlide === 1 ? style.active : ''}>{t('reviews')} (0)</li>
        </button>
      </ul>
      {slides[currSlide]}
    </div>
  )
}

export default ProductNav;