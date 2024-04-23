import Loader from "@/UI/Loader/Loader";
import Blog from "@/components/Blogs Page/Blog";

export async function generateStaticParams() {

  const response = await fetch('https://dummyjson.com/posts');
  let data;
  if (response.ok) {
    data = await response.json();
  }

  console.log(data.posts);
  return data.posts.map((post) => ({
    id: post.id.toString(),
  }))
}

async function fetchBlog(id) {
  const response = await fetch('https://dummyjson.com/post/' + id);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return {};
}

const BlogPage = ({params}) => {
  
  const blog = fetchBlog(params.id);

  if(Object.keys(blog).length === 0) 
    return <Loader/>
  
  return (
    <div>
      <Blog 
        key={blog.id}
        image={blog.id % 4}
        title={blog.title}
        text={blog.body}
        tags={blog.tags}
        reactions={blog.reactions}
      />
    </div>
  )
}

export default BlogPage;