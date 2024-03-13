import style from './Review.module.css';

const Review = ({ author, date, children, rating }) => {
  return (
    <div className={style.wrapper}>
      <h2>{author}</h2>
      <p>{children}</p>
      <div className={style.footer}>
        <span>date: {date}</span>
        <span className={style.rating}>{rating}</span>
      </div>
    </div>
  )
}

export default Review;