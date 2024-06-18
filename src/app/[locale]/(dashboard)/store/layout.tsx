// --- style
import style from '@/src/app/layouts.module.css';
// --- components
import FilterMenu from '@/src/components/Store Page/FilterMenu';

interface IProps {
  children: React.ReactNode
}

const StoreLayout = ({ children }: IProps) => {

  return (
    <div className={style.store_layout} >
      <FilterMenu />
      {children}
    </div>
  )
}

export default StoreLayout;