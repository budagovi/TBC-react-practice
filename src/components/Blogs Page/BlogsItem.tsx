import { IBlog } from '@/src/lib/types/entities';
import style from './BlogsItem.module.css';

const BlogsItem = ({ blog }: { blog: IBlog }) => {

  const date = blog.created.toString().split('T')[0];
  return (
    <div className={style.wrapper}>
      <div className={style.imgWrapper}>
        <img src={blog.thumbnail} alt={blog.title} />
      </div>
      <div className={style.title}>
        <span>{blog.title}</span>
        <span>{date}</span>
      </div>
    </div>
  )
}

export default BlogsItem;