'use client'

// *
// * Sign-In Sliding Form Component (using emblda Carousel)
// *

// --- style
import style from './AuthForm.module.css';
// --- UI
import Button from '@/src/UI/Button/Button';
import ProgressBar from '@/src/UI/ProgressBar/ProgressBar';
// --- nextjs/react api
import { ChangeEvent, useState, useCallback, useTransition, FormEvent, useEffect } from 'react';
//import { useRouter } from 'next/navigation';
import Link from 'next/link';
// --- next-internationalization api
import { useScopedI18n } from '@/src/locales/client';
// --- react-icons
import { FaFacebook, FaGoogle } from 'react-icons/fa6';
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
// --- embla-carousel-react
import useEmblaCarousel from 'embla-carousel-react';
// --- components
import PersonalDetails from './PersonalDetails';
import AddressDetails from './AddressDetails';
import Credentials from './Credentials';
// --- dayjs
import dayjs from 'dayjs';
// --- antd
import { Tooltip } from 'antd';
// --- utils
import {
  nameValidatorFn,
  dobValidator,
  genderValidator,
  mobileValidator,
  addressValidator,
  emailValidator,
  passwordValidator,
  confirmPasswordValidator
} from '@/src/utilities/validators';
import formatPhoneNumber from '@/src/utilities/helpers/formatPhoneNumber';

export interface ISignUpFormData {
  firstname: string,
  lastname: string,
  gender: string | null,
  dobMilSecs: number | null,
  address: string,
  mobile: string,
  email: string,
  password: string,
  confirm: string,
  agree: boolean
}

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

const SignUpForm = () => {

  // -=-=-=- Internationalization -=-=-=-

  const t = useScopedI18n('/sign-up')

  // -=-=-=- Form State -=-=-=-

  const [values, setValues] = useState(initialFormValue)
  const [isPending, startTransition] = useTransition();

  //const router = useRouter();

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === 'mobile') {
      const newValue = formatPhoneNumber(value)
      setValues((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
      return;
    }

    setValues((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      console.log('start ')

      // check form validity
      if (
        nameValidatorFn('firstname').validateFn(values.firstname) >= 0 ||
        nameValidatorFn('lastname').validateFn(values.lastname) >= 0 ||
        dobValidator.validateFn(values.dobMilSecs) >= 0 ||
        genderValidator.validateFn(values.gender) >= 0 ||
        mobileValidator.validateFn(values.mobile) >= 0 ||
        addressValidator.validateFn(values.address) >= 0 ||
        emailValidator.validateFn(values.email) >= 0 ||
        passwordValidator.validateFn(values.password) >= 0 ||
        confirmPasswordValidator(values.password).validateFn(values.confirm) >= 0
      ) {
        // invalid form logic
        return
      }

      // valid form logic

    })

    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     ...credentials
    //   })
    // })

    // if(response.ok) {
    //   router.push('/store')
    // }

  }

  // -=-=-=- Carousel Fucntionality -=-=-=-

  const [emblaRef, emblaApi] = useEmblaCarousel({ skipSnaps: true, watchDrag: false })
  const [slideNum, setSlideNum] = useState(0)
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(true)

  useEffect(() => {

    if (slideNum === 0) {
      setIsNextBtnDisabled(
        nameValidatorFn('firstname').validateFn(values.firstname) >= 0 ||
        nameValidatorFn('lastname').validateFn(values.lastname) >= 0 ||
        dobValidator.validateFn(values.dobMilSecs) >= 0 ||
        genderValidator.validateFn(values.gender) >= 0
      )
    }
    else if (slideNum === 1) {
      setIsNextBtnDisabled(
        mobileValidator.validateFn(values.mobile) >= 0 ||
        addressValidator.validateFn(values.address) >= 0
      )
    }

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

      {/*   -=-=-=- Form Label -=-=-=-   */}

      <div className={style.formLabel}>
        <h1>{t('title')}</h1>
        <span>{t('create an acc-')}</span>
      </div>

      {/*   -=-=-=- Slide Indicator -=-=-=-   */}
      <ProgressBar
        percent={32 * slideNum + 4}
      />

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
      >
        {t('sign up')}
      </Button>

      <div className={style.actions}>
        <span>{t('already member?')}<Link href={'/sign-in'}>{' ' + t('sign in')}</Link></span>
      </div>

      {/*   -=-=-=- Socials -=-=-=-   */}

      <div className={style.socialsLabel}>
        <span>{t('or continue')}</span>
      </div>

      <div className={style.socials}>
        <Button light>
          <FaFacebook className={style.socialsLogo} />
          <span>Facebook</span>
        </Button>
        <Button light>
          <FaGoogle className={style.socialsLogo} />
          <span>Google</span>
        </Button>
      </div>

    </form >
  )
}

export default SignUpForm;