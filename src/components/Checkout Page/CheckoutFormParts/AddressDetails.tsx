'use client'
// --- style
import style from '../CheckoutForm.module.css';
// --- react api
import { ChangeEvent, memo } from 'react';
// --- types
import type { IAddress } from '@/src/lib/types/entities';
// --- components
import AddressItem from '../AddressItem';
// --- next-internationalization
import { useScopedI18n } from '@/src/lib/next-internationalization/client';

interface IProps {
  currSlide: number,
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void,
  addresses: IAddress[],
  userId: number
}

/**
 * Part of checkout form component ( should not be used in other components! )
 * - City
 * - address
 */
const AddressDetails = memo(function
  AddressDetails({
    currSlide,
    changeHandler,
    addresses
  }: IProps) {

  const t = useScopedI18n('/checkout');

  return (
    <div className={`
      ${style.slideShown} 
      ${currSlide === 0 ? style.slideHidden : null} 
      ${style.embla__slide}
    `}>
      {addresses.length > 0 ?
        addresses.map((address, idx) =>
          <AddressItem
            key={idx}
            address={address}
            id={idx.toString()}
            changeHandler={changeHandler}
          />)
        : <span>{t('no addresses')}</span>
      }
    </div>
  )
})

export default AddressDetails;