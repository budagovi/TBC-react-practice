'use client'
// --- style
import style from './ProfileAddresses.module.css';
// --- react api
import { memo } from 'react';
// --- types
import type { IAddress, IUser } from '@/src/lib/types/entities';
// --- components
import AddressItem from './AddressItem';
// --- react-icons
import { FiPlus } from 'react-icons/fi';
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
    addresses
  }: IProps) {

  const t = useScopedI18n('/profile.addresses')

  return (
    <div className={style.wrapper}>
      {addresses.length > 0 ?
        addresses.map((address, idx) =>
          <AddressItem
            key={idx}
            address={address}
            id={idx.toString()}
          />)
        : <span>{t('no addresses')}</span>
      }
            <button><FiPlus />{t('add address')}</button>
    </div>
  )
})

export default ProfileAddresses;