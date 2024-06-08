// *
// * Custom component to highlight the current slide's number on indicator above one-slided carousel
// *

// --- CSS
import style from './ProgressBar.module.css';

interface Props {
  percent: number
}

const ProgressBar = ({ percent }: Props) => {


  return (
    <div className={style.wrapper}>
      <div className={style.outer}>
        <div className={style.inner} style={{width: `${percent}%`}}>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar;