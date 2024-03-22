import style from './Store.module.css';
import StoreItem from './StoreItem';
import Search from './Search';

import products from '../../Products';

const Store = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.actions}>
        <h2>Browse Products</h2>
        <Search />
      </div>
      <div className={style.storeWrapper}>
        <StoreItem {...products[0]} />
        <StoreItem {...products[1]} />
        <StoreItem {...products[2]} />
        <StoreItem {...products[3]} />
        <StoreItem {...products[4]} />
        <StoreItem {...products[5]} />
      </div>
    </div>
  )
}

export default Store;