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
        {products.map((item) => 
          <StoreItem 
            key={item.id}
            src={item.src}
            name={item.name}
            price={item.price}
            category={item.category}
            sale={item.sale}
          />
        )}

      </div>
    </div>
  )
}

export default Store;