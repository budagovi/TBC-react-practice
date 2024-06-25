// --- style
import style from './ProfileAddresses.module.css';
// --- react api
import { memo } from 'react';
// --- types
import type { IAddress, IUser } from '@/src/lib/types/entities';
// --- components
import AddressItem from './AddressItem';
// --- react-icons
import { getScopedI18n } from '@/src/lib/next-internationalization/server';
import NewAddressModaForm from './NewAddressModalForm';

interface IProps {
  addresses: IAddress[],
  user: IUser
}

/**
 * User's address book
 */
const ProfileAddresses = memo(async function
  ProfileAddresses({
    addresses,
    user
  }: IProps) {

  const t = await getScopedI18n('/profile.addresses')

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
      <NewAddressModaForm user={user} />
    </div>
  )
})

export default ProfileAddresses;