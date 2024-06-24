'use client'
// --- style
import style from './PaymentItem.module.css';
// --- types
import type { ICreditCard } from '@/src/lib/types/entities';
// --- react-icons
import { CiCreditCard2 } from "react-icons/ci";
// --- utils
import { maskHalfString } from '@/src/utilities/helpers/hideString';
// --- react api
import { ChangeEvent } from 'react';
// --- next-internationalization
import { useScopedI18n } from '@/src/lib/next-internationalization/client';

interface IProps {
  card: ICreditCard,
  id: string,
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

const PaymentItem = ({ card, id, changeHandler }: IProps) => {

  const t = useScopedI18n('/checkout');

  return (
    <div className={style.wrapper}>
      <label htmlFor={'p' + id}>
        <input
          type="radio"
          name="paymentMethod"
          id={'p' + id}
          onChange={changeHandler}
          value={card.cardId}
        /> <span></span>
        <CiCreditCard2 />
        <span>{maskHalfString(card.cardId)}</span>
        <span>{t('expires.0')} {card.expires.split('T')[0].substring(5).replace('-', '/')}{t('expires.1')}</span>
      </label>
      <button>{t('remove')}</button>
    </div>
  )
}

export default PaymentItem;