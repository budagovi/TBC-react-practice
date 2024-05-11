'use client'

// *
// * Helper component for displaying pathname in server components
// *

// --- CSS
import style from './PathSegment.module.css';
// --- next.js api
import { usePathname } from "next/navigation";

const PathSegment = () => {
  let pathname = usePathname();
  pathname = pathname.split('/')[1]
  pathname = pathname[0].toUpperCase() + pathname.substring(1)

  return (
    <span className={style.wrapper}>
      <span>Home</span>
      <span>{pathname ? '/' : null}</span>
      <span>{pathname}</span>
    </span>
  )
}

export default PathSegment;