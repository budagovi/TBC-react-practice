import Loader from "@/UI/Loader/Loader";
import Blog from "@/components/Blogs Page/Blog";
import blog from "@/interfaces/blog";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function generateStaticParams() {

  const response = await fetch('https://dummyjson.com/posts');
  let data: any | undefined;
  if (response.ok) {
    data = await response.json();
  }

  console.log(data.posts);
  return data.posts.map((post:blog) => ({
    id: post.id.toString(),
  }))
}

async function fetchBlog(id:number) {
  const response = await fetch('https://dummyjson.com/post/' + id);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return {};
}

const BlogPage = async ({params}: {params: Params}) => {
  
  const blog:blog = await fetchBlog(params.id);

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
        onClick={null}
      />
    </div>
  )
}

export default BlogPage;