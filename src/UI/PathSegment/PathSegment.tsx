'use client'
import Link from 'next/link';
// --- style
import style from './PathSegment.module.css';
// --- next.js api
import { usePathname } from "next/navigation";

/**
 * 
 * Displays pathname in server components
 * 
 */
const PathSegment = () => {
  let pathname = usePathname();
  pathname = pathname.split('/')[1]
  pathname = pathname[0].toUpperCase() + pathname.substring(1)

  return (
    <span className={style.wrapper}>
      <Link href='/'>Home</Link>
      <span>{pathname ? '/' : null}</span>
      <span>{pathname}</span>
    </span>
  )
}

export default PathSegment;