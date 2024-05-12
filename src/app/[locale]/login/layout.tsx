import { ReactNode } from 'react';
import style from './layout.module.css';

interface Props {
  children: ReactNode
}

const layout = ({ children }: Props) => {
  return (
    <main className={style.mainContent}>
      {children}
    </main>
  )
}

export default layout;