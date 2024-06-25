'use client'
// --- style
import style from './CheckoutForm.module.css';
// --- nextjs/react api
import { ChangeEvent, useState, useCallback, useEffect } from 'react';
// --- next-internationalization api
import { useScopedI18n } from '@/src/lib/next-internationalization/client';
// --- react-icons
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
// --- embla-carousel-react
import useEmblaCarousel from 'embla-carousel-react';
// --- components
import AddressDetails from './CheckoutFormParts/AddressDetails';
import Shippings from './CheckoutFormParts/Shippings';
import Payments from './CheckoutFormParts/Payments';
// --- antd
import { App } from 'antd';
// --- types
import type { ICheckoutFormData } from '@/src/lib/types/forms';
// --- validators
import CheckoutSteps from './CheckoutSteps';
// --- context
import useCartContext from '@/src/hooks/useCartContext';
// --- next api
import { useRouter } from 'next/navigation';
// --- tyoes
import type { IAddress, ICreditCard, IOrder, IUser } from '@/src/lib/types/entities';

const initialFormValue: ICheckoutFormData = {
  address: undefined,
  shippingMethod: undefined,
  cardIsValid: false,
}

interface IProps {
  user: IUser,
  addresses: IAddress[],
  creditCards: ICreditCard[]
}

/**
 * Checkout sliding form custom component (using emblda Carousel)
 */
const CheckoutForm = ({ user, addresses }: IProps) => {
  // -=-=-=- Internationalization -=-=-=-

  const t = useScopedI18n('/checkout')

  // -=-=-=- Form State -=-=-=-

  const [values, setValues] = useState(initialFormValue)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { message } = App.useApp()
  const ctx = useCartContext();
  const router = useRouter();

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  }, []);

  const submitHandler = async () => {
    setIsSubmitting(true)
    const key = 'updatable message';
    message.open({
      key,
      type: 'loading',
      content: t('loading msg'),
      duration: 3
    })


    try {

      const total = ctx.items.reduce((acc, curr) => acc + curr.qty * curr.price, 0)

      const data: IOrder = {
        userId: user.id,
        totalAmount: ctx.totalAmount,
        items: ctx.items,
        totalPrice: total,
        created: ''
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data
        })
      })

      if (response.ok) {
        ctx.clearCart();
        message.open({
          key,
          type: 'success',
          content: t('success msg'),
          duration: 4
        })
        router.replace('/store')
        return;
      }

      throw new Error('something went wrong')
    } catch (e) {
      message.open({
        key,
        type: 'error',
        content: t('error msg'),
        duration: 2
      })
      console.log(e) // "something went wrong"
    } finally {
      setIsSubmitting(false)
    }
  }

  // -=-=-=- Carousel Fucntionality -=-=-=-

  const [emblaRef, emblaApi] = useEmblaCarousel({ skipSnaps: true, watchDrag: false })
  const [slideNum, setSlideNum] = useState(0)
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(true)

  // disabling nextBtn if current slide's one field at least is invalid
  useEffect(() => {
    if (slideNum === 0)
      setIsNextBtnDisabled(values.address === undefined)
    else if (slideNum === 1)
      setIsNextBtnDisabled(values.shippingMethod === undefined)
    else if (slideNum === 2)
      setIsNextBtnDisabled(values.cardIsValid === false)
  }, [values, setIsNextBtnDisabled, slideNum])

  const scrollPrev = useCallback(() => {
    setSlideNum(prevState => prevState - 1)
    if (emblaApi)
      emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {

    if (isNextBtnDisabled) {
      return
    }

    setSlideNum(prevState => prevState + 1)

    if (emblaApi)
      emblaApi.scrollNext()
  }, [emblaApi, isNextBtnDisabled, slideNum])

  return (
    <div className={`${style.wrapper} ${isSubmitting ? style.loading : ''}`}>
      <CheckoutSteps current={slideNum} />
      <form className={style.wrapper}>

        {/*   -=-=-=- Form Inputs (Carousel) -=-=-=-   */}

        <div className={style.embla} ref={emblaRef}>
          <div className={style.embla__container}>

            {/* Slide 1 - Address Details */}
            <AddressDetails
              currSlide={slideNum}
              changeHandler={changeHandler}
              addresses={addresses}
              user={user}
            />

            {/* Slide 2 - Shipping Details */}
            <Shippings
              currSlide={slideNum}
              changeHandler={changeHandler}
            />

            {/* Slide 3 - Payment Details */}
            <Payments
              currSlide={slideNum}
              setIsValid={setValues}
            />

          </div>
        </div>

        {/*   -=-=-=- Form Actions -=-=-=-   */}

        <div className={style.actions}>
          <button
            disabled={slideNum === 0}
            type='button'
            className={`${style.arrowBtn} ${slideNum === 0 && style.hide}`}
            onClick={scrollPrev}
          >
            <MdArrowBackIos className={style.arrow} />
            <span>
              {t('back')}
            </span>
          </button>
          <button
            disabled={isNextBtnDisabled}
            type='button'
            className={`${style.arrowBtn} ${slideNum === 3 && style.hide}`}
            onClick={slideNum === 2 ? submitHandler : scrollNext}
          >
            <span>
              {slideNum === 2 ? t('submit') : t('continue')}
            </span>
            <MdArrowForwardIos className={style.arrow} />
          </button>
        </div>
      </form >
    </div>
  )
}

export default CheckoutForm;


