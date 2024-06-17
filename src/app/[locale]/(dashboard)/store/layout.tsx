// --- style
import style from '@/src/app/layouts.module.css';
// --- components
import FilterMenu from '@/src/components/Store Page/FilterMenu';
// --- store filter context
import StoreFilterContextProvider from '@/src/context/store-filter';

interface IProps {
  children: React.ReactNode
}

const StoreLayout = ({ children }: IProps) => {
  return (
    <div className={style.store_layout} >
      <StoreFilterContextProvider>
        <FilterMenu />
        {children}
      </StoreFilterContextProvider>
    </div>
  )
}

export default StoreLayout;