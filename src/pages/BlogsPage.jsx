import PageLayout from "../UI/PageLayout";
import blogsData from '../BlogsData';
import Blog from "../components/Blogs/Blog";

const BlogsPage = () => {
  return (
    <PageLayout>
      <h2 style={{width: '90%', margin:"0 auto"}}>Blogs </h2>
      {blogsData.map(({ title, text, date, image }) => <Blog
        title={title}
        text={text}
        date={date}
        image={image}
      />)}
    </PageLayout>
  )
}

export default BlogsPage;