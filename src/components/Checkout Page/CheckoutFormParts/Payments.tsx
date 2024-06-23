import { ChangeEvent, memo } from 'react';
import style from '../CheckoutForm.module.css';

interface IProps {
  currSlide: number,
  paymentMethod: string | number | readonly string[] | undefined,
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void,
  formSubmitted?: boolean
}

/**
 * Part of checkout form component ( should not be used in other components! )
 * - payment
 */
const Payments = memo(function
  Payments({
    currSlide,
    paymentMethod,
    changeHandler,
    formSubmitted
  }: IProps) {

  return (
    <div className={`
      ${style.slideShown} 
      ${currSlide === 2 ? style.slideHidden : null} 
      ${style.embla__slide}
    `}>
      <div>
        <label htmlFor="1">Card</label>
        <input type="radio" name="paymentMethod" id="1" onChange={changeHandler} value={paymentMethod} />
      </div>
      <div>
        <label htmlFor="2">Cash</label>
        <input type="radio" name="paymentMethod" id="2" onChange={changeHandler} value={paymentMethod} />
      </div>
    </div>
  )
})

export default Payments;