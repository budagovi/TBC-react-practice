'use client'

// *
// * Custom component with carousel and arrow buttons (takes carousel items (div tags) as children)
// *

// --- CSS
import style from './SliderSection.module.css';
// --- UI
import Button from '@/src/UI/Button/Button';
// --- embla-carousel api
import useEmblaCarousel from 'embla-carousel-react'
// --- next.js/react api
import { useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  intro: string,
  title: string,
  btnText?: string,
  children: ReactNode,
  linkTo: string
}

const SliderSection = ({ intro, title, btnText = '', children, linkTo }: Props) => {

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, slidesToScroll: 3 });
  const router = useRouter();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className={style.wrapper}>
      <span className={style.intro}>{intro}</span>
      <div className={style.title}>
        <span>{title}</span>
        <div className={style.controls}>
          <button onClick={scrollPrev}>
            <img src='/images/arrow-light.png' />
          </button>
          <button onClick={scrollNext}>
            <img src='/images/arrow-light.png' />
          </button>
        </div>
      </div>
      <div className={style.embla} ref={emblaRef}>
        <div className={style.embla__container}>
          {children}
        </div>
      </div>
      {btnText && <Button className={style.btn} onClick={() => router.push(linkTo)}>{btnText}</Button>}
    </section>
  )
}

export default SliderSection;