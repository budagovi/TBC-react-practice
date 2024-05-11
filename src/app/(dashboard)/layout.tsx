import { ReactNode } from 'react';
import style from './layout.module.css';
import PathSegment from '@/src/UI/PathSegment/PathSegment';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className= { style.mainContent } >
      <PathSegment />
    { children }
    </main>
  )
}

export default layout;