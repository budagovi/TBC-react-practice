import style from './Store.module.css';
import StoreItem from './StoreItem';
import Search from '../../Icons/Search';

import products from '../../Products';

const Store = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.actions}>
        <h2>Browse Products</h2>
        <form action="#">
          <input type="text" placeholder='Search for plants'/>
          <button><Search className={style.searchIcon}/>  </button>
        </form>
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