'use client'

import Loader from "@/UI/Loader/Loader";
import Blog from "@/components/Blogs Page/Blog";
import blog from "@/interfaces/blog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
const BlogsPage = () => {

  const [blogs, setBlogs] = useState<blog[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (): Promise<blog[]> => {
      const response = await fetch('https://dummyjson.com/posts');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data.posts)
      }
      return [];
    }

    fetchData();
  }, [])

  if(blogs.length === 0) 
    return <Loader/>
  
  return (
    <div>
      {blogs.map(blog => <Blog 
        key={blog.id}
        image={blog.id % 4}
        title={blog.title}
        text={blog.body}
        tags={blog.tags}
        reactions={blog.reactions}
        onClick={() => {router.push('./blogs/' + blog.id)}}
      />)}
    </div>
  )
}

export default BlogsPage;