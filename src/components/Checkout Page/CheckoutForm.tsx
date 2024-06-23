'use client'
// --- style
import style from './CheckoutForm.module.css';
// --- UI
import Button from '@/src/UI/Button/Button';
import ProgressBar from '@/src/UI/ProgressBar/ProgressBar';
// --- nextjs/react api
import { ChangeEvent, useState, useCallback, useTransition, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import { Tooltip, App } from 'antd';
// --- utils
import formatPhoneNumber from '@/src/utilities/helpers/formatPhoneNumber';
// --- types
import type { ICheckoutFormData } from '@/src/lib/types/forms';
// --- validators
import { mobileValidator } from '@/src/lib/validators';
import CheckoutSteps from './CheckoutSteps';

const initialFormValue: ICheckoutFormData = {
  address: '',
  mobile: '+995 5',
  shippingMethod: undefined,
  paymentMethod: undefined,
  extraInfo: ''
}

/**
 * Checkout sliding form custom component (using emblda Carousel)
 */
const CheckoutForm = () => {

  // -=-=-=- Internationalization -=-=-=-

  const t = useScopedI18n('/sign-up')

  // -=-=-=- Form State -=-=-=-

  const [values, setValues] = useState(initialFormValue)
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const isFormValid = (
    values.address !== '' &&
    mobileValidator.validateFn(values.mobile) < 0 &&
    values.paymentMethod !== undefined &&
    values.shippingMethod !== undefined
  )

  const { message } = App.useApp()

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = (name === 'mobile') ? formatPhoneNumber(value) : value;

    setValues((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  }, []);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {

      // check fields validity and scroll to invalid input's slide
      if (values.address === '' || mobileValidator.validateFn(values.mobile) >= 0)
        return;

      if (values.shippingMethod === undefined) {
        if (slideNum === 0)
          scrollNext()
        return;
      }

      if (values.paymentMethod === undefined) {
        if (slideNum === 0) {
          scrollNext()
          scrollNext()
        }
        if (slideNum === 1) {
          scrollNext()
        }
        return;
      }

      // valid form logic
      setIsSubmitting(true)
      const key = 'updatable message';
      message.open({
        key,
        type: 'loading',
        content: t('loading message'),
        duration: 3600
      })

      setTimeout(async () => {
        try {
          // logic
        } catch (e) {
          message.open({
            key,
            type: 'error',
            content: t('failed registration'),
            duration: 2
          })
          console.log(e) // "something went wrong"
        } finally {
          setIsSubmitting(false)
        }
      }, 1000)
    })
  }

  // -=-=-=- Carousel Fucntionality -=-=-=-

  const [emblaRef, emblaApi] = useEmblaCarousel({ skipSnaps: true, watchDrag: false })
  const [slideNum, setSlideNum] = useState(0)
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(true)

  // disabling nextBtn if current slide's one field at least is invalid
  useEffect(() => {
    if (slideNum === 0)
      setIsNextBtnDisabled(values.address === '' || mobileValidator.validateFn(values.mobile) >= 0)
    else if (slideNum === 1)
      setIsNextBtnDisabled(values.shippingMethod === undefined)
  }, [values, setIsNextBtnDisabled, slideNum])


  const scrollPrev = useCallback(() => {
    setSlideNum(prevState => prevState - 1)
    if (emblaApi)
      emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {

    if (isNextBtnDisabled) {
      startTransition(() => { })
      return
    }

    setSlideNum(prevState => prevState + 1)

    if (emblaApi)
      emblaApi.scrollNext()
  }, [emblaApi, isNextBtnDisabled, slideNum])

  return (
    <div className={style.wrapper}>
      <CheckoutSteps current={slideNum} />
      <form className={style.wrapper} onSubmit={submitHandler}>


        {/*   -=-=-=- Form Overlay (on pending) -=-=-=-   */}

        {isSubmitting && <div className={style.overlay}></div>}

        {/*   -=-=-=- Form Inputs (Carousel) -=-=-=-   */}

        <div className={style.embla} ref={emblaRef}>
          <div className={style.embla__container}>

            {/* Slide 1 - Personal Details */}
            <AddressDetails
              currSlide={slideNum}
              mobileValue={values.mobile}
              addressValue={values.address}
              changeHandler={changeHandler}
              // pass form status, if only the slide is active (to not touch "invisible" inputs)
              formSubmitted={slideNum === 0 ? isPending : false}
            />

            {/* Slide 2 - Address Details */}
            <Shippings
              currSlide={slideNum}
              shippingMethod={values.shippingMethod}
              changeHandler={changeHandler}
              formSubmitted={slideNum === 1 ? isPending : false}
            />

            {/* Slide 3 - Credentials and Submit */}
            <Payments
              currSlide={slideNum}
              paymentMethod={values.paymentMethod}
              changeHandler={changeHandler}
              // pass form status, if only the slide is active (to not touch "invisible" inputs)
              formSubmitted={slideNum === 2 ? isPending : false}
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
              {t('go back')}
            </span>
          </button>
          <Tooltip
            title={isNextBtnDisabled ? 'Please, fill in the missing fields' : null}
            placement="topRight"
            color='#272727'
            destroyTooltipOnHide={true}
            mouseEnterDelay={0.07}
          >
            <button
              disabled={slideNum === 2}
              type='button'
              className={`${style.arrowBtn} ${slideNum === 2 && style.hide}`}
              onClick={scrollNext}
            >
              <span>
                {t('continue')}
              </span>
              <MdArrowForwardIos className={style.arrow} />
            </button>
          </Tooltip>
        </div>

        <Button
          type='submit'
          disabled={isSubmitting || !isFormValid}
        >
          checkout
        </Button>

      </form >
    </div>
  )
}

export default CheckoutForm;