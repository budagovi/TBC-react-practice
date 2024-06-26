'use client'
// --- style
import style from './SliderSection.module.css';
// --- UI
import Button from '@/src/UI/Button/Button';
// --- embla-carousel api
import useEmblaCarousel from 'embla-carousel-react'
// --- next.js/react api
import { useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  title: string,
  btnText?: string,
  children: ReactNode,
  linkTo: string
}

/**
 * Custom component with carousel and arrow buttons (takes carousel items (sequence of div tags) as children)
 */
const SliderSection = ({ title, btnText = '', children, linkTo }: Props) => {

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, slidesToScroll: 1 });
  const router = useRouter();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className={style.wrapper}>
      <div className={style.title}>
        <span>{title}</span>
        <div className={style.controls}>
          <button onClick={scrollPrev}>
            <img src='./images/arrow-light.png' />
          </button>
          <button onClick={scrollNext}>
            <img src='./images/arrow-light.png' />
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