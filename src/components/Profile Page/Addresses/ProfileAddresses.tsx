'use client'
// --- style
import style from './ProfileAddresses.module.css';
// --- react api
import { memo, useState } from 'react';
// --- types
import type { IAddress, IUser } from '@/src/lib/types/entities';
// --- components
import AddressItem from './AddressItem';
import NewAddressModaForm from './NewAddressModalForm';
// --- next-international
import { useScopedI18n } from '@/src/lib/next-internationalization/client';

interface IProps {
  addresses: IAddress[],
  user: IUser
}

/**
 * User's address book
 */
const ProfileAddresses = memo(function
  ProfileAddresses({
    addresses: a,
    user
  }: IProps) {

  const t = useScopedI18n('/profile.addresses')
  const [addresses, setAddresses] = useState(a)

  const addAddress = (newAddress: IAddress) => {
    setAddresses(prevState => prevState.concat(newAddress))
  }

  const removeAddress = (id: number) => {
    setAddresses(prevState => prevState.filter(a => a.id != id))
  }

  return (
    <div className={style.wrapper}>
      {addresses.length > 0 ?
        addresses.map((address) =>
          <AddressItem
            key={address.id}
            address={address}
            onRemoveAddress={removeAddress}
          />)
        : <span>{t('no addresses')}</span>
      }
      <NewAddressModaForm user={user} onAddAddress={addAddress} />
    </div>
  )
})

export default ProfileAddresses;