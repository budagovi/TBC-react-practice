'use client'
import Link from 'next/link';
// --- style
import style from './PathSegment.module.css';
// --- next.js api
import { usePathname } from "next/navigation";

/**
 * Displays pathname in server components
 */
const PathSegment = () => {
  let pathname = usePathname();
  const pathnames = pathname.split('/').slice(1);

  // refactor product segment (remove id and '-'s)
  let isStore = false;
  if (pathnames.length > 1 && pathnames[0] === 'store')
    isStore = true;

  return (
    <span className={style.wrapper}>
      <Link href='/'>Home</Link>
      {
        pathnames.map((path, idx) => {
          return (
            <span key={idx}>
              <b>{'/'}</b>
              <Link
                href={formatRoute(pathnames, idx)}
              >
                {isStore && idx == 1 ? path.slice(0, -4).replace('-', ' ') : path}
              </Link>
            </span>
          )
        })
      }
    </span>
  )
}

export default PathSegment;

const formatRoute = (segments: string[], idx: number) => {

  let route = '';

  Array(idx + 1).fill(null).forEach((_, i) => {
    route += '/' + segments[i];
  });

  return route;
}