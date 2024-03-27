import style from './PageLayout.module.css';

const PageLayout = ({children}) => {
  return <div className={style.wrapper}>{children}</div>
}

export default PageLayout;