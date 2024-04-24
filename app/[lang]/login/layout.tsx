import { ReactNode } from 'react';
import style from './layout.module.css';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className={style.mainContent}>
      {children}
    </main>
  )
}

export default layout;