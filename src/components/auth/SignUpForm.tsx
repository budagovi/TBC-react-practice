'use client'

// *
// * Sign-In Form Component (using emblda Carousel)
// *

// --- style
import style from './AuthForm.module.css';
// --- UI
import Button from '@/src/UI/Button/Button';
import ProgressBar from '@/src/UI/ProgressBar/ProgressBar';
// --- nextjs/react api
import { ChangeEvent, FormEvent, useState, useCallback } from 'react';
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

const SignUp = () => {

  const initialFormValue: ISignUpFormData = {
    firstname: '',
    lastname: '',
    gender: null,
    dobMilSecs: null,
    address: '',
    mobile: '',
    email: '',
    password: '',
    confirm: '',
    agree: false
  }

  // -=-=-=- Form state -=-=-=-
  const [customFormData, setCustomFormData] = useState(initialFormValue)
  //const router = useRouter();

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCustomFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

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

    setCustomFormData(initialFormValue)
  }

  // -=-=-=- Carousel Fucntionality -=-=-=-
  const [emblaRef, emblaApi] = useEmblaCarousel({ skipSnaps: true, watchDrag: false })
  const [slideNum, setSlideNum] = useState(0)
  const isNextBtnDisabled = useCallback(() => {
    return slideNum === 2
  }, [slideNum])

  const scrollPrev = useCallback(() => {
    setSlideNum(prevState => prevState - 1)
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    setSlideNum(prevState => prevState + 1)
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // -=-=-=- Internationalization -=-=-=-
  const t = useScopedI18n('register page')

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
            firstnameValue={customFormData.firstname}
            lastnameValue={customFormData.lastname}
            dobValue={customFormData.dobMilSecs}
            genderValue={customFormData.gender}
            stateDispatch={setCustomFormData} // setCustomData for date and gender inputs
            changeHandler={changeHandler}
          />

          {/* Slide 2 - Address Details */}
          <AddressDetails
            currSlide={slideNum}
            mobileValue={customFormData.mobile}
            addressValue={customFormData.address}
            changeHandler={changeHandler}
          />

          {/* Slide 3 - Credentials and Submit */}
          <Credentials
            currSlide={slideNum}
            emailValue={customFormData.email}
            passwordValue={customFormData.password}
            confirmValue={customFormData.confirm}
            agreeValue={customFormData.agree}
            changeHandler={changeHandler}
          />

        </div>
      </div>

      {/*   -=-=-=- Form Actions -=-=-=-   */}
      <div className={style.actions}>
        <button
          disabled={slideNum === 0}
          type='button'
          className={style.arrowBtn}
          onClick={scrollPrev}
        >
          <MdArrowBackIos className={style.arrow} />
          <span>
            go back
          </span>
        </button>
        <button
          disabled={isNextBtnDisabled()}
          type='button'
          className={style.arrowBtn}
          onClick={scrollNext}
        >
          <span>
            {t('continue')}
          </span>
          <MdArrowForwardIos className={style.arrow} />
        </button>
      </div>

      <Button type='submit'>{t('continue')}</Button>

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

export default SignUp;