import { IAddress } from '@/src/lib/types/entities';
import style from './AddressItem.module.css';
import { ChangeEvent } from 'react';
// --- next-internationalization
import { useScopedI18n } from '@/src/lib/next-internationalization/client';

interface IProps {
  address: IAddress,
  id: string,
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

const AddressItem = ({ address, id, changeHandler }: IProps) => {

  const t= useScopedI18n('/checkout');

  const fullAddress = address.city + ', ' + address.address;
  return (
    <div className={style.wrapper}>
      <label htmlFor={id}>
        <input
          type="radio"
          name="address"
          value={fullAddress}
          id={id}
          onChange={changeHandler}
        />
        <span></span>
        <div className={style.info}>
          <div className={style.infoHeader}>
            <span>{address.city}</span>
            <span>{address.tag}</span>
          </div>
          <p>{address.address}</p>
          <span><b>{t('contact')} : </b>{address.mobile}</span>
        </div>
      </label>
      <div className={style.actions}>
        <button type='button'>{t('edit')}</button>
        <button type='button'>{t('remove')}</button>
      </div>
    </div>
  )
}

export default AddressItem;