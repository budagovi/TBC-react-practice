// *
// * Custom component to highlight the current slide's number on indicator above one-slided carousel
// *

// --- CSS
import style from './SlideIndicator.module.css';

interface Props {
  currSlide: number,
  slidesAmount: number
}

const SlideIndicator = ({ currSlide, slidesAmount }: Props) => {


  return (
    <div className={style.wrapper}>
      {Array(slidesAmount)
        .fill(null).map((_, idx) => (
          <div
            key={idx}
            className={`${currSlide === idx ? style.current : null}`}
          ></div>
        ))}
    </div>
  )
}

export default SlideIndicator;