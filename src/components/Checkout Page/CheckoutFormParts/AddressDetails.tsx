'use client'
// --- style
import style from '../CheckoutForm.module.css';
// --- react api
import { ChangeEvent, memo, useState } from 'react';
// --- types
import type { IAddress, IUser } from '@/src/lib/types/entities';
// --- components
import AddressItem from '../../Profile Page/Addresses/AddressItem';
import NewAddressModaForm from '../../Profile Page/Addresses/NewAddressModalForm';
// --- next-internationalization
import { useScopedI18n } from '@/src/lib/next-internationalization/client';

interface IProps {
  currSlide: number,
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void,
  addresses: IAddress[],
  user: IUser
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
    addresses: a,
    user
  }: IProps) {
  const t = useScopedI18n('/checkout');

  const [addresses, setAddresses] = useState(a)

  const addAddress = (newAddress: IAddress) => {
    setAddresses(prevState => prevState.concat(newAddress))
  }

  const removeAddress = (id: number) => {
    setAddresses(prevState => prevState.filter(a => a.id != id))
  }

  return (
    <div className={`
      ${style.slideShown} 
      ${currSlide === 0 ? style.slideHidden : null} 
      ${style.embla__slide}
    `}>
      {addresses.length > 0 ?
        addresses.map((address) =>
          <label htmlFor={address.id + 'ad'} key={address.id}>
            <input
              type="radio"
              name='address'
              id={address.id + 'ad'}
              onChange={changeHandler}
              value={address.id}
            />
            <AddressItem
              address={address}
              onRemoveAddress={removeAddress}
            />
          </label>
        )
        : <span>{t('no addresses')}</span>
      }
      <NewAddressModaForm user={user} onAddAddress={addAddress} />
    </div>
  )
})

export default AddressDetails;