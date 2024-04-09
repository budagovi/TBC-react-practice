'use client'

import Loader from "@/UI/Loader/Loader";
import Blog from "@/components/Blogs Page/Blog";
import { useEffect, useState } from "react"
const BlogPage = ({params}) => {

  const [blog, setBlog] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://dummyjson.com/post/' + params.id);
      if (response.ok) {
        const data = await response.json();
        setBlog(data)
      }
      return {};
    }

    fetchData();
  }, [])

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