import style from './Blog.module.css';

const Blog = ({ title, text, date, image }) => {


  const imageContainer = [
    '/plant1.jpg',
    '/plant2.jpg',
    '/plant3.jpg',
    '/plant4.jpg'];

  return (
    <div className={style.wrapper}>
      <div className={style.imgWrapper} style={{ backgroundImage: `url('./images${imageContainer[image]}')` }}>
      </div>
      <div className={style.desc}>
        <h2>{title}</h2>
        <p>{text}</p>
        <a href="#">view more
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
        </svg></a>
        <span>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</span>
      </div>
    </div>
  )
}

export default Blog;