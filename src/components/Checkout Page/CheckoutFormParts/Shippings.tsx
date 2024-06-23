import { ChangeEvent, memo } from 'react';
import style from '../CheckoutForm.module.css';

interface IProps {
  currSlide: number,
  shippingMethod: string | number | readonly string[] | undefined,
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void,
  formSubmitted?: boolean
}

/**
 * Part of checkout form component ( should not be used in other components! )
 * - shippings
 */
const Shippings = memo(function
  Shippings({
    currSlide,
    shippingMethod,
    changeHandler,
    //formSubmitted
  }: IProps) {

  return (
    <div className={`
      ${style.slideShown} 
      ${currSlide === 1 ? style.slideHidden : null} 
      ${style.embla__slide}
    `}>
      <div>
        <label htmlFor="1">Free</label>
        <input type="radio" name="shippingMethod" id="1" onChange={changeHandler} value={shippingMethod} />
      </div>
      <div>
        <label htmlFor="2">Priority</label>
        <input type="radio" name="shippingMethod" id="2" onChange={changeHandler} value={shippingMethod} />
      </div>
      <div>
        <label htmlFor="3">Schedule</label>
        <input type="radio" name="shippingMethod" id="3" onChange={changeHandler} value={shippingMethod} />
      </div>
    </div>
  )
})

export default Shippings;