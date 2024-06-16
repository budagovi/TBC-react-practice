// --- style
import style from './ProgressBar.module.css';

interface Props {
  percent: number
}
/**
 * Custom component to give feedback of progress
 * @param percent a percentage of work done
 * @returns progress bar, highlited according to work done
 */
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