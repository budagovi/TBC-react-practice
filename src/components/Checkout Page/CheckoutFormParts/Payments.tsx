// --- style
import parentStyle from '../CheckoutForm.module.css';
import style from './Payments.module.css';
// --- react api
import { ChangeEvent, Dispatch, SetStateAction, memo, useCallback, useState } from 'react';
// --- next-internationalization
import { useScopedI18n } from '@/src/lib/next-internationalization/client';
// --- utils
import { formatCVC, formatCardNumber, formatExpiryDate } from '@/src/utilities/helpers/cardFormatters';
import { ICheckoutFormData } from '@/src/lib/types/forms';

const initialState = {
  cardNum: '',
  expiry: '',
  cvc: ''
}

interface IProps {
  currSlide: number,
  setIsValid: Dispatch<SetStateAction<ICheckoutFormData>>
}

/**
 * Part of checkout form component ( should not be used in other components! )
 * - payment
 */
const Payments = memo(function
  Payments({
    currSlide,
    setIsValid
  }: IProps) {

  const t = useScopedI18n('/checkout');

  const [values, setValues] = useState(initialState)
  const cardChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let newValue = value;
    if (name === 'cvc')
      newValue = formatCVC(value);
    else if (name === 'cardNum')
      newValue = formatCardNumber(value)
    else if (name === 'expiry')
      newValue = formatExpiryDate(value);

    setValues((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));


  }, []);

  setIsValid(prevState => ({ ...prevState, cardIsValid: values.cardNum.length === 16 && values.cvc.length === 3 && values.expiry.length === 5 }))




  // const elements = useElements();

  return (
    <div className={`
      ${parentStyle.slideShown} 
      ${currSlide === 2 ? parentStyle.slideHidden : null} 
      ${parentStyle.embla__slide}
    `}>
      <div className={style.wrapper}>
        <div className={style.inputWrapper}>
          <label className={style.label} htmlFor="cardNumber">{t('card number')}</label>
          <input
            className={style.input}
            name="cardNum"
            type="text"
            value={values.cardNum}
            onChange={cardChangeHandler}
            placeholder="Card Number"
            maxLength={16}
            required
          />
        </div>
        <div className={style.twoInputs}>
          <div className={style.inputWrapper}>
            <label className={style.label} htmlFor="expiry">{t('expiry')}</label>
            <input
              className={style.input}
              name="expiry"
              type="text"
              value={values.expiry}
              onChange={cardChangeHandler}
              placeholder="MM/YY"
              required
            />
          </div>
          <div className={style.inputWrapper}>
            <label className={style.label} htmlFor="cvc">CVC</label>
            <input
              className={style.input}
              name="cvc"
              type="text"
              value={values.cvc}
              onChange={cardChangeHandler}
              placeholder="CVC"
              maxLength={3}
              required
            />
          </div>
        </div>
      </div>
    </div>
  )
})

export default Payments;