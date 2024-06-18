'use client'
// --- style
import style from './SignInUpForm.module.css';
// --- UI
import Button from '@/src/UI/Button/Button';
import ProgressBar from '@/src/UI/ProgressBar/ProgressBar';
// --- nextjs/react api
import { ChangeEvent, useState, useCallback, useTransition, FormEvent, useEffect } from 'react';
import Link from 'next/link';
// --- next-internationalization api
import { useScopedI18n } from '@/src/lib/next-internationalization/client';
// --- react-icons
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
// --- embla-carousel-react
import useEmblaCarousel from 'embla-carousel-react';
// --- components
import PersonalDetails from './SignUpFormParts/PersonalDetails';
import AddressDetails from './SignUpFormParts/AddressDetails';
import Credentials from './SignUpFormParts/Credentials';
import Socials from './Socials';
import FormLabel from './FormLabel';
// --- antd
import { Tooltip, App } from 'antd';
// --- utils
import formatPhoneNumber from '@/src/utilities/helpers/formatPhoneNumber';
import isSignUpFormValid from '@/src/utilities/checkers/isSignUpFormValid';
// --- types
import { ISignUpFormData } from '@/src/lib/types/forms';
// --- actions
import { login } from '@/src/app/[locale]/(auth)/actions';
import { useRouter } from 'next/navigation';

const initialFormValue: ISignUpFormData = {
  firstname: '',
  lastname: '',
  gender: null,
  dobMilSecs: null,
  address: '',
  mobile: '+995 5',
  email: '',
  password: '',
  confirm: '',
  agree: false
}

/**
 * Sign up sliding form custom component (using emblda Carousel)
 */
const SignUpForm = () => {

  // -=-=-=- Internationalization -=-=-=-

  const t = useScopedI18n('/sign-up')

  // -=-=-=- Form State -=-=-=-

  const [values, setValues] = useState(initialFormValue)
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const formIsValid = isSignUpFormValid(values)

  const { message } = App.useApp()
  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = (name === 'mobile') ? formatPhoneNumber(value) : value;

    setValues((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : newValue,
    }));
  }, []);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {

      // check fields validity and scroll to invalid input's slide
      if (!formIsValid.personalDetails)
        return;

      if (!formIsValid.addressDetails) {
        if (slideNum === 0)
          scrollNext()
        return;
      }

      if (!formIsValid.credentials) {
        console.log('agree')
        if (slideNum === 0) {
          scrollNext()
          scrollNext()
        }
        if (slideNum === 1) {
          scrollNext()
        }
        return;
      }

      // if form is valid POST data to db
      setIsSubmitting(true)
      const key = 'updatable';
      message.open({
        key,
        type: 'loading',
        content: t('loading message'),
        duration: 3600
      })

      setTimeout(async () => {
        try {
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ...values
            })
          })

          if (response.ok) {
            message.open({
              key,
              type: 'success',
              content: t('successfull register'),
              duration: 5
            })
            await login({
              email: values.email,
              password: values.password,
              isRemembered: false
            })
            router.replace('/profile')
            return;
          }
          else if (response.status === 409) { // email is already used
            message.open({
              key,
              type: 'error',
              content: t('email is used'),
              duration: 6
            })
            setValues((prevState) => ({
              ...prevState,
              email: prevState.email + '\n'
            }));
            // swipe carousel to 3rd slide
            if (slideNum != 2) {
              scrollNext()
              scrollNext()
            }
            return;
          }

          throw new Error('something went wrong')
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
      setIsNextBtnDisabled(!formIsValid.personalDetails)
    else if (slideNum === 1)
      setIsNextBtnDisabled(!formIsValid.addressDetails)
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
    <form className={style.wrapper} onSubmit={submitHandler}>

      {/*   -=-=-=- Form Overlay (on pending) -=-=-=-   */}

      {isSubmitting && <div className={style.overlay}></div>}

      {/*   -=-=-=- Form Label -=-=-=-   */}

      <FormLabel
        title={t('title')}
        subtitle={t('create an acc-')}
      />
      <ProgressBar percent={32 * slideNum + 4 + (isSubmitting ? 32 : 0)} />

      {/*   -=-=-=- Form Inputs (Carousel) -=-=-=-   */}

      <div className={style.embla} ref={emblaRef}>
        <div className={style.embla__container}>

          {/* Slide 1 - Personal Details */}
          <PersonalDetails
            currSlide={slideNum}
            firstnameValue={values.firstname}
            lastnameValue={values.lastname}
            dobValue={values.dobMilSecs}
            genderValue={values.gender}
            stateDispatch={setValues} // setValues for date and gender inputs
            changeHandler={changeHandler}
            // pass form status, if only the slide is active (to not touch "invisible" inputs)
            formSubmitted={slideNum === 0 ? isPending : false}
          />

          {/* Slide 2 - Address Details */}
          <AddressDetails
            currSlide={slideNum}
            mobileValue={values.mobile}
            addressValue={values.address}
            changeHandler={changeHandler}
            // pass form status, if only the slide is active (to not touch "invisible" inputs)
            formSubmitted={slideNum === 1 ? isPending : false}
          />

          {/* Slide 3 - Credentials and Submit */}
          <Credentials
            currSlide={slideNum}
            emailValue={values.email}
            passwordValue={values.password}
            confirmValue={values.confirm}
            agreeValue={values.agree}
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
        disabled={isSubmitting}
      >
        {t('sign up')}
      </Button>

      <div className={style.actions}>
        <span>{t('already member?')}<Link href={'/sign-in'}>{' ' + t('sign in')}</Link></span>
      </div>

      {/*   -=-=-=- Form Socials -=-=-=-   */}

      <Socials />

    </form >
  )
}

export default SignUpForm;