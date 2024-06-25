'use client'
// --- style
import parentStyle from '../CheckoutForm.module.css';
import style from './Shippings.module.css';
// --- react api
import { ChangeEvent, memo } from 'react';
// --- next-internationalization
import { useScopedI18n } from '@/src/lib/next-internationalization/client';

interface IProps {
  currSlide: number,
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void,
}

/**
 * Part of checkout form component ( should not be used in other components! )
 * - shippings
 */
const Shippings = memo(function
  Shippings({
    currSlide,
    changeHandler,
  }: IProps) {

  const t = useScopedI18n('/checkout');

  return (
    <div className={`
      ${parentStyle.slideShown} 
      ${currSlide === 1 ? parentStyle.slideHidden : null} 
      ${parentStyle.embla__slide}
    `}>
      <label htmlFor="free" className={style.itemWrapper}>
        <input
          type="radio"
          name="shippingMethod"
          value='free shipping'
          id='free'
          onChange={changeHandler}
        />
        <span></span>
        <span>{t('free')}</span>
        <span>{t('regular')}</span>
      </label>
      <label htmlFor="priority" className={style.itemWrapper}>
        <input
          type="radio"
          name="shippingMethod"
          value='priority shipping'
          id='priority'
          onChange={changeHandler}
        />
        <span></span>
        <span>$8.5</span>
        <span>{t('priority')}</span>
      </label>
    </div>
  )
})

export default Shippings;