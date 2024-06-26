import { IBlog } from '@/src/lib/types/entities';
import style from './Blogs.module.css';
import Search from './Search';
import BlogsList from './BlogsList';

const Blogs = ({ blogs }: { blogs: IBlog[] }) => {
  return (
    <div className={style.wrapper}>
      <Search />
      <BlogsList blogs={blogs}/>
    </div>
  )
}

export default Blogs;