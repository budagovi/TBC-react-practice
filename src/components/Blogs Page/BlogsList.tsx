import { IBlog } from '@/src/lib/types/entities';
import style from './BlogsList.module.css';
import BlogsItem from './BlogsItem';

const BlogsList = ({ blogs }: { blogs: IBlog[] }) => {
  return (
    <div className={style.wrapper}>
      {blogs.length > 0 ? blogs.map(b => <BlogsItem blog={b} key={b.id}/>) : <span>No blog was found</span>}
    </div>
  )
}

export default BlogsList;