import style from './Store.module.css';
import StoreItem from './StoreItem';
import Actions from './Actions';

import products from '../../Products';
import { useState } from 'react';

const Store = () => {

  console.log('rendering store')
  const [filteredList, setFilteredList] = useState([...products]);
  const [sorted, setSorted] = useState(false);

  // filter by query
  const searchItems = (searchText) => {
    setFilteredList(products
      .filter(product => product.name.toLowerCase().includes(searchText))
    )
  }

  // sort
  const sortItems = (bool) => {
    setSorted(bool)
  }

  let list = [...filteredList]
  if(sorted) {
    list.sort((a,b) => {
      const aPrice = a.sale ? a.sale : a.price
      const bPrice = b.sale ? b.sale : b.price
      return aPrice - bPrice
    })
  }

  return (
    <section className={style.wrapper}>
      <div className={style.actions}>
        <h2>Browse Products</h2>
        <Actions search={searchItems} sort={sortItems}/>        
      </div>
      <div className={style.storeWrapper}>
        {list.map((item) => 
          <StoreItem 
            key={item.id}
            src={item.src}
            name={item.name}
            price={item.price}
            category={item.category}
            sale={item.sale}
          />)
        }
      </div>
    </section>
  )
}

export default Store;