'use client'
// --- style
import style from './AddressItem.module.css';
// --- types
import type { IAddress } from '@/src/lib/types/entities';
// --- next-internationalization
import { useScopedI18n } from '@/src/lib/next-internationalization/client';
// --- antd
import { App } from 'antd';

interface IProps {
  address: IAddress,
  onRemoveAddress: (id: number) => void
}

/**
 * Individual Addres Component
 * @param IAddress I
 */
const AddressItem = ({ address, onRemoveAddress }: IProps) => {

  const t = useScopedI18n('/profile.addresses');


  const { message } = App.useApp();

  const clickHandler = async () => {
    try {
      const key = 'updatable';
      message.open({
        key,
        type: 'loading',
        content: t('loading msg delete'),
        duration: 3600
      })

      const response = await fetch(`/api/addresses/${address.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        message.open({
          key,
          type: 'success',
          content: t('success msg delete'),
          duration: 3
        })
        onRemoveAddress(address.id);
      } else {
        console.error('Failed to delete the address');
        message.open({
          key,
          type: 'error',
          content: t('failure msg delete'),
          duration: 3
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

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
      <button
        type='button'
        className={style.actions}
        onClick={clickHandler}
      >
        {t('remove')}
      </button>
    </div>
  )
}

export default AddressItem;