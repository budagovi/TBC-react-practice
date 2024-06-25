// --- style
import style from './AddressItem.module.css';
// --- types
import type { IAddress } from '@/src/lib/types/entities';
// --- next-internationalization
import { getScopedI18n } from '@/src/lib/next-internationalization/server';

interface IProps {
  address: IAddress,
  id: string,
}

/**
 * Individual Addres Component
 * @param IAddress I
 */
const AddressItem = async ({ address }: IProps) => {

  const t = await getScopedI18n('/profile.addresses');

  return (
    <div className={style.wrapper}>
      <div>
        <div className={style.info}>
          <div className={style.infoHeader}>
            <span>{address.city}</span>
            <span>{address.tag}</span>
          </div>
          <p>{address.address}</p>
          <span><b>{t('contact')} : </b>{address.mobile}</span>
        </div>
      </div>
      <div className={style.actions}>
        <button type='button'>{t('edit')}</button>
        <button type='button'>{t('remove')}</button>
      </div>
    </div>
  )
}

export default AddressItem;