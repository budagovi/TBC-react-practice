// --- style
import style from '../CheckoutForm.module.css';
// --- react api
import { ChangeEvent, memo } from 'react';
// --- react-icons
import { FiPlus } from 'react-icons/fi';
// --- components
import PaymentItem from '../PaymentItem';
// --- types
import type { ICreditCard } from '@/src/lib/types/entities';
// --- next-internationalization
import { useScopedI18n } from '@/src/lib/next-internationalization/client';

interface IProps {
  currSlide: number,
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void,
  creditCards: ICreditCard[]
}

/**
 * Part of checkout form component ( should not be used in other components! )
 * - payment
 */
const Payments = memo(function
  Payments({
    currSlide,
    changeHandler,
    creditCards: cards
  }: IProps) {

  const t = useScopedI18n('/checkout');

  return (
    <div className={`
      ${style.slideShown} 
      ${currSlide === 2 ? style.slideHidden : null} 
      ${style.embla__slide}
    `}>
      {cards.length > 0 ?
        cards.map((card, idx) =>
          <PaymentItem
            key={idx}
            card={card}
            id={idx.toString()}
            changeHandler={changeHandler}
          />)
        : <span>{t('no payments')}</span>
      }
      <button><FiPlus />{t('add payment')}</button>
    </div>
  )
})

export default Payments;