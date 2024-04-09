import style from './Blog.module.css';

const Blog = ({ title, text, image, tags, reactions, onClick = null }) => {

  const date = new Date();
  const imageContainer = [
    '/plant1.jpg',
    '/plant2.jpg',
    '/plant3.jpg',
    '/plant4.jpg'];

  const URL = onClick ? `url('./images${imageContainer[image]}')` : `url('../images${imageContainer[image]}')`
  return (
    <div className={style.wrapper}>
      <div className={style.imgWrapper} style={{ backgroundImage: URL }}>
      </div>
      <div className={style.desc}>
        <h2>{title}</h2>
        <p>{text}</p>
        <span style={{fontSize: '13px'}}>{reactions} reactions</span>
        <a onClick={onClick ? onClick : null}>read more
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
        </svg></a>
        <div className={style.tags}>
          {tags.map( (tag, idx) => <span key={idx} className={style.tagLabel}>{tag}</span>)}
          <span>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</span>
        </div>
      </div>
    </div>
  )
}

export default Blog;