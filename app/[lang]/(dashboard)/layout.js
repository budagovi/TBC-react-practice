import style from './layout.module.css';

const layout = ({ children }) => {
  return (
    <main className={style.mainContent}>
      {children}
    </main>
  )
}

export default layout;